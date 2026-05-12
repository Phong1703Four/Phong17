const HTML_SIMULATIONS = `
    <section id="simulations" class="page-section">
        <div class="container">
            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">MÔ PHỎNG 3D TƯƠNG TÁC</h2>
            
            <div id="floating-label" style="display:none; position:absolute; background:rgba(0,0,0,0.8); border:1px solid var(--accent-1); border-radius:8px; padding:10px; color:var(--accent-3); font-family:'Roboto Mono'; font-size:14px; pointer-events:none; z-index:100; box-shadow: 0 0 15px rgba(0,229,255,0.3); backdrop-filter: blur(5px); transform: translate(-50%, -100%); transition: top 0.1s, left 0.1s;">
                <div id="float-title" style="color:white; font-size:11px; margin-bottom:5px; text-transform:uppercase; letter-spacing:1px;">Chỉ số</div>
                <div id="float-val" style="font-weight:bold; font-size:18px;">0</div>
            </div>

            <div class="sim-container glass-card reveal">
                <div class="sim-canvas-wrapper" id="sim1-canvas"></div>
                <div class="sim-controls">
                    <h3>[SIM-1] Lò Xo & Hooke</h3>
                    <label>Độ cứng k (<span id="sim1-val-k" class="sim-value">100</span> N/m)</label>
                    <input type="range" id="sim1-k" min="10" max="500" value="100">
                    <label>Khối lượng m (<span id="sim1-val-m" class="sim-value">1</span> kg)</label>
                    <input type="range" id="sim1-m" min="0.1" max="5" step="0.1" value="1">
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between;"><span>Lực:</span><span id="sim1-res-f" class="sim-value">10.00 N</span></div>
                        <div style="display: flex; justify-content: space-between;"><span>Giãn Δl:</span><span id="sim1-res-l" class="sim-value">10.00 cm</span></div>
                    </div>
                </div>
            </div>

            <div class="sim-container glass-card reveal">
                <div class="sim-controls">
                    <h3>[SIM-2] Biến Dạng Vật Rắn</h3>
                    <button class="btn btn-outline" onclick="app.setSim2Mode('keo')">Kéo (Tensile)</button>
                    <button class="btn btn-outline" onclick="app.setSim2Mode('nen')">Nén (Compressive)</button>
                    <button class="btn btn-outline" onclick="app.setSim2Mode('uon')">Uốn (Bending)</button>
                    <button class="btn btn-outline" onclick="app.setSim2Mode('xoan')">Xoắn (Torsion)</button>
                    <label style="margin-top:15px">Lực tác dụng</label>
                    <input type="range" id="sim2-force" min="0" max="100" value="50">
                </div>
                <div class="sim-canvas-wrapper" id="sim2-canvas"></div>
            </div>

            <div class="sim-container glass-card reveal">
                <div class="sim-canvas-wrapper" id="sim3-canvas"></div>
                <div class="sim-controls">
                    <h3>[SIM-3] Áp Suất vs Độ Sâu</h3>
                    <label>Chất lỏng</label>
                    <select id="sim3-liquid" style="width: 100%; padding: 10px; background: var(--bg-deep); color: white; border: 1px solid var(--accent-1); border-radius: 8px;">
                        <option value="1000">Nước (ρ = 1000)</option><option value="800">Dầu (ρ = 800)</option><option value="13600">Thủy ngân (ρ = 13600)</option>
                    </select>
                    <label style="margin-top: 15px;">Độ sâu h (<span id="sim3-val-h" class="sim-value">50</span> m)</label>
                    <input type="range" id="sim3-h" min="0" max="100" value="50">
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between;"><span>Áp suất:</span><span id="sim3-res-p" class="sim-value" style="color: var(--accent-2);">600,000 Pa</span></div>
                    </div>
                </div>
            </div>

            <div class="sim-container glass-card reveal">
                <div class="sim-controls">
                    <h3>[SIM-4] Con Lắc Đơn - Cơ Năng</h3>
                    <button class="btn btn-outline" onclick="sim4.togglePlay()" id="sim4-play-btn">Tạm Dừng</button>
                    <label style="margin-top: 15px;">Khối lượng m (<span id="sim4-val-m" class="sim-value">1.0</span> kg)</label>
                    <input type="range" id="sim4-m" min="0.1" max="5.0" step="0.1" value="1.0">
                    <label>Góc lệch ban đầu α₀ (<span id="sim4-val-a" class="sim-value">45</span>°)</label>
                    <input type="range" id="sim4-a" min="10" max="90" value="45">
                    
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;"><span>Động năng Wđ:</span><span id="sim4-res-wd" class="sim-value" style="color: var(--accent-1);">0.00 J</span></div>
                        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;"><div id="sim4-bar-wd" style="height: 100%; background: var(--accent-1); width: 0%;"></div></div>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 10px;"><span>Thế năng Wt:</span><span id="sim4-res-wt" class="sim-value" style="color: var(--warning);">0.00 J</span></div>
                        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;"><div id="sim4-bar-wt" style="height: 100%; background: var(--warning); width: 100%;"></div></div>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 10px;"><span>Cơ năng W:</span><span id="sim4-res-w" class="sim-value" style="color: var(--accent-3);">0.00 J</span></div>
                        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;"><div id="sim4-bar-w" style="height: 100%; background: var(--accent-3); width: 100%;"></div></div>
                    </div>
                </div>
                <div class="sim-canvas-wrapper" id="sim4-canvas"></div>
            </div>

            <div class="sim-container glass-card reveal">
                <div class="sim-canvas-wrapper" id="sim5-canvas"></div>
                <div class="sim-controls">
                    <h3>[SIM-5] Máy Cẩu - Công Suất</h3>
                    <button class="btn btn-primary" onclick="sim5.startLifting()" id="sim5-start-btn">Kéo Hàng</button>
                    <label style="margin-top: 15px;">Khối lượng hàng m (<span id="sim5-val-m" class="sim-value">100</span> kg)</label>
                    <input type="range" id="sim5-m" min="10" max="500" value="100">
                    <label>Công suất động cơ P (<span id="sim5-val-p" class="sim-value">2000</span> W)</label>
                    <input type="range" id="sim5-p" min="500" max="10000" step="500" value="2000">
                    
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between;"><span>Lực kéo F:</span><span id="sim5-res-f" class="sim-value">1000 N</span></div>
                        <div style="display: flex; justify-content: space-between;"><span>Tốc độ v:</span><span id="sim5-res-v" class="sim-value">2.00 m/s</span></div>
                        <div style="display: flex; justify-content: space-between;"><span>Thời gian t:</span><span id="sim5-res-t" class="sim-value" style="color: var(--accent-3);">0.00 s</span></div>
                    </div>
                </div>
            </div>

            <!-- MÔ PHỎNG MỚI: NÉM XIÊN -->
            <div class="sim-container glass-card reveal">
                <div class="sim-controls">
                    <h3>[SIM-6] Ném Xiên (Projectile)</h3>
                    <button class="btn btn-outline" onclick="sim6.fire()" id="sim6-fire-btn">Bắn!</button>
                    <label style="margin-top: 15px;">Góc bắn α (<span id="sim6-val-a" class="sim-value">45</span>°)</label>
                    <input type="range" id="sim6-a" min="10" max="80" value="45">
                    <label>Vận tốc đầu v₀ (<span id="sim6-val-v" class="sim-value">20</span> m/s)</label>
                    <input type="range" id="sim6-v" min="5" max="50" value="20">
                    
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between;"><span>Tầm xa L:</span><span id="sim6-res-l" class="sim-value">40.00 m</span></div>
                        <div style="display: flex; justify-content: space-between;"><span>Độ cao H max:</span><span id="sim6-res-h" class="sim-value">10.00 m</span></div>
                        <div style="display: flex; justify-content: space-between;"><span>Thời gian t:</span><span id="sim6-res-t" class="sim-value" style="color: var(--warning);">2.83 s</span></div>
                    </div>
                </div>
                <div class="sim-canvas-wrapper" id="sim6-canvas"></div>
            </div>

            <!-- MÔ PHỎNG MỚI: VA CHẠM ĐÀN HỒI -->
            <div class="sim-container glass-card reveal">
                <div class="sim-canvas-wrapper" id="sim7-canvas"></div>
                <div class="sim-controls">
                    <h3>[SIM-7] Va Chạm Đàn Hồi</h3>
                    <button class="btn btn-primary" onclick="sim7.collide()" id="sim7-btn">Va Chạm</button>
                    <button class="btn btn-outline" onclick="sim7.reset()" style="margin-top:10px;">Làm mới</button>
                    <label style="margin-top: 15px; color: var(--accent-1);">Xe 1: Khối lượng m₁ (<span id="sim7-val-m1" class="sim-value">1</span> kg)</label>
                    <input type="range" id="sim7-m1" min="0.5" max="5" step="0.5" value="1">
                    <label style="color: var(--danger);">Xe 2: Khối lượng m₂ (<span id="sim7-val-m2" class="sim-value">2</span> kg)</label>
                    <input type="range" id="sim7-m2" min="0.5" max="5" step="0.5" value="2">
                    
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between;"><span>Động lượng tổng P:</span><span id="sim7-res-p" class="sim-value">10.00 kg.m/s</span></div>
                        <div style="display: flex; justify-content: space-between; margin-top:5px;"><span>Sau va chạm v₁':</span><span id="sim7-res-v1" class="sim-value" style="color: var(--accent-1);">-3.33 m/s</span></div>
                        <div style="display: flex; justify-content: space-between; margin-top:5px;"><span>Sau va chạm v₂':</span><span id="sim7-res-v2" class="sim-value" style="color: var(--danger);">6.67 m/s</span></div>
                    </div>
                </div>
            </div>

        </div>
    </section>
`;
