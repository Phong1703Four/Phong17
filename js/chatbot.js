const chatbot = {
    isTyping: false,
    history: [],

    init() {
        this.renderUI();
        this.bindEvents();
        setTimeout(() => this.streamMessage("Chào bạn! Tôi là **AI Vật lý 6.0** — phiên bản mới nhất, có khả năng giải toán từng bước và ghi nhớ ngữ cảnh giao tiếp! Hỏi tôi đi! 🚀", 'bot'), 500);
    },

    renderUI() {
        ['chatbot-btn','chatbot-window'].forEach(id => { const e=document.getElementById(id); if(e)e.remove(); });
        const btn = document.createElement('button');
        btn.id = 'chatbot-btn';
        btn.innerHTML = '<span class="ai-status-pulse"></span> 🤖';
        document.body.appendChild(btn);

        const w = document.createElement('div');
        w.id = 'chatbot-window';
        w.innerHTML = `
            <div id="chatbot-header">
                <h3><span class="ai-status-dot"></span> AI CORE 6.0</h3>
                <div style="display:flex;gap:8px;align-items:center;">
                    <button id="chatbot-clear" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;" title="Xoá lịch sử">🗑️</button>
                    <button id="chatbot-close" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:18px;">✖</button>
                </div>
            </div>
            <div id="chatbot-quick" style="display:flex;gap:6px;padding:8px 15px;overflow-x:auto;border-bottom:1px solid rgba(0,246,255,0.1);">
                <button class="chat-quick" data-q="Định luật Hooke">🔬 Hooke</button>
                <button class="chat-quick" data-q="Công thức động năng">⚡ Động năng</button>
                <button class="chat-quick" data-q="Áp suất chất lỏng">💧 Áp suất</button>
                <button class="chat-quick" data-q="Bảo toàn cơ năng">🔄 Cơ năng</button>
                <button class="chat-quick" data-q="Bạn là ai?">🤖 About</button>
                <button class="chat-quick" data-q="Mẹo học Vật lý">📖 Tips</button>
                <button class="chat-quick" data-q="Kể chuyện vui">😂 Fun</button>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input-area">
                <input type="text" id="chatbot-input" placeholder="Hỏi bất kỳ điều gì..." autocomplete="off">
                <button id="chatbot-send">➤</button>
            </div>
        `;
        document.body.appendChild(w);
    },

    bindEvents() {
        const btn=document.getElementById('chatbot-btn'), win=document.getElementById('chatbot-window');
        const close=document.getElementById('chatbot-close'), send=document.getElementById('chatbot-send');
        const input=document.getElementById('chatbot-input'), clear=document.getElementById('chatbot-clear');

        btn.addEventListener('click', () => { win.classList.add('active'); btn.style.display='none'; input.focus(); });
        close.addEventListener('click', () => { win.classList.remove('active'); setTimeout(()=>{btn.style.display='flex';},300); });
        clear.addEventListener('click', () => { document.getElementById('chatbot-messages').innerHTML=''; this.history=[]; this.streamMessage("Đã xoá lịch sử! Hỏi tôi điều gì đó đi! 🧹",'bot'); });

        // Quick buttons
        document.querySelectorAll('.chat-quick').forEach(b => {
            b.addEventListener('click', () => { input.value = b.dataset.q; send.click(); });
        });

        const doSend = () => {
            if(this.isTyping) return;
            const text = input.value.trim();
            if(!text) return;
            this.addMessage(text,'user');
            this.history.push({role:'user',text});
            input.value='';
            this.isTyping=true;

            const tid = 'typ-'+Date.now();
            const mc = document.getElementById('chatbot-messages');
            const d = document.createElement('div');
            d.className='chat-msg bot typing-indicator'; d.id=tid;
            d.innerHTML='<span></span><span></span><span></span>';
            mc.appendChild(d); mc.scrollTop=mc.scrollHeight;

            setTimeout(()=>{
                const r=this.think(text);
                const el=document.getElementById(tid); if(el)el.remove();
                this.streamMessage(r,'bot');
                this.history.push({role:'bot',text:r});
            }, 300+Math.random()*500);
        };

        send.addEventListener('click', doSend);
        input.addEventListener('keypress', e => { if(e.key==='Enter') doSend(); });
    },

    think(text) {
        const lo = text.toLowerCase();

        // Math
        const math = AI_MATH.solve(text);
        if(math) return math;

        // Chat patterns
        if(lo.match(/^(chào|hello|hi|hey|xin chào|ê|yo|alo)/)) return AI_CHAT.greet[Math.floor(Math.random()*AI_CHAT.greet.length)];
        if(lo.match(/cảm ơn|thank|tks/)) return AI_CHAT.thank[Math.floor(Math.random()*AI_CHAT.thank.length)];
        if(lo.match(/giỏi|hay|tuyệt|đẹp|cool|pro|mạnh|sịn/)) return AI_CHAT.praise[Math.floor(Math.random()*AI_CHAT.praise.length)];
        if(lo.match(/ngu|dốt|tệ|chán|dở|kém|sai/)) return AI_CHAT.insult[Math.floor(Math.random()*AI_CHAT.insult.length)];
        if(lo.match(/khỏe|sao rồi|thế nào/)) return "Tôi luôn ở trạng thái tốt nhất! Sẵn sàng giải bài Vật lý cho bạn! 💪";
        if(lo.match(/bạn là ai|tên.*gì|là gì vậy|giới thiệu/)) return AI_CHAT.who;
        if(lo.match(/cách học|mẹo|bí quyết|tips|làm sao.*giỏi/)) return AI_CHAT.study;
        if(lo.match(/vui|joke|hài|cười|fun fact/)) return AI_CHAT.joke[Math.floor(Math.random()*AI_CHAT.joke.length)];
        if(lo.match(/tạm biệt|bye|goodbye/)) return "Tạm biệt bạn! Chúc học tốt! Quay lại bất cứ lúc nào nhé! 👋";
        if(lo.match(/yêu|love/)) return "Haha cảm ơn! Tôi cũng rất thích giúp đỡ bạn! ❤️ Giờ thì hỏi Vật lý đi nào!";

        // Context from history - Memory Logic
        if(lo.match(/^(tiếp|thêm|nữa|chi tiết|giải thích|more|explain)/)) {
            const lastBot = this.history.filter(h=>h.role==='bot').slice(-1)[0];
            if(lastBot) return `Bạn muốn tìm hiểu thêm! Đây là thông tin bổ sung dựa trên câu trước:\n\n${lastBot.text}\n\nHãy hỏi cụ thể hơn để tôi giải thích chi tiết nhé!`;
        }
        
        // Context Memory: check previous user query if the current query lacks entities
        let searchPhrase = lo;
        const keywordsCount = lo.split(/\s+/).filter(w => w.length > 3).length;
        if (keywordsCount < 2 && this.history.length >= 2) {
            // User query is too short (e.g. "tại sao?", "ví dụ?"). Look at the last user query.
            const lastUser = this.history.filter(h=>h.role==='user').slice(-1)[0];
            if (lastUser) searchPhrase = lastUser.text.toLowerCase() + " " + lo;
        }

        // Knowledge base - weighted scoring
        let best=null, bestS=0;
        for(const item of AI_KB) {
            let s=0;
            for(const key of item.k) {
                if(searchPhrase.includes(key)) s += key.length * 2;
                // Partial match bonus
                else if(key.length>4 && searchPhrase.includes(key.substring(0,4))) s += 2;
            }
            if(s>bestS){bestS=s;best=item;}
        }
        if(best && bestS>=4) return best.a;

        // Smart fallback
        let words = lo.split(/\s+/).filter(w => w.length>2 && !['những','các','một','như','của','là','được','trong','với','cho','đây','này','kia','thì','mà','hay','có','không','tôi','bạn','gì','nào','sao','thế','hãy','về','cho','tôi','biết','giúp'].includes(w));
        let topic = words.slice(-3).join(' ')||'câu hỏi này';

        return `Hmm, tôi chưa hiểu rõ ý bạn về **${topic}**. Bạn có thể hỏi cụ thể hơn được không?\n- "Công thức tính [khái niệm]"\n- Hoặc nhập bài toán: "m=5kg v=10m/s tính động năng"\n\n📚 Tôi ghi nhớ được chuỗi hội thoại, nên bạn cứ hỏi tiếp câu trước nhé!`;
    },

    addMessage(text,sender) {
        const mc=document.getElementById('chatbot-messages'), d=document.createElement('div');
        d.className=`chat-msg ${sender}`;
        const f=this.fmt(text);
        d.innerHTML = sender==='bot' ? `<div class="avatar">🤖</div><div class="content">${f}</div>` : `<div class="content">${f}</div><div class="avatar">👤</div>`;
        mc.appendChild(d); mc.scrollTop=mc.scrollHeight;
    },

    streamMessage(text,sender) {
        const mc=document.getElementById('chatbot-messages'), d=document.createElement('div');
        d.className=`chat-msg ${sender}`;
        d.innerHTML=`${sender==='bot'?'<div class="avatar">🤖</div>':''}<div class="content sc"></div>${sender==='user'?'<div class="avatar">👤</div>':''}`;
        mc.appendChild(d);
        const cd=d.querySelector('.content');
        let i=0; this.isTyping=true;
        const type=()=>{
            if(i<text.length){cd.innerHTML=this.fmt(text.substring(0,i+1))+'<span class="cursor">|</span>';mc.scrollTop=mc.scrollHeight;i++;setTimeout(type,Math.random()*15+3);}
            else{cd.innerHTML=this.fmt(text);this.isTyping=false;}
        };
        type();
    },

    fmt(t) {
        let f=t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>').replace(/- (.*?)(?=<br>|$)/g,'<li>$1</li>');
        if(f.includes('<li>'))f=f.replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>');
        return f;
    }
};
