const AI_KB = [
  // === CƠ HỌC ===
  {k:['hooke','lò xo','đàn hồi','độ cứng','spring'], a:"**Định luật Hooke**: F = k·|Δl|\n- k: độ cứng (N/m), Δl: độ biến dạng\n- Giới hạn đàn hồi: vượt qua → biến dạng dẻo\n- Thế năng đàn hồi: Wt = ½k(Δl)²\n- VD: k=200N/m, Δl=0.05m → F=10N, Wt=0.25J"},
  {k:['công cơ học','công của lực','work'], a:"**Công cơ học**: A = F·s·cos(α)\n- α<90°: Công phát động (A>0)\n- α=90°: A=0 (lực vuông góc)\n- α>90°: Công cản (A<0)\n- VD: F=50N, s=10m, α=60° → A=50×10×0.5=250J"},
  {k:['công suất','power','watt'], a:"**Công suất**: P = A/t = F·v\n- Đơn vị: W (Watt), 1HP≈746W\n- VD: Kéo vật 500N với v=4m/s → P=2000W\n- Hiệu suất: H = A_có ích/A_toàn phần × 100%"},
  {k:['động năng','kinetic'], a:"**Động năng**: Wđ = ½mv²\n- Định lý động năng: ΔWđ = A(ngoại lực)\n- Wđ luôn ≥ 0, phụ thuộc hệ quy chiếu\n- VD: m=2kg, v=10m/s → Wđ=100J"},
  {k:['thế năng','potential','trọng trường'], a:"**Thế năng trọng trường**: Wt = mgh\n- h: độ cao so với mốc (tuỳ chọn mốc)\n- Thế năng đàn hồi: Wt = ½k(Δl)²\n- Thế năng có thể âm (dưới mốc)"},
  {k:['cơ năng','bảo toàn cơ năng','mechanical energy'], a:"**Cơ năng** W = Wđ + Wt = ½mv² + mgh\n- Bảo toàn khi chỉ có lực bảo toàn (P, F_đh)\n- Tại cao nhất: Wđ=min, Wt=max\n- Tại thấp nhất: Wđ=max, Wt=min\n- Có ma sát: W₂ = W₁ - |A_ms|"},
  {k:['newton','định luật newton'], a:"**3 Định luật Newton**:\n- ĐL1: Vật cân bằng khi ΣF=0 (quán tính)\n- ĐL2: **F = ma** (gia tốc cùng hướng hợp lực)\n- ĐL3: F_AB = -F_BA (lực & phản lực)"},
  {k:['áp suất','pressure','pascal'], a:"**Áp suất**: p = F/S (Pa)\n- Chất lỏng: p = p₀ + ρgh\n- p₀ = 101325Pa ≈ 1atm = 760mmHg\n- Bình thông nhau: cùng mực → cùng áp suất\n- VD: h=10m nước → p=101325+1000×10×10=201325Pa"},
  {k:['archimedes','lực đẩy','nổi','chìm','buoyancy'], a:"**Lực đẩy Archimedes**: F_A = ρ_lỏng·V_chìm·g\n- Nổi: ρ_vật < ρ_lỏng\n- Chìm: ρ_vật > ρ_lỏng\n- Lơ lửng: ρ_vật = ρ_lỏng\n- VD: V=0.01m³ trong nước → F_A=1000×0.01×10=100N"},
  {k:['thủy lực','máy ép','hydraulic'], a:"**Máy ép thủy lực**: F₁/S₁ = F₂/S₂\n- Khuếch đại lực theo tỉ lệ diện tích\n- A₁ = A₂ (bảo toàn công)\n- VD: S₂=50S₁, F₁=100N → F₂=5000N"},
  {k:['khối lượng riêng','density','tỉ trọng'], a:"**Khối lượng riêng** ρ = m/V (kg/m³)\n- Nước: 1000 | Dầu: 800 | Hg: 13600\n- Sắt: 7800 | Nhôm: 2700 | Vàng: 19300\n- Không khí: 1.29 | Gỗ: ~500-900"},
  {k:['biến dạng','kéo','nén','uốn','xoắn','deformation'], a:"**4 loại biến dạng**:\n- Kéo: Vật dài ra (dây cáp, cầu treo)\n- Nén: Vật ngắn lại (trụ cầu)\n- Uốn: Trục bị cong (dầm nhà)\n- Xoắn: Tiết diện quay (trục xe)\n- Biến dạng đàn hồi vs dẻo"},
  {k:['ma sát','friction','trượt','lăn'], a:"**Lực ma sát**: F_ms = μ·N\n- Ma sát tĩnh ≥ Ma sát trượt > Ma sát lăn\n- μ: hệ số ma sát (không đơn vị)\n- Không phụ thuộc diện tích tiếp xúc\n- VD: μ=0.3, m=10kg → F_ms=0.3×100=30N"},
  {k:['rơi tự do','free fall','trọng lực'], a:"**Rơi tự do** (nhanh dần đều, a=g):\n- v = g·t\n- h = ½g·t²\n- v² = 2gh\n- g ≈ 9.81 m/s² (hay lấy 10)\n- Không phụ thuộc khối lượng"},
  {k:['ném xiên','ném ngang','projectile','tầm xa'], a:"**Chuyển động ném**:\n- Ngang: x=v₀t, y=½gt², tầm bay L=v₀√(2h/g)\n- Xiên: L=v₀²sin(2α)/g, H=v₀²sin²α/(2g)\n- Tầm xa max khi α=45°"},
  {k:['vận tốc','gia tốc','chuyển động thẳng','kinematics'], a:"**Động học chất điểm**:\n- v = v₀ + at\n- s = v₀t + ½at²\n- v² - v₀² = 2as\n- s = (v₀+v)t/2\n- Đổi đơn vị: 1m/s = 3.6km/h"},
  {k:['tròn đều','hướng tâm','ly tâm','circular'], a:"**Chuyển động tròn đều**:\n- a_ht = v²/R = ω²R\n- F_ht = mv²/R\n- T = 2πR/v = 2π/ω\n- v = ωR, ω = 2πf\n- VD: v=10m/s, R=5m → a=20m/s²"},
  {k:['con lắc đơn','pendulum','dao động điều hòa'], a:"**Con lắc đơn**: T = 2π√(l/g)\n- Con lắc lò xo: T = 2π√(m/k)\n- x = Acos(ωt+φ), v = -Aωsin(ωt+φ)\n- ω = 2π/T = 2πf\n- W = ½kA² = ½mω²A²"},
  {k:['moment','momen','đòn bẩy','lever','cân bằng'], a:"**Moment lực**: M = F·d\n- d: cánh tay đòn (khoảng cách từ trục quay đến giá của lực)\n- Cân bằng: ΣM = 0\n- Đòn bẩy: F₁d₁ = F₂d₂"},
  {k:['xung lượng','động lượng','momentum','va chạm'], a:"**Động lượng**: p = mv\n- Xung lực: F·Δt = Δp\n- Bảo toàn: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'\n- Va chạm đàn hồi: bảo toàn cả p và W\n- Va chạm mềm: chỉ bảo toàn p"},
  // === NHIỆT HỌC ===
  {k:['nhiệt','nhiệt lượng','calorie','calorimetry'], a:"**Nhiệt lượng**: Q = mcΔt\n- c_nước = 4200 J/(kg·K)\n- c_sắt = 460, c_nhôm = 880\n- Phương trình cân bằng nhiệt: Q_toả = Q_thu\n- 1 cal = 4.186 J"},
  {k:['khí lý tưởng','boyle','charles','gay-lussac','gas law'], a:"**Khí lý tưởng**: pV = nRT\n- Boyle: pV = const (T const)\n- Charles: V/T = const (p const)\n- Gay-Lussac: p/T = const (V const)\n- R = 8.314 J/(mol·K)"},
  {k:['nhiệt động','entropy','carnot'], a:"**Nhiệt động lực học**:\n- Nguyên lý 1: ΔU = Q + A\n- Nguyên lý 2: Nhiệt không tự truyền từ lạnh sang nóng\n- Hiệu suất Carnot: η = 1 - T₂/T₁"},
  // === ĐIỆN HỌC ===
  {k:['ohm','điện trở','cường độ','hiệu điện thế','voltage'], a:"**Định luật Ohm**: U = IR\n- Nối tiếp: R = R₁+R₂, I chung, U=U₁+U₂\n- Song song: 1/R = 1/R₁+1/R₂, U chung\n- Công suất: P = UI = I²R = U²/R\n- Điện năng: A = UIt = Pt"},
  {k:['coulomb','điện tích','tĩnh điện','electric field'], a:"**Định luật Coulomb**: F = kq₁q₂/r²\n- k = 9×10⁹ Nm²/C²\n- Cường độ điện trường: E = F/q = kQ/r²\n- Điện thế: V = kQ/r\n- Tụ điện: C = Q/U, W = ½CU²"},
  {k:['từ trường','nam châm','lorentz','magnetic'], a:"**Từ trường**:\n- Lực Lorentz: F = qvBsinα\n- Lực Ampere: F = BIlsinα\n- Từ thông: Φ = BScosα\n- Cảm ứng ĐT: e = -ΔΦ/Δt\n- Quy tắc bàn tay trái/phải"},
  {k:['dòng xoay chiều','ac','xoay chiều','biến áp'], a:"**Dòng xoay chiều**:\n- u = U₀cos(ωt+φ), i = I₀cos(ωt+φ_i)\n- Biến áp: U₁/U₂ = N₁/N₂\n- Công suất: P = UIcosφ\n- Cộng hưởng: ω²LC = 1"},
  // === QUANG HỌC ===
  {k:['khúc xạ','phản xạ','snell','gương','thấu kính','lens','optics'], a:"**Quang hình học**:\n- Phản xạ: i = i' (góc tới = góc phản xạ)\n- Khúc xạ (Snell): n₁sinθ₁ = n₂sinθ₂\n- Thấu kính: 1/f = 1/d + 1/d'\n- n_nước=1.33, n_thủy tinh≈1.5"},
  {k:['giao thoa','nhiễu xạ','sóng ánh sáng','young'], a:"**Giao thoa ánh sáng (Young)**:\n- Vân sáng: x = kλD/a\n- Vân tối: x = (k+½)λD/a\n- Khoảng vân: i = λD/a\n- Ánh sáng trắng: λ = 380nm-760nm"},
  {k:['quang điện','photoelectric','einstein','photon'], a:"**Hiện tượng quang điện** (Einstein):\n- E_photon = hf = hc/λ\n- Wđ_max = hf - A (A: công thoát)\n- Giới hạn quang điện: λ₀ = hc/A\n- h = 6.626×10⁻³⁴ J·s"},
  // === SÓNG ===
  {k:['sóng','tần số','bước sóng','wave','frequency'], a:"**Sóng cơ**: v = λf\n- Sóng ngang vs sóng dọc\n- Giao thoa: Δd = kλ (cực đại), (k+½)λ (cực tiểu)\n- Sóng dừng: l = nλ/2 (2 đầu cố định)\n- Sóng âm: 20Hz-20kHz"},
  // === HẠT NHÂN ===
  {k:['hạt nhân','phóng xạ','nguyên tử','nuclear','uranium'], a:"**Vật lý hạt nhân**:\n- E = Δmc² (năng lượng liên kết)\n- Phóng xạ: N = N₀·e^(-λt), T½ = ln2/λ\n- α: He-4, β⁻: electron, γ: photon\n- Phân hạch U-235, Nhiệt hạch H→He"},
  {k:['einstein','tương đối','e=mc','relativity'], a:"**Thuyết tương đối** (Einstein 1905):\n- E = mc², c = 3×10⁸ m/s\n- Co chiều dài: l = l₀√(1-v²/c²)\n- Giãn thời gian: t = t₀/√(1-v²/c²)\n- Khối lượng tăng theo vận tốc"},
  // === THIÊN VĂN ===
  {k:['trái đất','mặt trời','hành tinh','solar','kepler'], a:"**Thiên văn học**:\n- Kepler 3: T²/a³ = const\n- Vận tốc vũ trụ cấp 1: v₁ = √(gR) ≈ 7.9 km/s\n- Hệ Mặt Trời: 8 hành tinh\n- Trái Đất: R≈6371km, g≈9.81m/s²"},
  {k:['vạn vật hấp dẫn','gravity','gravitational'], a:"**Lực hấp dẫn**: F = GMm/r²\n- G = 6.674×10⁻¹¹ Nm²/kg²\n- Gia tốc trọng trường: g = GM/R²\n- Vệ tinh: v = √(GM/r), T = 2π√(r³/GM)"},
  // === ĐƠN VỊ & HẰNG SỐ ===
  {k:['đơn vị','đổi đơn vị','unit','convert'], a:"**Đổi đơn vị thường gặp**:\n- 1km=1000m, 1m=100cm\n- 1kg=1000g, 1tấn=1000kg\n- 1m/s=3.6km/h\n- 1atm=101325Pa=760mmHg\n- 1HP=746W, 1kWh=3.6×10⁶J\n- 1cal=4.186J, 1eV=1.6×10⁻¹⁹J"},
  {k:['hằng số','constant','pi'], a:"**Hằng số Vật lý**:\n- g = 9.81 m/s²\n- c = 3×10⁸ m/s\n- h = 6.626×10⁻³⁴ J·s\n- k_B = 1.38×10⁻²³ J/K\n- N_A = 6.022×10²³ /mol\n- e = 1.6×10⁻¹⁹ C\n- G = 6.674×10⁻¹¹ Nm²/kg²"},
];

