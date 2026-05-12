const utils = {
    updateLabel(camera, renderer, obj, title, val) {
        const lbl = document.getElementById('floating-label');
        if(!lbl || !obj) return;
        
        // Ensure label is child of body to avoid relative positioning issues
        if(lbl.parentElement !== document.body) document.body.appendChild(lbl);
        
        const v = new THREE.Vector3();
        obj.getWorldPosition(v);
        v.project(camera);
        const rect = renderer.domElement.getBoundingClientRect();
        
        if(v.z > 1) { lbl.style.display = 'none'; return; }
        
        const x = (v.x * .5 + .5) * rect.width + rect.left + window.scrollX;
        const y = (v.y * -.5 + .5) * rect.height + rect.top + window.scrollY;
        
        lbl.style.display = 'block';
        lbl.style.left = x + 'px';
        lbl.style.top = (y - 40) + 'px';
        document.getElementById('float-title').innerText = title;
        document.getElementById('float-val').innerText = val;
    },
    hideLabel() {
        const lbl = document.getElementById('floating-label');
        if(lbl) lbl.style.display = 'none';
    },
    createTextSprite(message) {
        const canvas = document.createElement('canvas');
        canvas.width = 256; 
        canvas.height = 128;
        const context = canvas.getContext('2d');
        context.font = "Bold 70px 'Roboto Mono', Arial";
        context.fillStyle = "rgba(0, 229, 255, 1)";
        context.textAlign = "right";
        context.textBaseline = "middle";
        context.fillText(message, 240, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMat);
        return sprite;
    }
};

// Helper class for Spring Simulation
class HelixCurve extends THREE.Curve {
    constructor(turns=10, radius=1, length=5) { 
        super(); 
        this.turns=turns; 
        this.radius=radius; 
        this.length=length; 
    }
    getPoint(t, target = new THREE.Vector3()) { 
        return target.set(Math.cos(t*Math.PI*2*this.turns)*this.radius, -t*this.length, Math.sin(t*Math.PI*2*this.turns)*this.radius); 
    }
}

const simHero = {
    init() {
        const container = document.getElementById('hero-canvas');
        if(!container) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); 
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        
        const geo = new THREE.BufferGeometry(); 
        const count = 1000; 
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) pos[i] = (Math.random()-0.5)*10;
        
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ size: 0.05, color: 0x00E5FF, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const mesh = new THREE.Points(geo, mat); 
        scene.add(mesh); 
        camera.position.z = 3;
        
        let mX=0, mY=0; 
        document.addEventListener('mousemove', e => { 
            mX = e.clientX/window.innerWidth - 0.5; 
            mY = e.clientY/window.innerHeight - 0.5; 
        });
        
        const animate = () => { 
            requestAnimationFrame(animate); 
            mesh.rotation.y += 0.001; 
            mesh.rotation.x += 0.0005;
            camera.position.x += (mX*2 - camera.position.x)*0.05; 
            camera.position.y += (-mY*2 - camera.position.y)*0.05; 
            camera.lookAt(scene.position); 
            renderer.render(scene, camera); 
        };
        animate();
    }
};

