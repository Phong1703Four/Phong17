const HTML_GAMES = `
    <section id="games" class="page-section">
        <div class="container">
            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">TRUNG TÂM TRÒ CHƠI TƯƠNG TÁC</h2>
            <div class="grid-3 reveal" id="games-grid">
                
                <!-- Game 1 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Thám Tử Áp Suất</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Tính toán nhanh áp suất trong 60 giây. Trả lời đúng liên tiếp để nhân điểm!</p>
                    <div style="text-align: center;">
                        <button id="game-pressure-start" class="btn btn-primary">Bắt Đầu Chơi</button>
                    </div>
                    <div id="game-pressure-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('pressure')">Thoát</button>
                                <div class="game-timer" id="game-pressure-timer">60s</div>
                            </div>
                            <div class="game-score">Điểm: <span id="game-pressure-score">0</span></div>
                        </div>
                        <p id="game-pressure-q" style="font-size: 1.1rem; margin: 20px 0; text-align: center; min-height: 80px;">Câu hỏi xuất hiện ở đây...</p>
                        <div style="display: flex; gap: 10px; width: 100%;">
                            <input type="number" id="game-pressure-input" placeholder="Đáp án..." style="flex:1; padding: 10px; border-radius: 8px; border: 1px solid var(--accent-1); background: var(--bg-surface); color: white;">
                            <button id="game-pressure-submit" class="btn btn-primary">Gửi</button>
                        </div>
                    </div>
                </div>

                <!-- Game 2 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Kéo Lò Xo</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Kéo quả nặng để đo lực F và độ giãn Δl, tính độ cứng k!</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-spring-start" class="btn btn-primary">Bắt Đầu</button>
                    </div>
                    <div id="game-spring-ui" class="game-container" style="display: none; position: relative;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 15px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('spring')">Thoát</button>
                                <div class="game-score" style="font-size: 1rem;">F: <span id="game-spring-f" style="color:#00E5FF">0</span> N</div>
                            </div>
                            <div class="game-score" style="font-size: 1rem;">Δl: <span id="game-spring-l" style="color:#00E5FF">0</span> m</div>
                        </div>
                        <div style="width: 100%; height: 200px; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,229,255,0.05) 100%); border-radius: 12px; border: 1px solid rgba(0,229,255,0.2); position: relative; overflow: hidden; margin-bottom: 10px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);" id="spring-drag-area">
                            <div style="position: absolute; left: 10px; top: 10px; bottom: 10px; width: 2px; background: rgba(255,255,255,0.2);"></div>
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 40px; height: 10px; background: #555;"></div>
                            <svg id="game-spring-visual" viewBox="0 0 40 100" preserveAspectRatio="none" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 30px; height: 50px; overflow: visible;">
                                <path d="M20,0 L20,10 L5,15 L35,25 L5,35 L35,45 L5,55 L35,65 L5,75 L35,85 L20,90 L20,100" fill="none" stroke="var(--accent-1)" stroke-width="3" stroke-linejoin="round"/>
                            </svg>
                            <div id="game-spring-weight" style="position: absolute; top: 60px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--accent-2); border-radius: 8px; cursor: ns-resize; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px; color: white;">KÉO</div>
                        </div>
                        <div style="display: flex; gap: 5px; width: 100%;">
                            <input type="number" id="game-spring-input" placeholder="k (N/m)" style="flex:1; padding: 10px; border-radius: 8px; background: rgba(0,0,0,0.5); border: 1px solid var(--accent-1); color: var(--accent-3);">
                            <button id="game-spring-submit" class="btn btn-primary" style="padding: 0 10px;">Check</button>
                        </div>
                        <p id="game-spring-msg" style="text-align: center; margin-top: 10px; font-size: 13px; font-weight: bold; min-height: 20px;"></p>
                    </div>
                </div>

                <!-- Game 3 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Ghép Đôi Kiến Thức</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Tìm cặp Công thức - Ý nghĩa tương ứng.</p>
                    <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 15px;">
                        <div class="game-score" id="game-memory-moves">Lượt: 0</div>
                        <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="games.initMemoryGame()">Chơi lại</button>
                    </div>
                    <div id="game-memory-grid" class="game-card-grid"></div>
                </div>

                <!-- Game 4 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Cứu Thủy Lực</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Chọn F₁ để nâng tạ nhánh lớn trước khi hết giờ!</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-hydro-start" class="btn btn-primary">Giải Cứu</button>
                    </div>
                    <div id="game-hydro-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 10px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('hydro')">Thoát</button>
                                <div class="game-timer" id="game-hydro-timer" style="color: #FF4757;">15s</div>
                            </div>
                            <div class="game-score" style="font-size: 1rem;" id="game-hydro-s-info">S₁=10 | S₂=100</div>
                        </div>
                        <div style="position: relative; height: 140px; background: rgba(0,229,255,0.05); border: 1px solid var(--accent-1); margin-bottom: 15px; overflow: hidden; display: flex; align-items: flex-end; justify-content: space-around;">
                            <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none" style="position: absolute; bottom: 0; left: 0;">
                                <path d="M 50 20 L 50 100 L 250 100 L 250 20 L 290 20 L 290 120 L 10 120 L 10 20 Z" fill="rgba(255,255,255,0.1)" stroke="var(--accent-1)"/>
                                <path id="hydro-water" d="M 12 60 L 48 60 L 48 118 L 252 118 L 252 60 L 288 60 L 288 118 L 12 118 Z" fill="rgba(0, 229, 255, 0.5)"/>
                            </svg>
                            <div style="position: relative; z-index: 2; width: 36px; height: 120px; left: -10px;">
                                <div id="hydro-piston-1" style="position: absolute; top: 50px; width: 100%; height: 20px; background: #888;"></div>
                            </div>
                            <div style="position: relative; z-index: 2; width: 36px; height: 120px; right: -25px;">
                                <div id="hydro-piston-2" style="position: absolute; top: 50px; width: 100%; height: 20px; background: #888;">
                                    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 40px; height: 30px; background: #FF4757; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">
                                        <span id="hydro-m2-val">2000</span>kg
                                    </div>
                                    <div id="hydro-robot" style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); font-size: 20px;">🤖</div>
                                </div>
                            </div>
                        </div>
                        <div id="game-hydro-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"></div>
                    </div>
                </div>

                <!-- Game 5 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Tàu Ngầm</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Tính nhanh độ sâu h (m) từ áp suất báo về!</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-sub-start" class="btn btn-primary">Lặn</button>
                    </div>
                    <div id="game-sub-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 10px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('sub')">Thoát</button>
                                <div class="game-timer" id="game-sub-timer" style="color: #00E5FF;">30s</div>
                            </div>
                            <div class="game-score" style="font-size: 0.9rem; text-align:right;">
                                <span id="game-sub-env" style="color:var(--warning);">Biển</span> (ρ=<span id="game-sub-rho">1030</span>)
                            </div>
                        </div>
                        <div id="game-sub-ocean" style="position: relative; height: 150px; width: 100%; border: 1px solid var(--accent-1); margin-bottom: 15px; background: linear-gradient(180deg, #0D1B3E 0%, #020713 100%);">
                            <div id="game-sub-vehicle" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); font-size: 30px; transition: top 1s;">🚢</div>
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); border: 1px solid var(--danger); padding: 5px; text-align: center;">
                                <div style="font-size:16px; font-weight:bold; color:var(--danger);"><span id="game-sub-p">0</span> Pa</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 5px; width: 100%;">
                            <input type="number" id="game-sub-input" placeholder="h (m)" style="flex:1; padding: 10px; border: 1px solid var(--accent-1); background: rgba(0,0,0,0.5); color: var(--accent-3);">
                            <button id="game-sub-submit" class="btn btn-primary" style="padding: 0 10px;">Báo</button>
                        </div>
                        <p id="game-sub-msg" style="text-align: center; margin-top: 10px; font-size: 13px; font-weight: bold; min-height: 20px;"></p>
                    </div>
                </div>

                <!-- Game 6 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Bắn Lò Xo</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Tính độ giãn Δl để bắn trúng hồng tâm!</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-shooter-start" class="btn btn-primary">Bắn</button>
                    </div>
                    <div id="game-shooter-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 10px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('shooter')">Thoát</button>
                                <div class="game-score" style="font-size: 1rem; color: var(--accent-2);">F: <span id="game-shooter-f">0</span></div>
                            </div>
                            <div class="game-score" style="font-size: 1rem; color: var(--accent-3);">k: <span id="game-shooter-k">0</span></div>
                        </div>
                        <div style="position: relative; height: 100px; width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px; display: flex; align-items: center;">
                            <svg id="game-shooter-spring" width="80" height="30" viewBox="0 0 100 40" preserveAspectRatio="none" style="position: absolute; left: 10px; top: 35px; transition: width 0.3s ease;">
                                <path d="M0,20 L10,5 L20,35 L30,5 L40,35 L50,5 L60,35 L70,5 L80,35 L90,20 L100,20" fill="none" stroke="var(--accent-1)" stroke-width="3"/>
                            </svg>
                            <div id="game-shooter-bullet" style="position: absolute; left: 90px; top: 40px; width: 20px; height: 20px; background: #fff; border-radius: 50%; transition: left 0.3s ease;"></div>
                            <div id="game-shooter-target" style="position: absolute; right: 10px; top: 25px; width: 50px; height: 50px; border: 3px solid var(--danger); border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                                <div style="width: 15px; height: 15px; background: var(--danger); border-radius: 50%;"></div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 5px; width: 100%;">
                            <input type="number" id="game-shooter-input" placeholder="Δl (m)" step="0.01" style="flex:1; padding: 10px; border: 1px solid var(--accent-1); background: rgba(0,0,0,0.5); color: var(--accent-3);">
                            <button id="game-shooter-submit" class="btn btn-primary" style="padding: 0 10px;">Bắn!</button>
                        </div>
                        <p id="game-shooter-msg" style="text-align: center; margin-top: 10px; font-size: 13px; font-weight: bold; min-height: 20px;"></p>
                    </div>
                </div>

                <!-- Game 7 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Đua Cơ Năng</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Chọn độ cao h đủ W để xe vượt vòng lặp R!</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-roller-start" class="btn btn-primary">Đua</button>
                    </div>
                    <div id="game-roller-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('roller')">Thoát</button>
                                <div class="game-score">Điểm: <span id="game-roller-score" style="color: var(--accent-3);">0</span></div>
                            </div>
                            <div class="game-score">R = <span id="game-roller-r" style="color: var(--accent-1);">2</span></div>
                        </div>
                        <canvas id="game-roller-canvas" width="300" height="150" style="width: 100%; background: #020617;"></canvas>
                        <div style="margin-top: 10px; width: 100%;">
                            <label style="font-size: 12px;">h = <span id="game-roller-h-val" style="color: var(--accent-1);">5</span> m</label>
                            <input type="range" id="game-roller-h" min="1" max="15" step="0.5" value="5" style="width: 100%;">
                        </div>
                        <button id="game-roller-go" class="btn btn-primary" style="margin-top: 10px; width: 100%;">THẢ XE!</button>
                        <p id="game-roller-msg" style="text-align: center; margin-top: 5px; font-size: 13px; min-height: 20px;"></p>
                    </div>
                </div>

                <!-- Game 8 -->
                <div class="glass-card game-hub-card">
                    <h3 style="margin-bottom: 15px; text-align: center;">🎮 Bậc Thầy Máy Cẩu</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px; text-align: center;">Giữ chuột để nâng hàng lên an toàn.</p>
                    <div style="text-align: center; margin-bottom: 15px;">
                        <button id="game-crane-start" class="btn btn-primary">Cẩu</button>
                    </div>
                    <div id="game-crane-ui" class="game-container" style="display: none;">
                        <div style="display:flex; justify-content: space-between; width: 100%; margin-bottom: 5px;">
                            <div style="display:flex; gap: 10px; align-items: center;">
                                <button class="btn btn-outline" style="padding: 2px 8px; font-size: 10px;" onclick="games.quitGame('crane')">Thoát</button>
                                <div class="game-score">Điểm: <span id="game-crane-score" style="color: var(--accent-3);">0</span></div>
                            </div>
                            <div class="game-timer" id="game-crane-timer" style="color: var(--accent-1);">Lần 1</div>
                        </div>
                        <canvas id="game-crane-canvas" width="300" height="150" style="width: 100%; background: #020617;"></canvas>
                        <div style="margin-top: 10px; width: 100%; display: flex; justify-content: space-between; font-size: 12px;">
                            <span>m: <span id="game-crane-mass" style="color: var(--accent-1);">50</span></span>
                            <span>F: <span id="game-crane-force" style="color: var(--accent-3);">0</span></span>
                        </div>
                        <button id="game-crane-lift" class="btn btn-outline" style="margin-top: 10px; width: 100%;">GIỮ ĐỂ NÂNG</button>
                        <p id="game-crane-msg" style="text-align: center; margin-top: 5px; font-size: 13px; min-height: 20px;"></p>
                    </div>
                </div>

            </div>
        </div>
    </section>
`;
