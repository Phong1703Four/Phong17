const games = {
    init() {
        this.initMemoryGame();
        this.initPressureGame();
        this.initSpringGame();
        this.initHydraulicGame();
        this.initSubmarineGame();
        this.initShooterGame();
        this.initRollerGame();
        this.initCraneGame();
    },

    // ------------------------------------
    // GAME 1: THÁM TỬ ÁP SUẤT
    // ------------------------------------
    pressureScore: 0,
    pressureCombo: 0,
    pressureTimer: null,
    pressureTimeLeft: 60,

    initPressureGame() {
        const startBtn = document.getElementById('game-pressure-start');
        if(!startBtn) return;
        
        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-pressure-ui').style.display = 'block';
            this.pressureScore = 0;
            this.pressureCombo = 0;
            this.pressureTimeLeft = 60;
            document.getElementById('game-pressure-score').innerText = '0';
            this.generatePressureQuestion();
            
            this.pressureTimer = setInterval(() => {
                this.pressureTimeLeft--;
                document.getElementById('game-pressure-timer').innerText = this.pressureTimeLeft + 's';
                
                if(this.pressureTimeLeft <= 10) {
                    document.getElementById('game-pressure-timer').style.color = 'var(--danger)';
                }
                
                if(this.pressureTimeLeft <= 0) {
                    clearInterval(this.pressureTimer);
                    this.endPressureGame();
                }
            }, 1000);
        });

        document.getElementById('game-pressure-submit').addEventListener('click', () => this.checkPressureAnswer());
    },

    generatePressureQuestion() {
        const types = ['p=F/S', 'p=p0+pgh'];
        const type = types[Math.floor(Math.random() * types.length)];
        let qText = '';
        this.currentPressureAnswer = 0;

        if (type === 'p=F/S') {
            const m = Math.floor(Math.random() * 50) + 10; // 10 to 60 kg
            const S = (Math.random() * 0.4 + 0.1).toFixed(2); // 0.1 to 0.5 m^2
            qText = `Một vật khối lượng m = ${m} kg đặt trên diện tích S = ${S} m². Tính áp suất p (Pa)? (g=10)`;
            this.currentPressureAnswer = (m * 10) / parseFloat(S);
        } else {
            const h = Math.floor(Math.random() * 20) + 1; // 1 to 20 m
            const rho = [1000, 800, 1025][Math.floor(Math.random() * 3)];
            let liquid = rho===1000 ? 'nước' : (rho===800 ? 'dầu' : 'nước biển');
            qText = `Tính áp suất tại độ sâu h = ${h} m trong ${liquid} (ρ = ${rho} kg/m³). Bỏ qua áp suất khí quyển p₀. (g=10)`;
            this.currentPressureAnswer = rho * 10 * h;
        }

        document.getElementById('game-pressure-q').innerText = qText;
        document.getElementById('game-pressure-input').value = '';
        document.getElementById('game-pressure-input').focus();
    },

    checkPressureAnswer() {
        const inputVal = parseFloat(document.getElementById('game-pressure-input').value);
        if(isNaN(inputVal)) return;

        // Cho phép sai số 5%
        const isCorrect = Math.abs(inputVal - this.currentPressureAnswer) / this.currentPressureAnswer < 0.05;

        if(isCorrect) {
            this.pressureCombo++;
            let points = 10 * (this.pressureCombo >= 3 ? 2 : 1); // x2 combo
            this.pressureScore += points;
            document.getElementById('game-pressure-score').innerText = this.pressureScore;
            
            const effect = document.createElement('div');
            effect.innerText = `+${points}`;
            effect.style.position = 'absolute';
            effect.style.color = 'var(--accent-3)';
            effect.style.fontSize = '24px';
            effect.style.fontWeight = 'bold';
            effect.style.transform = 'translateY(-20px)';
            effect.style.transition = 'all 1s';
            document.getElementById('game-pressure-ui').appendChild(effect);
            
            setTimeout(() => { effect.style.opacity = '0'; effect.style.transform = 'translateY(-50px)'; }, 50);
            setTimeout(() => effect.remove(), 1050);

            this.generatePressureQuestion();
        } else {
            this.pressureCombo = 0;
            const inputEl = document.getElementById('game-pressure-input');
            inputEl.style.backgroundColor = 'rgba(255,71,87,0.3)';
            setTimeout(() => inputEl.style.backgroundColor = '', 300);
        }
    },

    endPressureGame() {
        document.getElementById('game-pressure-ui').innerHTML = `
            <h3 style="color: var(--accent-1); font-size: 1.5rem; margin-bottom: 20px;">HẾT GIỜ!</h3>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">Tổng điểm của bạn: <strong style="color: var(--accent-3); font-size: 2rem;">${this.pressureScore}</strong></p>
            <button class="btn btn-outline" onclick="location.reload()">Chơi lại</button>
        `;
    },

    // ------------------------------------
    // GAME 2: GHÉP ĐÔI KIẾN THỨC
    // ------------------------------------
    memoryCards: [
        { id: 1, type: 'formula', content: 'F = k.|Δl|', match: 1 },
        { id: 2, type: 'desc', content: 'Định luật Hooke', match: 1 },
        { id: 3, type: 'formula', content: 'p = F / S', match: 2 },
        { id: 4, type: 'desc', content: 'Áp suất chất rắn', match: 2 },
        { id: 5, type: 'formula', content: 'p = p₀ + ρgh', match: 3 },
        { id: 6, type: 'desc', content: 'Áp suất chất lỏng', match: 3 },
        { id: 7, type: 'formula', content: 'F₁/S₁ = F₂/S₂', match: 4 },
        { id: 8, type: 'desc', content: 'Máy ép thủy lực', match: 4 },
        { id: 9, type: 'formula', content: 'F_A = ρ.V.g', match: 5 },
        { id: 10, type: 'desc', content: 'Lực đẩy Archimedes', match: 5 },
        { id: 11, type: 'formula', content: 'ρ = m / V', match: 6 },
        { id: 12, type: 'desc', content: 'Khối lượng riêng', match: 6 }
    ],
    flippedCards: [],
    matchedCount: 0,
    memoryMoves: 0,

    initMemoryGame() {
        const grid = document.getElementById('game-memory-grid');
        if(!grid) return;
        
        // Shuffle
        this.memoryCards.sort(() => Math.random() - 0.5);
        
        grid.innerHTML = '';
        this.memoryCards.forEach((card, index) => {
            const el = document.createElement('div');
            el.className = 'memory-card';
            el.dataset.index = index;
            el.innerText = '?';
            el.addEventListener('click', () => this.flipMemoryCard(el, card));
            grid.appendChild(el);
        });
    },

    flipMemoryCard(el, card) {
        if(this.flippedCards.length >= 2 || el.classList.contains('flipped') || el.classList.contains('matched')) return;
        
        el.classList.add('flipped');
        el.innerText = card.content;
        this.flippedCards.push({el, card});
        
        if(this.flippedCards.length === 2) {
            this.memoryMoves++;
            document.getElementById('game-memory-moves').innerText = `Lượt: ${this.memoryMoves}`;
            
            setTimeout(() => this.checkMemoryMatch(), 800);
        }
    },

    checkMemoryMatch() {
        const [c1, c2] = this.flippedCards;
        
        if(c1.card.match === c2.card.match) {
            c1.el.classList.add('matched');
            c2.el.classList.add('matched');
            this.matchedCount += 2;
            
            if(this.matchedCount === this.memoryCards.length) {
                setTimeout(() => {
                    document.getElementById('game-memory-grid').innerHTML = `
                        <div style="grid-column: span 4; text-align: center; padding: 20px;">
                            <h3 style="color: var(--accent-3); margin-bottom: 10px;">Chúc mừng!</h3>
                            <p>Bạn đã hoàn thành với ${this.memoryMoves} lượt lật.</p>
                            <button class="btn btn-outline" style="margin-top: 15px;" onclick="games.initMemoryGame()">Chơi lại</button>
                        </div>
                    `;
                    this.matchedCount = 0;
                    this.memoryMoves = 0;
                }, 500);
            }
        } else {
            c1.el.classList.remove('flipped');
            c1.el.innerText = '?';
            c2.el.classList.remove('flipped');
            c2.el.innerText = '?';
        }
        
        this.flippedCards = [];
    },

    // ------------------------------------
    // GAME 3: KÉO LÒ XO
    // ------------------------------------
    springK: 100, // randomized
    springF: 0,
    springL: 0,
    isDragging: false,
    startY: 0,
    startH: 50, // default height
    maxH: 220, // max drag

    initSpringGame() {
        const startBtn = document.getElementById('game-spring-start');
        if(!startBtn) return;

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-spring-ui').style.display = 'block';
            this.resetSpringRound();
        });

        const dragArea = document.getElementById('spring-drag-area');
        const weight = document.getElementById('game-spring-weight');
        const visual = document.getElementById('game-spring-visual');

        const updateSpring = (clientY) => {
            if(!this.isDragging) return;
            const bounds = dragArea.getBoundingClientRect();
            let y = clientY - bounds.top;
            
            // Limit drag
            if(y < 65) y = 65;
            if(y > this.maxH) y = this.maxH;

            const dlPixel = y - 65; // delta in pixels
            this.springL = parseFloat((dlPixel * 0.005).toFixed(3)); // convert pixel to meters
            this.springF = parseFloat((this.springK * this.springL).toFixed(1));

            document.getElementById('game-spring-l').innerText = this.springL;
            document.getElementById('game-spring-f').innerText = this.springF;
            
            weight.style.transform = `translate(-50%, ${dlPixel}px)`;
            visual.style.height = (50 + dlPixel) + 'px';
        };

        weight.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            weight.style.transition = 'none';
            visual.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if(this.isDragging) updateSpring(e.clientY);
        });

        document.addEventListener('mouseup', () => {
            if(this.isDragging) {
                this.isDragging = false;
                // Bounce back effect
                weight.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                visual.style.transition = 'height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                weight.style.transform = `translate(-50%, 0px)`;
                visual.style.height = '50px';
            }
        });

        // Touch support
        weight.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            weight.style.transition = 'none';
            visual.style.transition = 'none';
            e.preventDefault();
        });
        document.addEventListener('touchmove', (e) => {
            if(this.isDragging) updateSpring(e.touches[0].clientY);
        }, {passive: false});
        document.addEventListener('touchend', () => {
            if(this.isDragging) {
                this.isDragging = false;
                weight.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                visual.style.transition = 'height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                weight.style.transform = `translate(-50%, 0px)`;
                visual.style.height = '50px';
            }
        });

        document.getElementById('game-spring-submit').addEventListener('click', () => this.checkSpringAnswer());
    },

    resetSpringRound() {
        // Randomize K from 50 to 500 N/m in steps of 10
        this.springK = Math.floor(Math.random() * 46 + 5) * 10;
        this.springF = 0;
        this.springL = 0;
        
        document.getElementById('game-spring-f').innerText = '0';
        document.getElementById('game-spring-l').innerText = '0';
        const weight = document.getElementById('game-spring-weight');
        const visual = document.getElementById('game-spring-visual');
        if(weight) {
            weight.style.transition = 'none';
            weight.style.transform = 'translate(-50%, 0px)';
        }
        if(visual) {
            visual.style.transition = 'none';
            visual.style.height = '50px';
        }
        document.getElementById('game-spring-input').value = '';
        document.getElementById('game-spring-msg').innerText = '';
    },

    checkSpringAnswer() {
        const userK = parseFloat(document.getElementById('game-spring-input').value);
        const msg = document.getElementById('game-spring-msg');
        
        if(isNaN(userK)) {
            msg.innerText = "Vui lòng nhập một số hợp lệ!";
            msg.style.color = "var(--danger)";
            return;
        }

        const exactK = this.springK;
        const diff = Math.abs(userK - exactK);
        
        if (diff < 1) {
            msg.innerText = "🎉 Chính xác tuyệt đối! k = " + exactK.toFixed(0) + " N/m";
            msg.style.color = "var(--accent-3)";
        } else if (diff < 5) {
            msg.innerText = "👌 Gần đúng rồi! k thực tế là " + exactK.toFixed(0) + " N/m";
            msg.style.color = "var(--accent-2)";
        } else {
            msg.innerText = "❌ Sai rồi. F = k * Δl => k = F / Δl. Hãy thử lại!";
            msg.style.color = "var(--danger)";
        }
    },

    // ------------------------------------
    // GAME 4: GIẢI CỨU THỦY LỰC
    // ------------------------------------
    hydroTimer: null,
    hydroTimeLeft: 15,
    hydroF1: 0,
    hydroPlaying: false,

    initHydraulicGame() {
        const startBtn = document.getElementById('game-hydro-start');
        if(!startBtn) return;
        
        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-hydro-ui').style.display = 'block';
            this.startHydroRound();
        });
    },

    startHydroRound() {
        this.hydroPlaying = true;
        this.hydroTimeLeft = 15;
        document.getElementById('hydro-piston-1').style.top = '60px';
        document.getElementById('hydro-piston-2').style.top = '60px';
        document.getElementById('hydro-water').setAttribute('d', 'M 12 70 L 48 70 L 48 148 L 252 148 L 252 70 L 288 70 L 288 148 L 12 148 Z');
        
        // Randomize
        const m2 = [1000, 2000, 5000, 10000][Math.floor(Math.random() * 4)];
        document.getElementById('hydro-m2-val').innerText = m2;
        
        // F2 = m2 * 10 (approx)
        const F2 = m2 * 10;
        
        // S1 is always 10, S2 varies
        const S1 = 10;
        const ratios = [10, 50, 100];
        const ratio = ratios[Math.floor(Math.random() * ratios.length)];
        const S2 = S1 * ratio;
        
        document.getElementById('game-hydro-s-info').innerText = `S₁=${S1}cm² | S₂=${S2}cm²`;
        
        // F1 = F2 * (S1/S2) = F2 / ratio
        this.hydroF1 = F2 / ratio;
        
        // Generate options (1 correct, 3 wrong)
        let options = [this.hydroF1];
        while(options.length < 4) {
            let wrong = [100, 200, 500, 1000, 2000, 5000, 10000][Math.floor(Math.random() * 7)];
            if(!options.includes(wrong)) options.push(wrong);
        }
        options.sort(() => Math.random() - 0.5);
        
        const optsContainer = document.getElementById('game-hydro-options');
        optsContainer.innerHTML = '';
        options.forEach(opt => {
            optsContainer.innerHTML += `<button class="btn btn-outline" onclick="games.checkHydro(${opt})">${opt} N</button>`;
        });
        
        clearInterval(this.hydroTimer);
        document.getElementById('game-hydro-timer').innerText = this.hydroTimeLeft + 's';
        
        this.hydroTimer = setInterval(() => {
            if(!this.hydroPlaying) return;
            this.hydroTimeLeft--;
            document.getElementById('game-hydro-timer').innerText = this.hydroTimeLeft + 's';
            
            // Effect: Piston 2 dropping slowly indicating danger
            if (this.hydroTimeLeft <= 5) {
                document.getElementById('game-hydro-timer').style.color = 'var(--danger)';
                document.getElementById('hydro-piston-2').style.top = '80px'; 
            } else {
                document.getElementById('game-hydro-timer').style.color = '#FF4757';
            }
            
            if(this.hydroTimeLeft <= 0) {
                this.endHydroRound(false);
            }
        }, 1000);
    },

    checkHydro(f1) {
        if(!this.hydroPlaying) return;
        if (f1 === this.hydroF1) {
            this.endHydroRound(true);
        } else {
            this.endHydroRound(false);
        }
    },

    endHydroRound(win) {
        this.hydroPlaying = false;
        clearInterval(this.hydroTimer);
        
        const optsContainer = document.getElementById('game-hydro-options');
        const p1 = document.getElementById('hydro-piston-1');
        const p2 = document.getElementById('hydro-piston-2');
        const water = document.getElementById('hydro-water');
        
        if(win) {
            optsContainer.innerHTML = `<h3 style="grid-column: 1/3; color: var(--accent-3); text-align: center;">🎉 GIẢI CỨU THÀNH CÔNG! Robot an toàn!</h3>`;
            optsContainer.innerHTML += `<button class="btn btn-primary" style="grid-column: 1/3;" onclick="games.startHydroRound()">Chơi Tiếp</button>`;
            
            // Animation success
            p1.style.top = '100px'; 
            p2.style.top = '20px'; 
            water.setAttribute('d', 'M 12 110 L 48 110 L 48 148 L 252 148 L 252 30 L 288 30 L 288 148 L 12 148 Z');
        } else {
            optsContainer.innerHTML = `<h3 style="grid-column: 1/3; color: var(--danger); text-align: center;">💥 THẤT BẠI! Robot bị bẹp!</h3>`;
            optsContainer.innerHTML += `<button class="btn btn-primary" style="grid-column: 1/3;" onclick="games.startHydroRound()">Thử Lại</button>`;
            
            // Animation fail
            p1.style.top = '20px'; 
            p2.style.top = '100px'; 
            water.setAttribute('d', 'M 12 30 L 48 30 L 48 148 L 252 148 L 252 110 L 288 110 L 288 148 L 12 148 Z');
        }
    },

    // ------------------------------------
    // GAME 5: TÀU NGẦM KHÁM PHÁ
    // ------------------------------------
    subTimer: null,
    subTimeLeft: 30,
    subH: 0,
    subRho: 1030,
    subPlaying: false,

    initSubmarineGame() {
        const startBtn = document.getElementById('game-sub-start');
        const submitBtn = document.getElementById('game-sub-submit');
        if(!startBtn) return;

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-sub-ui').style.display = 'block';
            this.startSubmarineRound();
        });

        submitBtn.addEventListener('click', () => this.checkSubmarine());
        document.getElementById('game-sub-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.checkSubmarine();
        });
    },

    startSubmarineRound() {
        this.subPlaying = true;
        this.subTimeLeft = 30;
        
        // Reset UI
        document.getElementById('game-sub-vehicle').style.top = '10px';
        document.getElementById('game-sub-vehicle').innerText = '🚢';
        document.getElementById('game-sub-input').value = '';
        document.getElementById('game-sub-msg').innerText = '';
        document.getElementById('game-sub-input').disabled = false;
        document.getElementById('game-sub-submit').disabled = false;
        
        // Generate values
        const environments = [
            {name: 'Nước Biển', rho: 1030},
            {name: 'Nước Ngọt', rho: 1000},
            {name: 'Biển Chết', rho: 1240}
        ];
        const env = environments[Math.floor(Math.random() * environments.length)];
        this.subRho = env.rho;
        
        // Random depth from 10 to 100
        this.subH = Math.floor(Math.random() * 10) * 10 + 10; 
        
        // p = rho * g * h (g=10)
        const p = this.subRho * 10 * this.subH;
        
        document.getElementById('game-sub-env').innerText = env.name;
        document.getElementById('game-sub-rho').innerText = env.rho;
        document.getElementById('game-sub-p').innerText = p.toLocaleString();
        
        clearInterval(this.subTimer);
        document.getElementById('game-sub-timer').innerText = this.subTimeLeft + 's';
        
        this.subTimer = setInterval(() => {
            if(!this.subPlaying) return;
            this.subTimeLeft--;
            document.getElementById('game-sub-timer').innerText = this.subTimeLeft + 's';
            
            if(this.subTimeLeft <= 5) {
                document.getElementById('game-sub-timer').style.color = 'var(--danger)';
            } else {
                document.getElementById('game-sub-timer').style.color = '#00E5FF';
            }
            
            if(this.subTimeLeft <= 0) {
                this.endSubmarine(false, "Hết giờ! Tàu đã mất tín hiệu.");
            }
        }, 1000);
    },

    checkSubmarine() {
        if(!this.subPlaying) return;
        const userH = parseFloat(document.getElementById('game-sub-input').value);
        if(isNaN(userH)) {
            document.getElementById('game-sub-msg').innerText = "Vui lòng nhập số m hợp lệ!";
            document.getElementById('game-sub-msg').style.color = 'var(--warning)';
            return;
        }

        if(userH === this.subH) {
            this.endSubmarine(true, "Chính xác! Tàu đã lặn đến độ sâu an toàn.");
        } else {
            this.endSubmarine(false, `Sai rồi! Độ sâu thực tế là ${this.subH}m. p = ρ*g*h.`);
        }
    },

    endSubmarine(win, msg) {
        this.subPlaying = false;
        clearInterval(this.subTimer);
        document.getElementById('game-sub-input').disabled = true;
        document.getElementById('game-sub-submit').disabled = true;
        
        const msgEl = document.getElementById('game-sub-msg');
        msgEl.innerText = msg;
        
        if(win) {
            msgEl.style.color = 'var(--accent-3)';
            // Animation lặn xuống sâu
            document.getElementById('game-sub-vehicle').innerText = '🤿';
            document.getElementById('game-sub-vehicle').style.top = '140px';
        } else {
            msgEl.style.color = 'var(--danger)';
            // Animation nổ tung
            document.getElementById('game-sub-vehicle').innerText = '💥';
        }

        setTimeout(() => {
            this.startSubmarineRound();
        }, 3000);
    },

    // ------------------------------------
    // GAME 6: BẮN SÚNG LÒ XO
    // ------------------------------------
    shooterF: 0,
    shooterK: 0,
    shooterDl: 0,
    shooterPlaying: false,

    initShooterGame() {
        const startBtn = document.getElementById('game-shooter-start');
        const submitBtn = document.getElementById('game-shooter-submit');
        if(!startBtn) return;

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-shooter-ui').style.display = 'block';
            this.startShooterRound();
        });

        submitBtn.addEventListener('click', () => this.checkShooter());
        document.getElementById('game-shooter-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.checkShooter();
        });
    },

    startShooterRound() {
        this.shooterPlaying = true;
        document.getElementById('game-shooter-input').value = '';
        document.getElementById('game-shooter-msg').innerText = '';
        document.getElementById('game-shooter-input').disabled = false;
        document.getElementById('game-shooter-submit').disabled = false;
        
        // Reset UI
        document.getElementById('game-shooter-spring').style.width = '100px';
        document.getElementById('game-shooter-bullet').style.left = '120px';
        document.getElementById('game-shooter-target').style.transform = 'scale(1)';
        document.getElementById('game-shooter-target').style.background = 'rgba(255,71,87,0.1)';
        
        // K in range 50 - 500 N/m
        this.shooterK = Math.floor(Math.random() * 45 + 5) * 10;
        
        // Dl from 0.01 to 0.10 m
        this.shooterDl = Math.floor(Math.random() * 10 + 1) / 100;
        
        // F = k * dl
        this.shooterF = this.shooterK * this.shooterDl;
        
        document.getElementById('game-shooter-f').innerText = this.shooterF.toFixed(1);
        document.getElementById('game-shooter-k').innerText = this.shooterK;
    },

    checkShooter() {
        if(!this.shooterPlaying) return;
        const userDl = parseFloat(document.getElementById('game-shooter-input').value);
        if(isNaN(userDl)) {
            document.getElementById('game-shooter-msg').innerText = "Vui lòng nhập số hợp lệ!";
            document.getElementById('game-shooter-msg').style.color = 'var(--warning)';
            return;
        }

        document.getElementById('game-shooter-input').disabled = true;
        document.getElementById('game-shooter-submit').disabled = true;
        this.shooterPlaying = false;
        
        const diff = Math.abs(userDl - this.shooterDl);
        const spring = document.getElementById('game-shooter-spring');
        const bullet = document.getElementById('game-shooter-bullet');
        const target = document.getElementById('game-shooter-target');
        const msgEl = document.getElementById('game-shooter-msg');
        
        // Animation kéo lò xo (Nạp đạn)
        const compressPx = userDl * 500; // Visual scale
        let springWidth = Math.max(20, 100 - compressPx);
        spring.style.width = springWidth + 'px';
        bullet.style.left = (20 + springWidth) + 'px';
        
        // Bắn sau 1s
        setTimeout(() => {
            // Nhả lò xo
            spring.style.width = '100px';
            
            // Đạn bay
            let bulletDest = 120 + (userDl / this.shooterDl) * 200; // If exact, it hits right center (~320px)
            // Target is at right: 20px from right container edge.
            // Container width is 100%, let's just use CSS right for target. So we just simulate visual hit.
            
            if (diff < 0.005) {
                // Trúng
                bullet.style.left = 'calc(100% - 65px)';
                msgEl.innerText = "🎯 BÙM! Trúng phóc! F = k * Δl đúng chuẩn.";
                msgEl.style.color = "var(--accent-3)";
                setTimeout(() => {
                    target.style.background = 'var(--accent-3)';
                    target.style.transform = 'scale(1.2)';
                }, 300);
            } else if (userDl > this.shooterDl) {
                // Kéo quá đà -> bay vọt
                bullet.style.left = '120%';
                msgEl.innerText = "💨 Bay vọt qua hồng tâm rồi! Bạn kéo quá giãn.";
                msgEl.style.color = "var(--warning)";
            } else {
                // Kéo chưa tới -> rớt giữa chừng
                bullet.style.left = '50%';
                msgEl.innerText = "⏬ Lực yếu quá đạn rớt giữa đường. Tính lại Δl nhé!";
                msgEl.style.color = "var(--danger)";
            }

            setTimeout(() => {
                this.startShooterRound();
            }, 4000);
            
        }, 1000);
    },

    // ------------------------------------
    // GAME 7: ĐƯỜNG ĐUA CƠ NĂNG
    // ------------------------------------
    rollerScore: 0,
    rollerR: 2,
    rollerAnimId: null,

    initRollerGame() {
        const startBtn = document.getElementById('game-roller-start');
        if (!startBtn) return;

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-roller-ui').style.display = 'block';
            this.newRollerRound();
        });

        document.getElementById('game-roller-h').addEventListener('input', (e) => {
            document.getElementById('game-roller-h-val').innerText = e.target.value;
            this.drawRollerTrack();
        });

        document.getElementById('game-roller-go').addEventListener('click', () => this.launchRoller());
    },

    newRollerRound() {
        this.rollerR = (Math.floor(Math.random() * 4) + 1) * 0.5 + 1; // 1.5 to 3
        document.getElementById('game-roller-r').innerText = this.rollerR;
        document.getElementById('game-roller-msg').innerText = '';
        document.getElementById('game-roller-go').disabled = false;
        this.drawRollerTrack();
    },

    drawRollerTrack() {
        const canvas = document.getElementById('game-roller-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const h = parseFloat(document.getElementById('game-roller-h').value);
        const R = this.rollerR;
        const groundY = H - 30;
        const scale = (H - 60) / 15; // pixels per meter

        // Draw ramp
        const rampTopY = groundY - h * scale;
        ctx.beginPath();
        ctx.moveTo(20, rampTopY);
        ctx.lineTo(20, groundY);
        ctx.lineTo(120, groundY);
        ctx.strokeStyle = '#00f6ff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Slope
        ctx.beginPath();
        ctx.moveTo(20, rampTopY);
        ctx.lineTo(120, groundY);
        ctx.strokeStyle = 'rgba(0,246,255,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Loop
        const loopCX = 220, loopCY = groundY - R * scale;
        ctx.beginPath();
        ctx.arc(loopCX, loopCY, R * scale, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffb800';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Ground line
        ctx.beginPath();
        ctx.moveTo(120, groundY);
        ctx.lineTo(W - 20, groundY);
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Car on ramp
        ctx.fillStyle = '#7B2FFF';
        ctx.fillRect(15, rampTopY - 15, 20, 12);
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText('🚗', 17, rampTopY - 5);

        // Height label
        ctx.fillStyle = '#00f6ff';
        ctx.font = '12px monospace';
        ctx.fillText(`h=${h}m`, 25, rampTopY - 20);

        // Loop label
        ctx.fillStyle = '#ffb800';
        ctx.fillText(`R=${R}m`, loopCX - 15, loopCY - R * scale - 8);

        // Min h needed
        const minH = 2.5 * R;
        ctx.fillStyle = 'rgba(0,255,148,0.6)';
        ctx.font = '11px monospace';
        ctx.fillText(`h_min = 2.5R = ${minH.toFixed(1)}m`, W - 180, 20);
    },

    launchRoller() {
        const h = parseFloat(document.getElementById('game-roller-h').value);
        const R = this.rollerR;
        const minH = 2.5 * R;
        const msgEl = document.getElementById('game-roller-msg');
        document.getElementById('game-roller-go').disabled = true;

        // Animate car
        const canvas = document.getElementById('game-roller-canvas');
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const groundY = H - 30;
        const scale = (H - 60) / 15;
        const loopCX = 220, loopCY = groundY - R * scale;

        let t = 0;
        const success = h >= minH;

        if (this.rollerAnimId) cancelAnimationFrame(this.rollerAnimId);

        const animFrame = () => {
            t += 0.03;
            this.drawRollerTrack();

            let carX, carY;

            if (t < 1) {
                // Rolling down the slope
                carX = 20 + t * 100;
                carY = (groundY - h * scale) + t * h * scale - 10;
            } else if (success && t < 1 + Math.PI * 2 * 0.15) {
                // Going around loop
                const loopT = (t - 1) / (Math.PI * 2 * 0.15) * Math.PI * 2;
                carX = loopCX + Math.sin(loopT) * R * scale;
                carY = loopCY + Math.cos(loopT) * R * scale - 10;
            } else if (success) {
                // Exit
                carX = loopCX + (t - 1 - Math.PI * 2 * 0.15) * 200;
                carY = groundY - 10;
            } else {
                // Fail: falls at loop
                if (t < 1.5) {
                    const failT = (t - 1) / 0.5;
                    carX = loopCX - R * scale + failT * R * scale;
                    carY = loopCY + R * scale * Math.cos(failT * Math.PI * 0.5) - 10;
                } else {
                    carX = loopCX;
                    carY = groundY - 10;
                }
            }

            ctx.fillStyle = '#7B2FFF';
            ctx.fillRect(carX - 10, carY, 20, 12);

            if ((!success && t > 1.8) || (success && t > 1 + Math.PI * 2 * 0.15 + 0.5)) {
                if (success) {
                    this.rollerScore += 10;
                    document.getElementById('game-roller-score').innerText = this.rollerScore;
                    msgEl.innerText = '🎉 Xe vượt vòng lặp thành công! +10 điểm';
                    msgEl.style.color = 'var(--accent-3)';
                } else {
                    msgEl.innerText = `💥 Xe rơi! Cần h ≥ ${minH.toFixed(1)}m (= 2.5R). Thử lại!`;
                    msgEl.style.color = 'var(--danger)';
                }
                setTimeout(() => this.newRollerRound(), 2500);
                return;
            }

            this.rollerAnimId = requestAnimationFrame(animFrame);
        };
        this.rollerAnimId = requestAnimationFrame(animFrame);
    },

    // ------------------------------------
    // GAME 8: BẬC THẦY MÁY CẨU
    // ------------------------------------
    craneScore: 0,
    craneRound: 1,
    craneMass: 50,
    craneForce: 0,
    craneBoxY: 0,
    craneBoxVel: 0,
    craneHolding: false,
    craneActive: false,
    craneSafeZone: 0,
    craneAnimId: null,

    initCraneGame() {
        const startBtn = document.getElementById('game-crane-start');
        if (!startBtn) return;

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            document.getElementById('game-crane-ui').style.display = 'block';
            this.newCraneRound();
        });

        const liftBtn = document.getElementById('game-crane-lift');

        liftBtn.addEventListener('mousedown', () => { this.craneHolding = true; });
        liftBtn.addEventListener('mouseup', () => { this.craneHolding = false; });
        liftBtn.addEventListener('mouseleave', () => { this.craneHolding = false; });
        liftBtn.addEventListener('touchstart', (e) => { this.craneHolding = true; e.preventDefault(); });
        liftBtn.addEventListener('touchend', () => { this.craneHolding = false; });
    },

    newCraneRound() {
        this.craneMass = Math.floor(Math.random() * 90) + 10; // 10-100 kg
        this.craneBoxY = 220; // starts high (falling)
        this.craneBoxVel = 2; // falling speed
        this.craneForce = 0;
        this.craneHolding = false;
        this.craneActive = true;
        this.craneSafeZone = Math.floor(Math.random() * 80) + 60; // 60-140 px from top

        document.getElementById('game-crane-mass').innerText = this.craneMass;
        document.getElementById('game-crane-force').innerText = '0';
        document.getElementById('game-crane-timer').innerText = `Lần ${this.craneRound}`;
        document.getElementById('game-crane-msg').innerText = '';

        if (this.craneAnimId) cancelAnimationFrame(this.craneAnimId);
        this.runCraneLoop();
    },

    runCraneLoop() {
        const canvas = document.getElementById('game-crane-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const g = 9.81;
        const dt = 0.05;
        const weight = this.craneMass * g;

        const frame = () => {
            ctx.clearRect(0, 0, W, H);

            // Safe zone
            const szTop = this.craneSafeZone;
            const szH = 40;
            ctx.fillStyle = 'rgba(0,255,148,0.15)';
            ctx.fillRect(100, szTop, W - 200, szH);
            ctx.strokeStyle = '#00ff94';
            ctx.lineWidth = 2;
            ctx.strokeRect(100, szTop, W - 200, szH);
            ctx.fillStyle = '#00ff94';
            ctx.font = '11px monospace';
            ctx.fillText('VÙNG AN TOÀN', W / 2 - 45, szTop + szH / 2 + 4);

            // Cable
            ctx.beginPath();
            ctx.moveTo(W / 2, 0);
            ctx.lineTo(W / 2, H - this.craneBoxY);
            ctx.strokeStyle = '#aaa';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Box
            const boxY = H - this.craneBoxY;
            ctx.fillStyle = '#7B2FFF';
            ctx.fillRect(W / 2 - 25, boxY, 50, 35);
            ctx.fillStyle = '#fff';
            ctx.font = '12px monospace';
            ctx.fillText(`${this.craneMass}kg`, W / 2 - 18, boxY + 22);

            // Force arrow
            if (this.craneForce > 0) {
                ctx.beginPath();
                ctx.moveTo(W / 2, boxY);
                ctx.lineTo(W / 2, boxY - Math.min(this.craneForce / weight * 30, 60));
                ctx.strokeStyle = '#00f6ff';
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.fillStyle = '#00f6ff';
                ctx.font = '10px monospace';
                ctx.fillText(`F=${this.craneForce.toFixed(0)}N`, W / 2 + 30, boxY - 10);
            }

            // Weight arrow
            ctx.beginPath();
            ctx.moveTo(W / 2, boxY + 35);
            ctx.lineTo(W / 2, boxY + 35 + 20);
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = '#ff0055';
            ctx.font = '10px monospace';
            ctx.fillText(`P=${weight.toFixed(0)}N`, W / 2 + 30, boxY + 50);

            // Physics
            if (this.craneActive) {
                if (this.craneHolding) {
                    this.craneForce = Math.min(this.craneForce + weight * 0.08, weight * 2);
                } else {
                    this.craneForce = Math.max(this.craneForce - weight * 0.05, 0);
                }

                const netForce = this.craneForce - weight;
                const accel = netForce / this.craneMass;
                this.craneBoxVel += accel * dt;
                this.craneBoxY += this.craneBoxVel;

                document.getElementById('game-crane-force').innerText = this.craneForce.toFixed(0);

                // Check bounds
                if (this.craneBoxY <= 5) {
                    // Crashed at bottom
                    this.craneActive = false;
                    document.getElementById('game-crane-msg').innerText = '💥 Hàng rơi vỡ! Giữ lực lâu hơn!';
                    document.getElementById('game-crane-msg').style.color = 'var(--danger)';
                    setTimeout(() => { this.craneRound++; this.newCraneRound(); }, 2500);
                    return;
                }

                if (this.craneBoxY >= H - 5) {
                    // Flew off top
                    this.craneActive = false;
                    document.getElementById('game-crane-msg').innerText = '💨 Hàng bay vọt lên trời! Nhả bớt lực!';
                    document.getElementById('game-crane-msg').style.color = 'var(--warning)';
                    setTimeout(() => { this.craneRound++; this.newCraneRound(); }, 2500);
                    return;
                }

                // Check if velocity near zero in safe zone
                const boxCenter = H - this.craneBoxY + 17;
                if (Math.abs(this.craneBoxVel) < 0.3 && boxCenter >= szTop && boxCenter <= szTop + szH) {
                    this.craneActive = false;
                    this.craneScore += 10;
                    document.getElementById('game-crane-score').innerText = this.craneScore;
                    document.getElementById('game-crane-msg').innerText = '🎉 Hạ hàng hoàn hảo! +10 điểm';
                    document.getElementById('game-crane-msg').style.color = 'var(--accent-3)';
                    setTimeout(() => { this.craneRound++; this.newCraneRound(); }, 2500);
                    return;
                }
            }

            this.craneAnimId = requestAnimationFrame(frame);
        };
        this.craneAnimId = requestAnimationFrame(frame);
    },

    quitGame(gameId) {
        // Stop any running logic
        if (gameId === 'pressure') clearInterval(this.pressureTimer);
        else if (gameId === 'hydro') clearInterval(this.hydroTimer);
        else if (gameId === 'sub') clearInterval(this.subTimer);
        else if (gameId === 'roller') cancelAnimationFrame(this.rollerAnimId);
        else if (gameId === 'crane') cancelAnimationFrame(this.craneAnimId);

        // Hide UI, Show Start button
        const ui = document.getElementById('game-' + gameId + '-ui');
        const startBtn = document.getElementById('game-' + gameId + '-start');
        
        if (ui) ui.style.display = 'none';
        if (startBtn) startBtn.style.display = 'inline-block';
    }
};