const sim1 = {
    init() {
        const c = document.getElementById('sim1-canvas'); 
        if(!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
        renderer.setSize(c.clientWidth, c.clientHeight); 
        c.appendChild(renderer.domElement);
        const controls = new THREE.OrbitControls(camera, renderer.domElement); 
        controls.enableDamping = true; 
        camera.position.set(0, 0, 15);
        
        const light = new THREE.PointLight(0xffffff, 1, 100); 
        light.position.set(10, 10, 10); 
        scene.add(light); 
        scene.add(new THREE.AmbientLight(0x404040));
        
        let springL = 5; 
        let path = new HelixCurve(10, 0.8, springL); 
        let springMat = new THREE.MeshPhongMaterial({ color: 0x00E5FF, shininess: 100 });
        let springMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 100, 0.1, 8, false), springMat); 
        springMesh.position.y = 5; 
        scene.add(springMesh);
        
        const weightMesh = new THREE.Mesh(new THREE.CylinderGeometry(1,1,2,32), new THREE.MeshStandardMaterial({ color: 0x7B2FFF, metalness: 0.5, roughness: 0.2 })); 
        scene.add(weightMesh);
        const barMesh = new THREE.Mesh(new THREE.BoxGeometry(6,0.5,4), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 })); 
        barMesh.position.y = 5; 
        scene.add(barMesh);
        
        // Add Ruler with Numbers
        const rulerGeo = new THREE.CylinderGeometry(0.1, 0.1, 15, 8);
        const rulerMat = new THREE.MeshBasicMaterial({color: 0xaaaaaa});
        const ruler = new THREE.Mesh(rulerGeo, rulerMat);
        ruler.position.set(-3, 0, 0);
        scene.add(ruler);
        for(let i=-7; i<=1; i++) {
            const tick = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.1), new THREE.MeshBasicMaterial({color: 0xffffff}));
            tick.position.set(-2.8, i, 0);
            scene.add(tick);
            
            // Calculate value (y=-1 is 0)
            let val = (-1 - i) * 10;
            if (val >= 0) {
                let sprite = utils.createTextSprite(val.toString() + ' cm');
                sprite.position.set(-3.2, i, 0);
                sprite.scale.set(2, 1, 1);
                scene.add(sprite);
            }
        }

        // Add Force Arrow
        const arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), 2, 0xFF4757, 0.5, 0.5);
        scene.add(arrowHelper);

        scene.add(new THREE.GridHelper(20, 20, 0x444444, 0x222222));
        
        const dK = document.getElementById('sim1-k'); 
        const dM = document.getElementById('sim1-m');
        
        const update = () => {
            const k = parseFloat(dK.value); 
            const m = parseFloat(dM.value); 
            const F = m*9.81; 
            const dL = F/k;
            document.getElementById('sim1-val-k').innerText = k; 
            document.getElementById('sim1-val-m').innerText = m.toFixed(1);
            document.getElementById('sim1-res-f').innerText = F.toFixed(2)+' N'; 
            document.getElementById('sim1-res-l').innerText = (dL*100).toFixed(2)+' cm';
            
            springL = 5 + dL*10; 
            scene.remove(springMesh);
            springMesh = new THREE.Mesh(new THREE.TubeGeometry(new HelixCurve(10, 0.8, springL), 100, 0.1, 8, false), springMat);
            let cv = Math.min(1, dL/0.5); 
            springMat.color.setRGB(cv, 1-cv, 1);
            springMesh.position.y = 5; 
            scene.add(springMesh); 
            weightMesh.position.y = 5 - springL - 1;

            // Update arrow
            arrowHelper.position.copy(weightMesh.position);
            arrowHelper.position.y -= 1; // start below the weight
            arrowHelper.setLength(F * 0.1 + 1, 0.5, 0.5); // scale arrow length with force
        };
        dK.addEventListener('input', update); 
        dM.addEventListener('input', update); 
        update();
        
        let isHovering = false;
        c.addEventListener('mouseenter', () => isHovering = true);
        c.addEventListener('mouseleave', () => { isHovering = false; utils.hideLabel(); });

        const animate = () => { 
            requestAnimationFrame(animate); 
            controls.update(); 
            renderer.render(scene, camera); 
            if(isHovering) utils.updateLabel(camera, renderer, weightMesh, "Lực Đàn Hồi", document.getElementById('sim1-res-f').innerText);
        }; 
        animate();
    }
};

