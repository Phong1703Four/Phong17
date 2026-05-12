const HTML_EXAM = `
    <section id="exam" class="page-section" style="display: none;">
        <div class="container">
            <h2 class="gradient-text reveal active" style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">TRUNG TÂM KIỂM TRA ĐÁNH GIÁ</h2>
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 30px;" class="reveal active">
                <button class="btn btn-outline" style="font-size: 1rem; padding: 10px 20px;" onclick="switchTab('exercises', '📝', 'BÀI TẬP')">⬅ Quay lại Bài Tập</button>
                <select id="exam-selector" class="btn btn-outline" style="font-size: 1rem; padding: 10px 20px; background: rgba(0,0,0,0.5); cursor: pointer;" onchange="exam.changeExam(this.value)">
                    <option value="de_2025">Đề Thi Đánh Giá Năng Lực 2025</option>
                    <option value="de_2024">Đề Kiểm Tra Học Kỳ 2024</option>
                    <option value="de_2026">Đề Thi Đánh Giá Năng Lực 2026</option>
                    <option value="de_hsg">Đề Thi Học Sinh Giỏi Cấp Tỉnh</option>
                    <option value="de_olympic">Đề Olympic Vật Lý 30/4</option>
                    <option value="de_cuoi_ky">Đề Thi Cuối Kỳ I - Trọng Điểm</option>
                    <option value="de_khao_sat">Đề Khảo Sát Chất Lượng Đầu Năm</option>
                    <option value="de_chuyen_ly">Đề Thi Thử Chuyên Lý KHTN</option>
                    <option value="de_on_tap_1">Đề Ôn Tập Chương IV - Mức 1</option>
                    <option value="de_on_tap_2">Đề Ôn Tập Chương IV - Mức 2</option>
                    <option value="de_on_tap_3">Đề Ôn Tập Chương IV - Mức 3</option>
                    <option value="de_mo_phong">Đề Kiểm Tra Tương Tác 3D</option>
                </select>
            </div>
            
            <div class="glass-card reveal active" style="max-width: 900px; margin: 0 auto; padding: 30px; position: relative;">
                <div id="ai-grading-overlay" style="display: none; position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.85); z-index: 10; border-radius: 15px; justify-content: center; align-items: center; flex-direction: column;">
                    <div style="width: 60px; height: 60px; border: 4px solid var(--accent-1); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <h3 style="color: var(--accent-1); margin-top: 20px;">AI đang phân tích ảnh tự luận...</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Vui lòng chờ trong giây lát (Trích xuất OCR & Đánh giá Semantic)</p>
                </div>

                <div id="exam-content"></div>
                
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <button id="exam-submit-btn" class="btn btn-primary" style="font-size: 1.2rem; padding: 15px 40px;" onclick="exam.submitExam()">NỘP BÀI & YÊU CẦU AI CHẤM</button>
                </div>
                
                <div id="exam-result" style="display: none; margin-top: 30px; text-align: center; background: rgba(0,229,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid var(--accent-1);">
                    <h3 style="font-size: 2rem; color: var(--accent-3); margin-bottom: 15px;">Kết Quả Bài Thi</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 5px;">Điểm Trắc nghiệm (Máy chấm)</p>
                            <p style="font-size: 2rem; font-weight: bold; color: var(--accent-1); margin: 0;"><span id="exam-score-obj">0</span> / 7.0</p>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 5px;">Điểm Tự luận (AI chấm)</p>
                            <p style="font-size: 2rem; font-weight: bold; color: var(--accent-2); margin: 0;"><span id="exam-score-ai">0</span> / 3.0</p>
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <p style="font-size: 1.2rem; margin-bottom: 5px;">Tổng điểm cuối cùng:</p>
                        <p style="font-size: 2.5rem; font-weight: bold; color: var(--accent-3); margin: 0; text-shadow: 0 0 10px var(--accent-3);"><span id="exam-score-total">0</span> / 10</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
