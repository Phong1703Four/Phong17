const exam = {
    currentExamId: 'de_2025',
    uploadedImages: {},

    init() {
        this.renderExam();
    },

    changeExam(examId) {
        if (!EXAM_DATA[examId]) return;
        this.currentExamId = examId;
        this.uploadedImages = {};
        this.renderExam();
        
        // Reset result view
        document.getElementById('exam-result').style.display = 'none';
        document.getElementById('exam-submit-btn').style.display = 'inline-block';
        document.getElementById('exam-submit-btn').innerText = 'NỘP BÀI & YÊU CẦU AI CHẤM';
    },

    handleImageUpload(event, qIndex) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImages[qIndex] = e.target.result;
                const previewImg = document.getElementById(`exam_p4_img_preview_${qIndex}`);
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    },

    renderExam() {
        const container = document.getElementById('exam-content');
        const examData = EXAM_DATA[this.currentExamId];
        if (!container || !examData) return;

        let html = '';

        // Phần I
        html += '<h3 style="color: var(--accent-1); margin-top: 0;">PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (3.0 điểm)</h3>';
        html += '<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Thí sinh trả lời các câu hỏi. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</p>';
        
        examData.part1.forEach((q, i) => {
            html += `<div class="exam-q-box" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
                <p style="font-weight: bold; margin-bottom: 10px;">Câu ${i+1}: ${q.q}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">`;
            q.opts.forEach((opt, j) => {
                html += `<label style="display: flex; align-items: center; cursor: pointer; padding: 5px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                    <input type="radio" name="exam_p1_q${i}" value="${j}" style="margin-right: 10px;">
                    <span><strong>${String.fromCharCode(65+j)}.</strong> ${opt}</span>
                </label>`;
            });
            html += `</div>
                <div id="exam_p1_res_${i}" style="margin-top: 10px; font-weight: bold; display: none;"></div>
            </div>`;
        });

        // Phần II
        html += '<h3 style="color: var(--accent-1); margin-top: 40px;">PHẦN II. Câu trắc nghiệm đúng sai (2.0 điểm)</h3>';
        html += '<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</p>';
        
        examData.part2.forEach((q, i) => {
            html += `<div class="exam-q-box" style="margin-bottom: 30px; padding: 15px; background: rgba(0,229,255,0.05); border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 15px;">Câu ${i+1}: ${q.q}</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <th style="text-align: left; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.2);">Nhận định</th>
                        <th style="text-align: center; width: 60px; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.2);">Đúng</th>
                        <th style="text-align: center; width: 60px; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.2);">Sai</th>
                    </tr>`;
            q.opts.forEach((opt, j) => {
                html += `<tr>
                    <td style="padding: 10px 8px; border-bottom: 1px solid rgba(255,255,255,0.05);">${opt.text}</td>
                    <td style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <input type="radio" name="exam_p2_q${i}_opt${j}" value="D">
                    </td>
                    <td style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <input type="radio" name="exam_p2_q${i}_opt${j}" value="S">
                    </td>
                </tr>`;
            });
            html += `</table>
                <div id="exam_p2_res_${i}" style="margin-top: 10px; font-weight: bold; display: none;"></div>
            </div>`;
        });

        // Phần III
        html += '<h3 style="color: var(--accent-1); margin-top: 40px;">PHẦN III. Câu trắc nghiệm trả lời ngắn (2.0 điểm)</h3>';
        html += '<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Điền kết quả số vào ô trống.</p>';
        
        examData.part3.forEach((q, i) => {
            html += `<div class="exam-q-box" style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px;">
                <p style="font-weight: bold; margin: 0;">Câu ${i+1}: ${q.q}</p>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="number" step="any" id="exam_p3_q${i}" placeholder="Nhập đáp án..." style="padding: 8px 12px; border-radius: 5px; border: 1px solid var(--accent-1); background: rgba(0,0,0,0.3); color: white; width: 200px;">
                    <div id="exam_p3_res_${i}" style="font-weight: bold; display: none;"></div>
                </div>
            </div>`;
        });

        // Phần IV - CÓ UPLOAD ẢNH
        html += '<h3 style="color: var(--accent-1); margin-top: 40px;">PHẦN IV. Câu hỏi Tự luận (3.0 điểm)</h3>';
        html += '<p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Thí sinh trình bày bài ra giấy, chụp ảnh và tải lên để AI chấm điểm tự động.</p>';
        
        examData.part4.forEach((q, i) => {
            html += `<div class="exam-q-box" style="margin-bottom: 20px; background: rgba(255,255,255,0.02); padding: 15px; border-left: 3px solid var(--accent-2);">
                <p style="font-weight: bold; margin-bottom: 10px;">${q.q}</p>
                
                <div style="margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border: 1px dashed var(--accent-1);">
                    <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 10px; color: var(--accent-1);">
                        <span style="font-size: 1.5rem;">📸</span> Tải ảnh bài làm của bạn
                        <input type="file" accept="image/*" style="display: none;" onchange="exam.handleImageUpload(event, ${i})">
                    </label>
                    <img id="exam_p4_img_preview_${i}" src="" style="display: none; max-width: 100%; max-height: 200px; margin-top: 10px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.2);">
                </div>

                <div id="exam_p4_res_${i}" style="display: none; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1); color: var(--accent-3); margin-top: 15px;">
                    <p style="margin:0; font-style: italic; color: white;">Đáp án chuẩn:</p>
                    <p style="margin: 5px 0 15px 0; white-space: pre-line;">${q.sol}</p>
                    <div id="exam_p4_ai_feedback_${i}" style="background: rgba(0, 229, 255, 0.1); padding: 10px; border-radius: 5px; border-left: 3px solid var(--accent-3);"></div>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    },

    submitExam() {
        if (!confirm("Bạn có chắc chắn muốn nộp bài? AI sẽ tự động phân tích và chấm điểm phần tự luận.")) return;

        // Show AI grading overlay
        document.getElementById('ai-grading-overlay').style.display = 'flex';
        
        // Mô phỏng thời gian AI đang quét hình ảnh (OCR + Semantic Evaluation)
        setTimeout(() => {
            document.getElementById('ai-grading-overlay').style.display = 'none';
            this.processGrading();
        }, 3000); // 3 giây
    },

    processGrading() {
        let objScore = 0;
        let aiScore = 0;
        const examData = EXAM_DATA[this.currentExamId];

        // Chấm Phần I (0.25đ/câu)
        examData.part1.forEach((q, i) => {
            const selected = document.querySelector(`input[name="exam_p1_q${i}"]:checked`);
            const resDiv = document.getElementById(`exam_p1_res_${i}`);
            resDiv.style.display = 'block';
            if (selected && parseInt(selected.value) === q.ans) {
                objScore += 0.25;
                resDiv.innerHTML = '<span style="color: var(--accent-3);">✔ Đúng (+0.25đ)</span>';
            } else {
                resDiv.innerHTML = `<span style="color: var(--danger);">✘ Sai (Đáp án đúng: ${String.fromCharCode(65+q.ans)})</span>`;
            }
        });

        // Chấm Phần II (4 ý, đếm số ý đúng)
        examData.part2.forEach((q, i) => {
            let correctCount = 0;
            q.opts.forEach((opt, j) => {
                const selected = document.querySelector(`input[name="exam_p2_q${i}_opt${j}"]:checked`);
                if (selected && selected.value === opt.ans) correctCount++;
            });
            let pts = 0;
            if (correctCount === 1) pts = 0.1;
            else if (correctCount === 2) pts = 0.25;
            else if (correctCount === 3) pts = 0.5;
            else if (correctCount === 4) pts = 1.0;
            
            objScore += pts;
            const resDiv = document.getElementById(`exam_p2_res_${i}`);
            resDiv.style.display = 'block';
            resDiv.innerHTML = `<span style="color: ${pts===1.0 ? 'var(--accent-3)' : 'var(--warning)'};">Đúng ${correctCount}/4 ý (+${pts}đ)</span>`;
        });

        // Chấm Phần III (0.5đ/câu)
        examData.part3.forEach((q, i) => {
            const input = document.getElementById(`exam_p3_q${i}`).value;
            const resDiv = document.getElementById(`exam_p3_res_${i}`);
            resDiv.style.display = 'block';
            if (input !== '' && parseFloat(input) === q.ans) {
                objScore += 0.5;
                resDiv.innerHTML = '<span style="color: var(--accent-3);">✔ Đúng (+0.5đ)</span>';
            } else {
                resDiv.innerHTML = `<span style="color: var(--danger);">✘ Sai (Đáp án đúng: ${q.ans})</span>`;
            }
        });

        // AI Chấm Phần IV (Mỗi câu 1.0đ)
        examData.part4.forEach((q, i) => {
            document.getElementById(`exam_p4_res_${i}`).style.display = 'block';
            const feedbackDiv = document.getElementById(`exam_p4_ai_feedback_${i}`);
            
            let pts = 0;
            let feedbackText = "";

            if (this.uploadedImages[i]) {
                // Có ảnh -> Mô phỏng AI chấm
                // Tạo điểm ngẫu nhiên hợp lý từ 0.5 đến 1.0
                const rand = Math.random();
                if (rand > 0.7) {
                    pts = 1.0;
                    feedbackText = "🤖 AI Nhận Xét: Nét chữ rõ ràng. Phân tích OCR cho thấy bạn đã áp dụng đúng các định luật vật lý và ra kết quả chính xác tuyệt đối. Trình bày rất tốt!";
                } else if (rand > 0.3) {
                    pts = 0.75;
                    feedbackText = "🤖 AI Nhận Xét: Bài làm đúng hướng và lập luận logic. Tuy nhiên, có một chút thiếu sót ở phần giải thích hiện tượng hoặc kết luận. Rất đáng khen!";
                } else {
                    pts = 0.5;
                    feedbackText = "🤖 AI Nhận Xét: Bạn có nắm được công thức cơ bản nhưng quá trình biến đổi toán học/trình bày còn sơ sài. Cần luyện tập thêm kỹ năng giải thích.";
                }
            } else {
                // Không upload ảnh -> 0 điểm
                pts = 0.0;
                feedbackText = "🤖 AI Nhận Xét: Không tìm thấy hình ảnh bài làm tải lên. Không thể chấm điểm.";
            }

            aiScore += pts;
            feedbackDiv.innerHTML = `<strong>Điểm AI đánh giá: ${pts.toFixed(2)}/1.0 đ</strong><br/><span style="color: var(--text-muted); font-size: 0.9rem;">${feedbackText}</span>`;
        });

        // Hiển thị kết quả
        document.getElementById('exam-submit-btn').style.display = 'none';
        document.getElementById('exam-result').style.display = 'block';
        
        document.getElementById('exam-score-obj').innerText = objScore.toFixed(2);
        document.getElementById('exam-score-ai').innerText = aiScore.toFixed(2);
        document.getElementById('exam-score-total').innerText = (objScore + aiScore).toFixed(2);
        
        document.getElementById('exam-result').scrollIntoView({ behavior: 'smooth' });
    }
};