const sim2 = {
    currentMode: 'keo',
    init() {
        const c = document.getElementById('sim2-canvas'); 
        if(!c) return;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
        this.renderer.setSize(c.clientWidth, c.clientHeight); 
        c.appendChild(this.renderer.domElement);
        
        const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement); 
        controls.enableDamping = true; 
        this.camera.position.set(0, 5, 10);
        
        const light = new THREE.DirectionalLight(0xffffff, 1); 
        light.position.set(5, 5, 5); 
        this.scene.add(light); 
        this.scene.add(new THREE.AmbientLight(0x606060));
        this.material = new THREE.MeshPhongMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.9 });
        
        this.resetObject();
        document.getElementById('sim2-force').addEventListener('input', e => this.applyDeformation(e.target.value/100));
        
        let isHovering = false;
        c.addEventListener('mouseenter', () => isHovering = true);
        c.addEventListener('mouseleave', () => { isHovering = false; utils.hideLabel(); });

        const animate = () => { 
            requestAnimationFrame(animate); 
            controls.update(); 
            this.renderer.render(this.scene, this.camera); 
            if(isHovering && this.mesh) utils.updateLabel(this.camera, this.renderer, this.mesh, "Lực Tác Dụng", document.getElementById('sim2-force').value + ' N');
        }; 
        animate();
    },
    resetObject() {
        if (this.mesh) this.scene.remove(this.mesh);
        if (this.arrows) this.arrows.forEach(a => this.scene.remove(a));
        this.arrows = [];

        let geo = this.currentMode==='uon' ? new THREE.BoxGeometry(1,6,1,10,20,10) : new THREE.CylinderGeometry(1,1,5,32,16);
        this.baseGeo = geo.clone(); 
        this.mesh = new THREE.Mesh(geo, this.material);
        if(this.currentMode==='uon') this.mesh.rotation.z = Math.PI/2;
        this.scene.add(this.mesh); 

        // Add visual force arrows
        let color = 0xFF4757;
        if(this.currentMode==='keo') {
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,2.5,0), 2, color, 0.5, 0.5));
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), new THREE.Vector3(0,-2.5,0), 2, color, 0.5, 0.5));
        } else if(this.currentMode==='nen') {
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), new THREE.Vector3(0,4,0), 1.5, color, 0.5, 0.5));
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,-4,0), 1.5, color, 0.5, 0.5));
        } else if(this.currentMode==='uon') {
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), new THREE.Vector3(0,2,0), 1.5, color, 0.5, 0.5));
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(-2.5,-1.5,0), 1, color, 0.4, 0.4));
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(2.5,-1.5,0), 1, color, 0.4, 0.4));
        } else if(this.currentMode==='xoan') {
            // Representative arrows for torsion
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,2.5,1), 1.5, color, 0.4, 0.4));
            this.arrows.push(new THREE.ArrowHelper(new THREE.Vector3(-1,0,0), new THREE.Vector3(0,-2.5,-1), 1.5, color, 0.4, 0.4));
        }
        this.arrows.forEach(a => this.scene.add(a));

        this.applyDeformation(document.getElementById('sim2-force').value/100);
    },
    applyDeformation(f) {
        if(!this.mesh) return; 
        const pos = this.mesh.geometry.attributes.position; 
        const base = this.baseGeo.attributes.position;
        for (let i=0; i<pos.count; i++) {
            let y=base.getY(i), x=base.getX(i), z=base.getZ(i);
            if (this.currentMode==='keo') pos.setY(i, y*(1+f*0.5));
            else if (this.currentMode==='nen') pos.setY(i, y*(1-f*0.4));
            else if (this.currentMode==='xoan') { let a=f*y*0.5; pos.setX(i, x*Math.cos(a)-z*Math.sin(a)); pos.setZ(i, x*Math.sin(a)+z*Math.cos(a)); }
            else if (this.currentMode==='uon') pos.setY(i, y - f*(x*x)*0.1); // Fixed uon to curve downwards properly
        }
        pos.needsUpdate = true; 
        this.mesh.geometry.computeVertexNormals(); 
        this.material.color.setRGB(f, 0.89-f*0.8, 1-f*0.5);

        // Scale arrows with force
        if(this.arrows && this.arrows.length > 0) {
            this.arrows.forEach(a => a.setLength(1 + f * 2, 0.5, 0.5));
            if(this.currentMode==='keo') {
                this.arrows[0].position.y = 2.5 * (1+f*0.5);
                this.arrows[1].position.y = -2.5 * (1+f*0.5);
            }
        }
    }
};

