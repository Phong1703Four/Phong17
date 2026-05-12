const HTML_EXERCISES = `
    <section id="exercises" class="page-section">
        <div class="container">
            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">BÀI TẬP TỰ LUẬN</h2>
            
            <div style="text-align: center; margin-bottom: 30px;" class="reveal">
                <button class="btn btn-primary" style="font-size: 1.2rem; padding: 15px 30px; box-shadow: 0 0 20px rgba(0,229,255,0.4);" onclick="switchTab('exam', '🔥', 'LÀM ĐỀ THI')">🔥 LÀM ĐỀ KIỂM TRA ĐÁNH GIÁ NĂNG LỰC 🔥</button>
            </div>

            <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 30px;" class="reveal" id="exercise-filters">
                <button class="btn btn-outline active" onclick="app.renderExercises('all')">Tất cả</button>
                <button class="btn btn-outline" onclick="app.renderExercises('dan-hoi')">Lực Đàn Hồi</button>
                <button class="btn btn-outline" onclick="app.renderExercises('ap-suat')">Áp Suất</button>
                <button class="btn btn-outline" onclick="app.renderExercises('ac-si-met')">Archimedes</button>
                <button class="btn btn-outline" onclick="app.renderExercises('dong-luc-hoc')">Động Lực Học</button>
                <button class="btn btn-outline" onclick="app.renderExercises('nang-luong')">Năng Lượng</button>
            </div>

            <div class="grid-2 reveal" id="exercise-list"></div>
        </div>
    </section>
`;
