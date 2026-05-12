const app = {
    init() {
        const dynamicContent = document.getElementById('dynamic-content');
        if(dynamicContent) {
            dynamicContent.innerHTML = HTML_THEORY + HTML_SIMULATIONS + HTML_VIDEO + HTML_EXERCISES + HTML_QUIZ + HTML_GAMES + HTML_EXAM;
        }
        
        this.renderExercises();
        quiz.init();
        chatbot.init();
        games.init();
        exam.init();
        
        // SPA mode: activate all reveal elements immediately
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        
        // Sims deferred to first tab open (hidden sections have 0 dimensions)
        window._simsInited = false;
        window.initSimsOnce = function() {
            if (window._simsInited) return;
            window._simsInited = true;
            setTimeout(() => { sim1.init(); sim2.init(); sim3.init(); sim4.init(); sim5.init(); sim6.init(); sim7.init(); }, 50);
        };
        
        setTimeout(() => {
            document.getElementById('loader-progress').style.width = '100%';
            setTimeout(() => { 
                document.getElementById('loading').style.opacity = '0'; 
                setTimeout(() => document.getElementById('loading').style.display = 'none', 500); 
                simHero.init(); 
            }, 300);
        }, 1000);
    },
    
    renderExercises(topic = 'all') {
        // Update filter UI
        const filterBtns = document.querySelectorAll('#exercise-filters .btn');
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // simple match by onclick attribute (hacky but works)
            const activeBtn = Array.from(filterBtns).find(b => b.getAttribute('onclick').includes(topic));
            if (activeBtn) activeBtn.classList.add('active');
        }

        const filtered = topic === 'all' ? EXERCISES : EXERCISES.filter(ex => ex.topic === topic);
        
        document.getElementById('exercise-list').innerHTML = filtered.map((ex, i) => `
            <div class="glass-card exercise-item">
                <span class="badge ${ex.level}">${ex.level === 'coban' ? '🟢 Cơ bản' : (ex.level === 'trungbinh' ? '🟡 Trung bình' : '🔴 Nâng cao')}</span>
                <span class="badge" style="background: rgba(255,255,255,0.1); margin-left: 5px;">${ex.topic}</span>
                <h4 style="margin-bottom: 15px; font-weight: 500; font-size: 15px; line-height: 1.6; margin-top: 10px;">${ex.text}</h4>
                <button class="btn btn-outline" style="padding: 6px 15px; font-size: 13px;" onclick="document.getElementById('sol-${i}-${topic}').style.display = document.getElementById('sol-${i}-${topic}').style.display==='block'?'none':'block'">👁 Xem lời giải</button>
                <div id="sol-${i}-${topic}" class="solution-panel">
                    <p style="font-size: 14px; color: var(--accent-3); line-height: 1.6;">${ex.sol}</p>
                </div>
            </div>`
        ).join('');
    },
    
    setSim2Mode(mode) { 
        if (sim2.currentMode !== mode) { 
            sim2.currentMode = mode; 
            sim2.resetObject(); 
        } 
    }
};

const quiz = {
    currentIdx: 0, 
    score: 0,
    init() { this.render(); },
    render() {
        document.getElementById('quiz-total').innerText = QUIZ.length;
        if (this.currentIdx >= QUIZ.length) {
            document.getElementById('quiz-question-container').innerHTML = `<h3 style="text-align:center; color: var(--accent-3); font-size: 2rem;">Hoàn Thành!</h3><p style="text-align:center; margin-top:20px; font-size: 1.2rem;">Điểm của bạn: <strong>${this.score} / ${QUIZ.length * 10}</strong></p><div style="text-align:center; margin-top: 20px;"><button class="btn btn-primary" onclick="location.reload()">Làm lại từ đầu</button></div>`;
            document.getElementById('quiz-progress').style.width = '100%';
            return;
        }
        document.getElementById('quiz-progress').style.width = ((this.currentIdx / QUIZ.length) * 100) + '%';
        const q = QUIZ[this.currentIdx]; 
        document.getElementById('quiz-current').innerText = this.currentIdx + 1;
        document.getElementById('quiz-question').innerText = q.q;
        document.getElementById('quiz-options').innerHTML = q.opts.map((opt, i) => `<div class="quiz-option" onclick="quiz.check(${i}, this)"><strong>${String.fromCharCode(65+i)}.</strong>&nbsp;&nbsp;${opt}</div>`).join('');
        document.getElementById('quiz-explanation').style.display = 'none'; 
        document.getElementById('quiz-next-btn').style.display = 'none';
    },
    check(idx, btn) {
        const q = QUIZ[this.currentIdx]; 
        const btns = document.querySelectorAll('.quiz-option'); 
        btns.forEach(b => b.style.pointerEvents = 'none');
        
        let isCorrect = (idx === q.ans);
        
        if (isCorrect) { 
            btn.classList.add('correct'); 
            this.score += 10; 
            document.getElementById('quiz-score').innerText = this.score; 
        } else { 
            btn.classList.add('wrong'); 
            btns[q.ans].classList.add('correct'); 
        }
        
        const exp = document.getElementById('quiz-explanation'); 
        exp.innerHTML = `<strong style="font-size: 16px; color: ${isCorrect ? 'var(--accent-3)' : 'var(--danger)'};">${isCorrect ? '🎉 Chính xác!' : '💡 Thật tiếc, sai rồi!'}</strong><br><br><span style="color: var(--text-main); line-height: 1.5;">${q.expl}</span>`; 
        exp.style.display = 'block';
        exp.style.animation = 'slideUp 0.3s ease';
        document.getElementById('quiz-next-btn').style.display = 'inline-block';
    },
    next() { this.currentIdx++; this.render(); }
};

window.onload = () => app.init();