const sim3 = {
    init() {
        const c = document.getElementById('sim3-canvas'); 
        if(!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
        renderer.setSize(c.clientWidth, c.clientHeight); 
        c.appendChild(renderer.domElement);
        
        const controls = new THREE.OrbitControls(camera, renderer.domElement); 
        controls.enableDamping = true; 
        camera.position.set(0, 5, 20);
        
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        scene.add(new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, opacity: 1, transparent: true, roughness: 0, ior: 1.5, side: THREE.BackSide })));
        
        const waterMat = new THREE.MeshPhongMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
        const water = new THREE.Mesh(new THREE.BoxGeometry(9.9,9.9,9.9), waterMat); 
        water.position.y = -0.05; 
        scene.add(water);
        
        // Vạch đo độ sâu
        for(let i=-4; i<=4; i+=2) {
            const tick = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 0.1), new THREE.MeshBasicMaterial({color: 0xffffff}));
            tick.position.set(-4.5, i, -4.9);
            scene.add(tick);
            
            let hVal = (5 - i) * 10;
            let sprite = utils.createTextSprite(hVal.toString() + 'm');
            sprite.position.set(-2.8, i, -4.9); // move right next to tick
            sprite.scale.set(2.5, 1.25, 1);
            scene.add(sprite);
        }

        const sensor = new THREE.Mesh(new THREE.SphereGeometry(1,32,32), new THREE.MeshStandardMaterial({ color: 0xFF4757, metalness: 0.8, roughness: 0.2 })); 
        scene.add(sensor);
        
        // Mũi tên áp suất
        this.arrows = [];
        const dirs = [
            new THREE.Vector3(1,0,0), new THREE.Vector3(-1,0,0),
            new THREE.Vector3(0,1,0), new THREE.Vector3(0,-1,0),
            new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,-1)
        ];
        dirs.forEach(d => {
            let a = new THREE.ArrowHelper(d.clone().negate(), d.clone().multiplyScalar(2), 1, 0xFF4757, 0.5, 0.5);
            a.originalDir = d.clone(); // Store original direction to avoid undefined error
            this.arrows.push(a);
            sensor.add(a); 
        });
        
        const dH = document.getElementById('sim3-h'); 
        const dL = document.getElementById('sim3-liquid'); 
        const rP = document.getElementById('sim3-res-p');
        
        const update = () => {
            const h = parseFloat(dH.value); 
            const rho = parseFloat(dL.value); 
            const p = 101325 + rho*9.81*h;
            document.getElementById('sim3-val-h').innerText = h; 
            rP.innerText = p.toLocaleString(undefined, {maximumFractionDigits:0}) + ' Pa';
            
            sensor.position.y = 5 - (h/100)*10; 
            
            // Tỉ lệ mũi tên tăng theo áp suất
            let scale = 0.5 + (h/100)*2; 
            this.arrows.forEach(a => {
                a.setLength(scale, scale*0.3, scale*0.3);
                a.position.copy(a.originalDir.clone().negate().multiplyScalar(1.2 + scale));
            });
            
            if(rho==1000) waterMat.color.setHex(0x00E5FF); 
            else if(rho==800) waterMat.color.setHex(0xFFA502); 
            else waterMat.color.setHex(0xaaaaaa);
        };
        dH.addEventListener('input', update); 
        dL.addEventListener('change', update); 
        update();
        
        let isHovering = false;
        c.addEventListener('mouseenter', () => isHovering = true);
        c.addEventListener('mouseleave', () => { isHovering = false; utils.hideLabel(); });

        const animate = () => { 
            requestAnimationFrame(animate); 
            controls.update(); 
            renderer.render(scene, camera); 
            if(isHovering) utils.updateLabel(camera, renderer, sensor, "Áp Suất", rP.innerText);
        }; 
        animate();
    }
};

