const HTML_VIDEO = `
    <section id="video-lesson" class="page-section">
        <div class="container">
            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">THƯ VIỆN BÀI GIẢNG VIDEO</h2>
            
            <!-- Video Playlist Options -->
            <div class="video-playlist reveal" style="display: flex; gap: 15px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap;">
                <button class="btn btn-primary playlist-btn active" onclick="switchVideo('nang-luong')" id="btn-nang-luong" style="min-width: 250px;">
                    ▶️ Năng Lượng & Công Cơ Học
                </button>
                <button class="btn btn-outline playlist-btn" onclick="switchVideo('ap-suat')" id="btn-ap-suat" style="min-width: 250px;">
                    ▶️ Lực & Áp Suất Đời Sống
                </button>
            </div>

            <div class="native-video-layout reveal" id="video-content-nang-luong">
                <!-- Cột Trái: Trình Phát Video + Phân Tích -->
                <div class="video-main-column">
                    <div class="video-player-wrapper">
                        <video class="native-video" id="video-1" controls controlsList="nodownload">
                            <source src="videos/Nang-luong-Cong-co-hoc.mp4" type="video/mp4">
                            Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                    </div>
                    
                    <!-- Phân Tích Kiến Thức -->
                    <div class="knowledge-analysis">
                        <h3><span style="color:var(--accent-1);">💡</span> Phân Tích Kiến Thức Trọng Tâm</h3>
                        <div class="analysis-grid">
                            <div class="analysis-card">
                                <h4>1. Công Cơ Học (A)</h4>
                                <p>Đại lượng vô hướng, sinh ra khi một lực tác dụng lên vật làm vật dịch chuyển.</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">A = F · s · cos(α)</div>
                            </div>
                            <div class="analysis-card">
                                <h4>2. Công Suất (P)</h4>
                                <p>Đại lượng đặc trưng cho tốc độ sinh công của vật.</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">P = A / t = F · v</div>
                            </div>
                            <div class="analysis-card">
                                <h4>3. Cơ Năng (W)</h4>
                                <p>Tổng động năng và thế năng của vật.</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">W = ½mv² + mgh</div>
                            </div>
                            <div class="analysis-card">
                                <h4>4. Định Lý Động Năng</h4>
                                <p>Độ biến thiên động năng bằng công của các ngoại lực tác dụng.</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">ΔW<sub>đ</sub> = W<sub>đ2</sub> - W<sub>đ1</sub> = A</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cột Phải: Mục Lục (TOC) -->
                <div class="video-toc-column">
                    <h3>Mục Lục Bài Giảng</h3>
                    <ul class="toc-list" data-target="video-1">
                        <li class="toc-item active" data-time="0">
                            <div class="toc-time">00:00</div>
                            <div class="toc-title">1. Mở đầu & Khái niệm Công cơ học</div>
                        </li>
                        <li class="toc-item" data-time="25">
                            <div class="toc-time">00:25</div>
                            <div class="toc-title">2. Phân loại Công</div>
                        </li>
                        <li class="toc-item" data-time="50">
                            <div class="toc-time">00:50</div>
                            <div class="toc-title">3. Công suất & Hiệu suất</div>
                        </li>
                        <li class="toc-item" data-time="75">
                            <div class="toc-time">01:15</div>
                            <div class="toc-title">4. Động năng - Định lý động năng</div>
                        </li>
                        <li class="toc-item" data-time="130">
                            <div class="toc-time">02:10</div>
                            <div class="toc-title">5. Định luật Bảo toàn Cơ năng</div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- NỘI DUNG VIDEO THỨ 2: ÁP SUẤT -->
            <div class="native-video-layout reveal" id="video-content-ap-suat" style="display: none;">
                <!-- Cột Trái: Trình Phát Video + Phân Tích -->
                <div class="video-main-column">
                    <div class="video-player-wrapper">
                        <video class="native-video" id="video-2" controls controlsList="nodownload">
                            <source src="videos/luc-va-ap-suat.mp4" type="video/mp4">
                            Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                    </div>
                    
                    <!-- Phân Tích Kiến Thức -->
                    <div class="knowledge-analysis">
                        <h3><span style="color:var(--accent-1);">💡</span> Khám Phá: Lực & Áp Suất Đời Sống</h3>
                        <div class="analysis-grid">
                            <div class="analysis-card">
                                <h4>1. Áp Lực & Áp Suất</h4>
                                <p>Tại sao mũi kim lại nhọn? Tại sao xe tăng cần bánh xích? Áp suất quyết định điều này!</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">p = F / S</div>
                            </div>
                            <div class="analysis-card">
                                <h4>2. Áp Suất Chất Lỏng</h4>
                                <p>Đập thủy điện luôn có đáy dày hơn đỉnh vì áp suất nước tăng dần theo độ sâu.</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">p = p<sub>0</sub> + ρgh</div>
                            </div>
                            <div class="analysis-card">
                                <h4>3. Lực Đẩy Archimedes</h4>
                                <p>Vì sao tàu ngầm nặng hàng nghìn tấn vẫn nổi trên mặt biển?</p>
                                <div class="formula-box" style="padding: 10px; font-size: 1rem; margin: 10px 0;">F<sub>A</sub> = ρ<sub>lỏng</sub> · V · g</div>
                            </div>
                            <div class="analysis-card">
                                <h4>4. Khí Áp Kế</h4>
                                <p>Làm thế nào ta dùng áp suất để dự báo thời tiết hoặc đo độ cao của núi?</p>
                                <ul style="padding-left: 20px; font-size: 14px; color: var(--text-muted); margin-top: 10px;">
                                    <li>Lên cao áp suất khí quyển giảm</li>
                                    <li>1 atm ≈ 1.013 × 10<sup>5</sup> Pa</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cột Phải: Mục Lục (TOC) -->
                <div class="video-toc-column">
                    <h3>Nội Dung Trọng Tâm</h3>
                    <ul class="toc-list" data-target="video-2">
                        <li class="toc-item active" data-time="0">
                            <div class="toc-time">00:00</div>
                            <div class="toc-title">Áp Lực & Diện Tích Tiếp Xúc</div>
                        </li>
                        <li class="toc-item" data-time="195">
                            <div class="toc-time">03:15</div>
                            <div class="toc-title">Định luật Pascal trong máy ép thủy lực</div>
                        </li>
                        <li class="toc-item" data-time="400">
                            <div class="toc-time">06:40</div>
                            <div class="toc-title">Bí ẩn Lực đẩy Archimedes</div>
                        </li>
                        <li class="toc-item" data-time="605">
                            <div class="toc-time">10:05</div>
                            <div class="toc-title">Áp suất không khí và ứng dụng</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
`;