const AI_MATH = {
  solve(text) {
    const t = text.replace(/×/g,'*').replace(/÷/g,'/').replace(/,/g,'');
    // Basic arithmetic
    const m = t.match(/(?:tính|=|bằng)?\s*([0-9]+(?:\s*[+\-*/^]\s*[0-9.]+)+)/i) || t.match(/^([0-9]+(?:\s*[+\-*/^]\s*[0-9.]+)+)$/);
    if(m) {
      try {
        let expr = m[1].replace(/\^/g,'**');
        const r = new Function('return '+expr)();
        return `**${m[1].trim()} = ${Number.isInteger(r)?r:r.toFixed(4)}**`;
      } catch(e){}
    }
    // sqrt
    let sq = text.match(/căn.*?([0-9.]+)|sqrt\s*\(?([0-9.]+)/i);
    if(sq){let n=parseFloat(sq[1]||sq[2]);return `√${n} = **${Math.sqrt(n).toFixed(4)}**`;}
    // sin/cos/tan
    let tr = text.match(/(sin|cos|tan)\s*\(?([0-9.]+)\s*°?\)?/i);
    if(tr){let a=parseFloat(tr[2])*Math.PI/180;let fn={sin:Math.sin,cos:Math.cos,tan:Math.tan};return `${tr[1]}(${tr[2]}°) = **${fn[tr[1].toLowerCase()](a).toFixed(4)}**`;}
    
    // Step-by-step Physics solver
    // F=k*dl
    let fk=text.match(/k\s*=\s*([0-9.]+).*?[Δδd]l\s*=\s*([0-9.]+)/i);
    if(fk){
        let k=parseFloat(fk[1]), dl=parseFloat(fk[2]);
        let f=k*dl, wt=0.5*k*dl*dl;
        return `**Giải bài tập từng bước (Hooke):**\n- **B1**: Áp dụng công thức Lực đàn hồi: F = k·Δl\n- **B2**: Thay số: k = ${k} N/m, Δl = ${dl} m\n- **Kết quả Lực**: F = ${k} × ${dl} = **${f.toFixed(2)} N**\n\n- **B3**: Năng lượng đàn hồi: Wt = ½k(Δl)²\n- **B4**: Tính toán: Wt = 0.5 × ${k} × ${dl}² = **${wt.toFixed(2)} J**`;
    }
    // KE
    let ke=text.match(/m\s*=\s*([0-9.]+)\s*(?:kg)?.*?v\s*=\s*([0-9.]+)/i);
    if(ke&&text.match(/động năng|kinetic|wđ/i)){
        let m=parseFloat(ke[1]), v=parseFloat(ke[2]);
        let w=0.5*m*v*v;
        return `**Giải bài tập từng bước (Động năng):**\n- **B1**: Áp dụng công thức Động năng: Wđ = ½mv²\n- **B2**: Thay số: m = ${m} kg, v = ${v} m/s\n- **Kết quả**: Wđ = 0.5 × ${m} × ${v}² = **${w.toFixed(2)} J**`;
    }
    // PE
    let pe=text.match(/m\s*=\s*([0-9.]+).*?h\s*=\s*([0-9.]+)/i);
    if(pe&&text.match(/thế năng|potential|wt/i)){
        let m=parseFloat(pe[1]), h=parseFloat(pe[2]);
        let w=m*9.81*h;
        return `**Giải bài tập từng bước (Thế năng trọng trường):**\n- **B1**: Áp dụng công thức Thế năng: Wt = mgh\n- **B2**: Thay số: m = ${m} kg, g = 9.81 m/s², h = ${h} m\n- **Kết quả**: Wt = ${m} × 9.81 × ${h} = **${w.toFixed(2)} J**`;
    }
    // Pressure
    let pr=text.match(/[ρp]\s*=\s*([0-9.]+).*?h\s*=\s*([0-9.]+)/i);
    if(pr&&text.match(/áp suất|pressure/i)){
        let rho=parseFloat(pr[1]), h=parseFloat(pr[2]);
        let p=rho*9.81*h;
        return `**Giải bài tập từng bước (Áp suất chất lỏng):**\n- **B1**: Công thức áp suất thủy tĩnh: p = ρgh\n- **B2**: Thay số: ρ = ${rho} kg/m³, g = 9.81 m/s², h = ${h} m\n- **Kết quả**: p = ${rho} × 9.81 × ${h} = **${p.toFixed(0)} Pa**\n- (Nếu cộng p_atm 101325 Pa): Tổng = **${(p+101325).toFixed(0)} Pa**`;
    }
    // Work
    let wo=text.match(/F\s*=\s*([0-9.]+).*?s\s*=\s*([0-9.]+)/i);
    if(wo&&text.match(/công|work/i)){
        let F=parseFloat(wo[1]), s=parseFloat(wo[2]);
        let a=text.match(/α\s*=\s*([0-9.]+)/i);
        let angle=a?parseFloat(a[1]):0;
        let angleRad = angle*Math.PI/180;
        let A=F*s*Math.cos(angleRad);
        return `**Giải bài tập từng bước (Công cơ học):**\n- **B1**: Công thức tính Công: A = F·s·cos(α)\n- **B2**: Thay số: F = ${F} N, s = ${s} m, α = ${angle}°\n- **Kết quả**: A = ${F} × ${s} × cos(${angle}°) = **${A.toFixed(2)} J**`;
    }
    return null;
  }
};

const AI_CHAT = {
  greet:["Chào bạn! Tôi là **AI Vật lý 5.0** — trợ lý siêu thông minh! Hỏi gì cũng được! 🚀","Xin chào! Hệ thống AI 5.0 sẵn sàng phục vụ. Hãy thử hỏi tôi bất kỳ điều gì!","Hello! Tôi có thể giải bài tập, giải thích lý thuyết, tính toán — tất cả offline!"],
  thank:["Không có gì! Cần gì cứ hỏi tiếp nhé! 😊","Rất vui được giúp bạn! Có thắc mắc gì khác không?"],
  praise:["Cảm ơn! AI 5.0 được nâng cấp bộ não lên gấp 3 lần phiên bản trước! Thử hỏi bài khó xem!","Haha bạn khen tôi vui quá! Tôi biết hơn 40 chủ đề Vật lý + tính toán sin/cos/tan/căn luôn đó!"],
  insult:["Tôi hiểu! Hãy thử hỏi cụ thể hơn, VD: 'Định luật Hooke', 'Tính động năng m=2kg v=5m/s'. Tôi sẽ trả lời chính xác!","Hmm, có thể tôi chưa hiểu đúng câu hỏi. Thử đặt lại câu hỏi kiểu: 'Công thức tính...' hoặc nhập trực tiếp phép tính nhé!"],
  who:"Tôi là **AI Vật lý 5.0** — phiên bản mạnh nhất! Khả năng:\n- 📚 **40+ chủ đề** từ Cơ học đến Hạt nhân\n- 🔢 **Giải toán**: Cộng trừ nhân chia, sin/cos/tan, căn bậc hai\n- 📐 **Giải bài tập**: Nhập m, v, k, h... tôi tính ngay\n- ⚡ **100% Offline** — không cần mạng, không cần API\n- 💬 **Gõ chữ streaming** như ChatGPT thật",
  study:"**🎯 Mẹo học Vật lý đạt điểm cao:**\n- 1. Hiểu bản chất → đừng chỉ thuộc công thức\n- 2. Vẽ hình cho MỌI bài toán\n- 3. Ghi chú công thức theo sơ đồ tư duy\n- 4. Làm bài từ dễ → khó, không bỏ bước\n- 5. Liên hệ kiến thức với đời thực\n- 6. Ôn tập: Sau 1 ngày, 3 ngày, 1 tuần",
  joke:["**Vật lý hài hước:**\nNewton ngồi dưới gốc cây... may mà không phải cây dừa! 🥥😂","**Fun fact:** Nếu bạn đào một đường hầm xuyên Trái Đất và nhảy vào, bạn sẽ dao động điều hòa với T ≈ 84 phút! 🌍","**Quiz vui:** Tại sao phi hành gia không thể khóc trong vũ trụ? Vì nước mắt không rơi được do không có trọng lực! 🧑‍🚀"],
};