// SIM-4: Con Lắc Đơn - Bảo Toàn Cơ Năng
const sim4 = {
    playing: true,
    angle: 0,
    angularVel: 0,
    L: 6,
    g: 9.81,
    init() {
        const c = document.getElementById('sim4-canvas');
        if (!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth / c.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(c.clientWidth, c.clientHeight);
        c.appendChild(renderer.domElement);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(0, 3, 15);

        scene.add(new THREE.AmbientLight(0x606060));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 5);
        scene.add(light);

        // Pivot bar
        const bar = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8 }));
        bar.position.y = 5;
        scene.add(bar);

        // Pendulum group
        const pendGroup = new THREE.Group();
        pendGroup.position.y = 5;
        scene.add(pendGroup);

        // Rod
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, this.L, 8), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
        rod.position.y = -this.L / 2;
        pendGroup.add(rod);

        // Bob
        const bob = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x7B2FFF, metalness: 0.6, roughness: 0.2 }));
        bob.position.y = -this.L;
        pendGroup.add(bob);

        // Ground ref line (dashed)
        const dashMat = new THREE.LineDashedMaterial({ color: 0x00ff94, dashSize: 0.3, gapSize: 0.2 });
        const dashGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, 5 - this.L, 0), new THREE.Vector3(8, 5 - this.L, 0)]);
        const dashLine = new THREE.Line(dashGeo, dashMat);
        dashLine.computeLineDistances();
        scene.add(dashLine);

        scene.add(new THREE.GridHelper(20, 20, 0x444444, 0x222222));

        // Params
        const dM = document.getElementById('sim4-m');
        const dA = document.getElementById('sim4-a');

        this.angle = parseFloat(dA.value) * Math.PI / 180;
        this.angularVel = 0;

        dA.addEventListener('input', () => {
            this.angle = parseFloat(dA.value) * Math.PI / 180;
            this.angularVel = 0;
            document.getElementById('sim4-val-a').innerText = dA.value;
        });
        dM.addEventListener('input', () => {
            document.getElementById('sim4-val-m').innerText = parseFloat(dM.value).toFixed(1);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            if (this.playing) {
                const dt = 0.016;
                const angularAccel = -(this.g / this.L) * Math.sin(this.angle);
                this.angularVel += angularAccel * dt;
                this.angularVel *= 0.999; // tiny damping
                this.angle += this.angularVel * dt;

                pendGroup.rotation.z = this.angle;

                // Energy calc
                const m = parseFloat(dM.value);
                const h = this.L * (1 - Math.cos(this.angle));
                const v = this.angularVel * this.L;
                const Wd = 0.5 * m * v * v;
                const Wt = m * this.g * h;
                const W = Wd + Wt;

                document.getElementById('sim4-res-wd').innerText = Wd.toFixed(2) + ' J';
                document.getElementById('sim4-res-wt').innerText = Wt.toFixed(2) + ' J';
                document.getElementById('sim4-res-w').innerText = W.toFixed(2) + ' J';

                const maxW = W > 0.01 ? W : 1;
                document.getElementById('sim4-bar-wd').style.width = (Wd / maxW * 100) + '%';
                document.getElementById('sim4-bar-wt').style.width = (Wt / maxW * 100) + '%';
                document.getElementById('sim4-bar-w').style.width = '100%';
            }

            renderer.render(scene, camera);
        };
        animate();
    },
    togglePlay() {
        this.playing = !this.playing;
        document.getElementById('sim4-play-btn').innerText = this.playing ? 'Tạm Dừng' : 'Tiếp Tục';
    }
};

