const HTML_QUIZ = `
    <section id="quiz" class="page-section">
        <div class="container">
            <div class="glass-card reveal">
                <h2 class="gradient-text" style="text-align: center; font-size: 2rem; margin-bottom: 10px;">TRẮC NGHIỆM THÔNG MINH</h2>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div>Câu: <span id="quiz-current" class="sim-value">1</span>/<span id="quiz-total">25</span></div>
                    <div>Điểm: <span id="quiz-score" class="sim-value" style="color: var(--accent-3);">0</span></div>
                </div>
                <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress"></div></div>
                <div id="quiz-question-container">
                    <h3 id="quiz-question" style="margin-bottom: 20px;">Đang tải câu hỏi...</h3>
                    <div id="quiz-options"></div>
                    <div id="quiz-explanation" style="display:none; margin-top: 15px; padding: 15px; background: rgba(0,229,255,0.1); border-left: 4px solid var(--accent-1); border-radius: 4px; font-size: 14px;"></div>
                </div>
                <div style="text-align: right; margin-top: 20px;"><button id="quiz-next-btn" class="btn btn-primary" style="display:none;" onclick="quiz.next()">Câu tiếp theo ➔</button></div>
            </div>
        </div>
    </section>
`;