// SIM-5: Máy Cẩu - Công Suất
const sim5 = {
    lifting: false,
    crateY: 0,
    targetH: 10,
    elapsedTime: 0,
    init() {
        const c = document.getElementById('sim5-canvas');
        if (!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth / c.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(c.clientWidth, c.clientHeight);
        c.appendChild(renderer.domElement);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(8, 8, 15);

        scene.add(new THREE.AmbientLight(0x606060));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 5);
        scene.add(light);

        // Ground
        const ground = new THREE.Mesh(new THREE.BoxGeometry(20, 0.2, 10), new THREE.MeshStandardMaterial({ color: 0x333333 }));
        ground.position.y = -0.1;
        scene.add(ground);

        // Crane tower
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.8, 14, 0.8), new THREE.MeshStandardMaterial({ color: 0xffb800, metalness: 0.5 }));
        tower.position.set(-2, 7, 0);
        scene.add(tower);

        // Crane arm
        const arm = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0xffb800, metalness: 0.5 }));
        arm.position.set(3, 14, 0);
        scene.add(arm);

        // Cable
        const cableMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        this.cable = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 13, 8), cableMat);
        this.cable.position.set(6, 7.5, 0);
        scene.add(this.cable);

        // Crate
        this.crate = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial({ color: 0x7B2FFF, metalness: 0.3, roughness: 0.5 }));
        this.crate.position.set(6, 1, 0);
        scene.add(this.crate);

        // Height markers
        for (let i = 0; i <= 10; i += 2) {
            const tick = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            tick.position.set(-4, i, 0);
            scene.add(tick);
            let sprite = utils.createTextSprite(i + 'm');
            sprite.position.set(-5.5, i, 0);
            sprite.scale.set(2, 1, 1);
            scene.add(sprite);
        }

        scene.add(new THREE.GridHelper(20, 20, 0x444444, 0x222222));

        // Controls
        const dM = document.getElementById('sim5-m');
        const dP = document.getElementById('sim5-p');

        const updateInfo = () => {
            const m = parseFloat(dM.value);
            const P = parseFloat(dP.value);
            const F = m * 9.81;
            const v = P / F;
            document.getElementById('sim5-val-m').innerText = m;
            document.getElementById('sim5-val-p').innerText = P;
            document.getElementById('sim5-res-f').innerText = F.toFixed(0) + ' N';
            document.getElementById('sim5-res-v').innerText = v.toFixed(2) + ' m/s';
        };
        dM.addEventListener('input', updateInfo);
        dP.addEventListener('input', updateInfo);
        updateInfo();

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            if (this.lifting) {
                const m = parseFloat(dM.value);
                const P = parseFloat(dP.value);
                const F = m * 9.81;
                const v = P / F;
                const dt = 0.016;

                this.crateY += v * dt;
                this.elapsedTime += dt;

                if (this.crateY >= this.targetH) {
                    this.crateY = this.targetH;
                    this.lifting = false;
                    document.getElementById('sim5-start-btn').innerText = 'Kéo Hàng';
                }

                this.crate.position.y = 1 + this.crateY;
                // Update cable
                const cableLen = 14 - this.crateY - 1;
                this.cable.scale.y = cableLen / 13;
                this.cable.position.y = 14 - cableLen / 2;

                document.getElementById('sim5-res-t').innerText = this.elapsedTime.toFixed(2) + ' s';
            }

            renderer.render(scene, camera);
        };
        animate();
    },
    startLifting() {
        this.crateY = 0;
        this.elapsedTime = 0;
        this.crate.position.y = 1;
        this.lifting = true;
        document.getElementById('sim5-start-btn').innerText = 'Đang Kéo...';
    }
};

// SIM-6: Ném Xiên (Projectile Motion)
const sim6 = {
    firing: false,
    t: 0,
    v0: 20,
    angle: Math.PI / 4,
    g: 9.81,
    startX: -15,
    startY: 0,
    init() {
        const c = document.getElementById('sim6-canvas');
        if (!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth / c.clientHeight, 0.1, 200);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(c.clientWidth, c.clientHeight);
        c.appendChild(renderer.domElement);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(0, 15, 40);

        scene.add(new THREE.AmbientLight(0x606060));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 20, 10);
        scene.add(light);

        // Ground
        const ground = new THREE.Mesh(new THREE.BoxGeometry(100, 0.2, 20), new THREE.MeshStandardMaterial({ color: 0x333333 }));
        ground.position.y = -0.1;
        scene.add(ground);

        // Cannon base
        const cannonBase = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2), new THREE.MeshStandardMaterial({ color: 0x444444 }));
        cannonBase.position.set(this.startX, 0.5, 0);
        scene.add(cannonBase);

        // Cannon barrel
        this.barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3, 16), new THREE.MeshStandardMaterial({ color: 0x7B2FFF }));
        this.barrel.geometry.translate(0, 1.5, 0); // Pivot at base
        this.barrel.position.set(this.startX, 1, 0);
        scene.add(this.barrel);

        // Projectile
        this.projectile = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshStandardMaterial({ color: 0xFF4757, metalness: 0.5 }));
        this.projectile.position.set(this.startX, 1, 0);
        scene.add(this.projectile);

        // Trajectory line
        this.trailGeo = new THREE.BufferGeometry();
        this.trailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(300 * 3), 3));
        this.trailGeo.setDrawRange(0, 0);
        const trailMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, linewidth: 2 });
        this.trailLine = new THREE.Line(this.trailGeo, trailMat);
        scene.add(this.trailLine);

        scene.add(new THREE.GridHelper(40, 40, 0x444444, 0x222222));

        const dA = document.getElementById('sim6-a');
        const dV = document.getElementById('sim6-v');

        const updateParams = () => {
            this.angle = parseFloat(dA.value) * Math.PI / 180;
            this.v0 = parseFloat(dV.value);
            document.getElementById('sim6-val-a').innerText = dA.value;
            document.getElementById('sim6-val-v').innerText = this.v0;
            
            // Update barrel rotation
            this.barrel.rotation.z = -this.angle + Math.PI/2;
            
            // Calculate theoretical max
            const L = (this.v0 * this.v0 * Math.sin(2 * this.angle)) / this.g;
            const H = (this.v0 * this.v0 * Math.pow(Math.sin(this.angle), 2)) / (2 * this.g);
            const t_total = (2 * this.v0 * Math.sin(this.angle)) / this.g;
            
            document.getElementById('sim6-res-l').innerText = L.toFixed(2) + ' m';
            document.getElementById('sim6-res-h').innerText = H.toFixed(2) + ' m';
            document.getElementById('sim6-res-t').innerText = t_total.toFixed(2) + ' s';
        };

        dA.addEventListener('input', updateParams);
        dV.addEventListener('input', updateParams);
        updateParams();

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            if (this.firing) {
                const dt = 0.03; // Speed up time slightly for visual
                this.t += dt;
                
                const vx = this.v0 * Math.cos(this.angle);
                const vy = this.v0 * Math.sin(this.angle) - this.g * this.t;
                
                const x = this.startX + vx * this.t;
                const y = 1 + (this.v0 * Math.sin(this.angle) * this.t - 0.5 * this.g * this.t * this.t);
                
                this.projectile.position.set(x, y, 0);

                // Add trail
                const positions = this.trailLine.geometry.attributes.position.array;
                const count = this.trailLine.geometry.drawRange.count;
                if (count < 300) {
                    positions[count * 3] = x;
                    positions[count * 3 + 1] = y;
                    positions[count * 3 + 2] = 0;
                    this.trailLine.geometry.setDrawRange(0, count + 1);
                    this.trailLine.geometry.attributes.position.needsUpdate = true;
                }

                if (y <= 0.4) {
                    this.projectile.position.y = 0.4;
                    this.firing = false;
                    document.getElementById('sim6-fire-btn').innerText = 'Bắn!';
                }
            }

            renderer.render(scene, camera);
        };
        animate();
    },
    fire() {
        this.t = 0;
        this.firing = true;
        this.projectile.position.set(this.startX, 1, 0);
        this.trailLine.geometry.setDrawRange(0, 0);
        document.getElementById('sim6-fire-btn').innerText = 'Đang bay...';
    }
};

// SIM-7: Va Chạm Đàn Hồi (Elastic Collision)
const sim7 = {
    colliding: false,
    resetting: false,
    t: 0,
    m1: 1, m2: 2,
    v1: 5, v2: -2,
    x1: -10, x2: 10,
    r1: 1, r2: 1.5,
    init() {
        const c = document.getElementById('sim7-canvas');
        if (!c) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, c.clientWidth / c.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(c.clientWidth, c.clientHeight);
        c.appendChild(renderer.domElement);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        camera.position.set(0, 5, 25);

        scene.add(new THREE.AmbientLight(0x606060));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);

        // Track
        const track = new THREE.Mesh(new THREE.BoxGeometry(40, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0x333333 }));
        track.position.y = -0.25;
        scene.add(track);
        scene.add(new THREE.GridHelper(40, 20, 0x444444, 0x222222));

        // Carts
        this.mat1 = new THREE.MeshStandardMaterial({ color: 0x00E5FF, metalness: 0.5 });
        this.mat2 = new THREE.MeshStandardMaterial({ color: 0xFF4757, metalness: 0.5 });
        
        this.cart1 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), this.mat1);
        this.cart2 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), this.mat2);
        
        this.cart1.position.set(this.x1, 1, 0);
        this.cart2.position.set(this.x2, 1.5, 0);
        scene.add(this.cart1);
        scene.add(this.cart2);

        const dM1 = document.getElementById('sim7-m1');
        const dM2 = document.getElementById('sim7-m2');

        const updateParams = () => {
            this.m1 = parseFloat(dM1.value);
            this.m2 = parseFloat(dM2.value);
            document.getElementById('sim7-val-m1').innerText = this.m1;
            document.getElementById('sim7-val-m2').innerText = this.m2;
            
            // Update sizes based on mass
            this.cart1.scale.setScalar(Math.cbrt(this.m1));
            this.cart2.scale.setScalar(Math.cbrt(this.m2));
            
            this.cart1.position.y = Math.cbrt(this.m1);
            this.cart2.position.y = Math.cbrt(this.m2) * 1.5;
            
            // Calc expected final velocities
            const v1f = ((this.m1 - this.m2)*this.v1 + 2*this.m2*this.v2) / (this.m1 + this.m2);
            const v2f = ((this.m2 - this.m1)*this.v2 + 2*this.m1*this.v1) / (this.m1 + this.m2);
            const P = this.m1*this.v1 + this.m2*this.v2;
            
            document.getElementById('sim7-res-p').innerText = P.toFixed(2) + ' kg.m/s';
            document.getElementById('sim7-res-v1').innerText = v1f.toFixed(2) + ' m/s';
            document.getElementById('sim7-res-v2').innerText = v2f.toFixed(2) + ' m/s';
        };

        dM1.addEventListener('input', updateParams);
        dM2.addEventListener('input', updateParams);
        updateParams();

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            if (this.colliding) {
                const dt = 0.016;
                this.x1 += this.v1 * dt;
                this.x2 += this.v2 * dt;
                
                const r1 = Math.cbrt(this.m1);
                const r2 = Math.cbrt(this.m2) * 1.5;
                
                // Collision detection
                if (Math.abs(this.x1 - this.x2) <= (r1 + r2) && this.v1 > this.v2) {
                    const tempV1 = this.v1;
                    const tempV2 = this.v2;
                    this.v1 = ((this.m1 - this.m2)*tempV1 + 2*this.m2*tempV2) / (this.m1 + this.m2);
                    this.v2 = ((this.m2 - this.m1)*tempV2 + 2*this.m1*tempV1) / (this.m1 + this.m2);
                    
                    // Add collision effect
                    const flash = new THREE.PointLight(0xffffff, 2, 10);
                    flash.position.set((this.x1+this.x2)/2, 2, 0);
                    scene.add(flash);
                    setTimeout(() => scene.remove(flash), 100);
                }
                
                this.cart1.position.x = this.x1;
                this.cart2.position.x = this.x2;
                
                if (Math.abs(this.x1) > 20 && Math.abs(this.x2) > 20) {
                    this.colliding = false;
                    document.getElementById('sim7-btn').innerText = 'Hoàn Thành';
                }
            }

            renderer.render(scene, camera);
        };
        animate();
    },
    collide() {
        if(this.colliding) return;
        this.colliding = true;
        document.getElementById('sim7-btn').innerText = 'Đang Va Chạm...';
    },
    reset() {
        this.colliding = false;
        this.x1 = -10;
        this.x2 = 10;
        this.v1 = 5;
        this.v2 = -2;
        this.cart1.position.x = this.x1;
        this.cart2.position.x = this.x2;
        document.getElementById('sim7-btn').innerText = 'Va Chạm';
    }
};
