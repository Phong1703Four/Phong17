const EXERCISES = [
    { topic: 'dan-hoi', level: 'coban', text: 'Bài 1: Một lò xo dài tự nhiên l₀ = 20 cm. Treo vật m = 200 g thì lò xo dài 22 cm. Tính độ cứng k và lực đàn hồi F.', sol: '1. Đổi đơn vị: m = 200g = 0.2kg<br>2. Lực đàn hồi: F = mg = 0.2 × 10 = 2 N<br>3. Độ giãn: Δl = 22 - 20 = 2 cm = 0.02 m<br>4. Độ cứng: k = F / Δl = 2 / 0.02 = 100 N/m.' },
    { topic: 'dan-hoi', level: 'coban', text: 'Bài 2: Lò xo có k = 200 N/m. Tính độ giãn khi treo vật 400 g. Nếu treo thêm vật 200 g thì độ giãn thêm bao nhiêu?', sol: '1. Ban đầu: m₁ = 0.4kg → F₁ = 4N. Δl₁ = F₁/k = 4/200 = 0.02m = 2cm.<br>2. Thêm vật: m_thêm = 0.2kg → F_thêm = 2N. Độ giãn thêm: Δl_thêm = F_thêm/k = 2/200 = 0.01m = 1cm.' },
    { topic: 'dan-hoi', level: 'trungbinh', text: 'Bài 3: Hai lò xo giống nhau k = 100 N/m mắc nối tiếp. Tính độ cứng tương đương và độ giãn khi treo vật m = 300 g.', sol: '1. Nối tiếp: 1/k_td = 1/k₁ + 1/k₂ = 1/100 + 1/100 = 2/100 → k_td = 50 N/m.<br>2. Lực: F = mg = 0.3 × 10 = 3N.<br>3. Độ giãn: Δl = F / k_td = 3 / 50 = 0.06m = 6cm.' },
    { topic: 'dan-hoi', level: 'nangcao', text: 'Bài 4: Hai lò xo k₁ = 60 N/m và k₂ = 40 N/m mắc song song, treo vật m = 500 g. Tính độ giãn mỗi lò xo và lực đàn hồi từng lò xo.', sol: '1. Song song: k_td = k₁ + k₂ = 60 + 40 = 100 N/m.<br>2. F = 5N → Δl_chung = F/k_td = 5/100 = 0.05m = 5cm.<br>3. F₁ = k₁·Δl = 60 × 0.05 = 3N.<br>4. F₂ = k₂·Δl = 40 × 0.05 = 2N.' },
    { topic: 'ap-suat', level: 'coban', text: 'Bài 5: Một khối gỗ m = 12 kg đặt trên sàn, diện tích đáy S = 0.04 m². Tính áp suất khối gỗ tác dụng lên sàn.', sol: '1. Áp lực: F = P = mg = 12 × 10 = 120 N.<br>2. Áp suất: p = F/S = 120 / 0.04 = 3000 Pa.' },
    { topic: 'ap-suat', level: 'coban', text: 'Bài 6: So sánh áp suất tác dụng lên sàn khi đứng bằng 2 chân (S = 400 cm²) và khi đứng bằng 1 chân. Người nặng m = 60 kg.', sol: '1. 2 chân: S₁ = 400cm² = 0.04m². p₁ = 600 / 0.04 = 15000 Pa.<br>2. 1 chân: S₂ = 200cm² = 0.02m². p₂ = 600 / 0.02 = 30000 Pa (Gấp đôi).' },
    { topic: 'ap-suat', level: 'trungbinh', text: 'Bài 7: Một chiếc đinh mũi có đầu nhọn diện tích S₁ = 0.1 mm², đầu đóng S₂ = 1 cm². Lực đóng F = 20 N. Tính áp suất tại đầu nhọn và đầu đóng.', sol: '1. Đầu nhọn: S₁ = 0.1 × 10⁻⁶ m². p₁ = 20 / 10⁻⁷ = 2×10⁸ Pa.<br>2. Đầu đóng: S₂ = 10⁻⁴ m². p₂ = 20 / 10⁻⁴ = 200000 Pa.' },
    { topic: 'ap-suat', level: 'coban', text: 'Bài 8: Tính áp suất tại đáy bể bơi sâu h = 2 m, biết ρ_nước = 1000 kg/m³, p₀ = 10⁵ Pa.', sol: 'p = p₀ + ρgh = 100000 + 1000 × 10 × 2 = 120000 Pa.' },
    { topic: 'ap-suat', level: 'trungbinh', text: 'Bài 9: Một bình hình trụ đường kính D = 20 cm, đựng thủy ngân cao h = 76 cm. Tính áp suất tại đáy bình (ρ_Hg = 13600 kg/m³).', sol: 'Áp suất do cột chất lỏng: p_lỏng = ρgh = 13600 × 9.81 × 0.76 ≈ 101396 Pa ≈ 1 atm.' },
    { topic: 'ap-suat', level: 'trungbinh', text: 'Bài 10: Một người thợ lặn làm việc ở độ sâu 30 m dưới biển (ρ = 1025 kg/m³). Tính áp suất nước tác dụng lên người thợ lặn.', sol: 'p = p₀ + ρgh = 10⁵ + 1025 × 10 × 30 = 407500 Pa ≈ 4 atm.' },
    { topic: 'ap-suat', level: 'nangcao', text: 'Bài 11: Một đập thủy điện có mực nước cao h₁ = 50 m phía thượng lưu và h₂ = 5 m phía hạ lưu. Tính lực tổng hợp tác dụng lên 1 m² thân đập tại đáy.', sol: 'Chênh lệch áp suất đáy: Δp = ρg(h₁ - h₂) = 1000 × 10 × (50 - 5) = 450000 Pa.<br>Lực trên 1m² là F = Δp × S = 450000 × 1 = 450000 N.' },
    { topic: 'dan-hoi', level: 'trungbinh', text: 'Bài 12: Một guitar có dây thép dài L = 65 cm, tiết diện A = 0.5 mm². Khi căng dây với lực F = 70 N thì dây giãn Δl = 0.1 mm. Tính k và E.', sol: '1. k = F / Δl = 70 / 0.0001 = 700000 N/m.<br>2. E = F·L / (A·Δl) = (70 × 0.65) / (0.5×10⁻⁶ × 10⁻⁴) = 9.1×10¹¹ Pa.' },
    { topic: 'thuy-luc', level: 'trungbinh', text: 'Bài 13: Máy ép thủy lực: piston nhỏ diện tích S₁ = 10 cm², piston lớn S₂ = 500 cm². Tác dụng lực f₁ = 200 N lên piston nhỏ. Tính lực F₂.', sol: 'Nguyên lý Pascal: p₁ = p₂ → F₁/S₁ = F₂/S₂.<br>F₂ = F₁ × (S₂/S₁) = 200 × (500/10) = 10000 N.' },
    { topic: 'ac-si-met', level: 'nangcao', text: 'Bài 14: Một chiếc thuyền gỗ khối lượng m = 50 kg, thể tích V = 0.2 m³. Thuyền chở tối đa bao nhiêu kg hàng?', sol: 'Lực đẩy Ac-si-met lớn nhất: F_A = ρ_nước × V × g = 1000 × 0.2 × 10 = 2000 N.<br>Trọng lượng thuyền: P = 50 × 10 = 500 N.<br>Trọng lượng hàng tối đa: 2000 - 500 = 1500 N → m = 150 kg.' },
    { topic: 'ac-si-met', level: 'nangcao', text: 'Bài 15: Lò xo k = 500 N/m treo vật m = 1 kg trong không khí. Nhúng vật vào nước. Tính độ thay đổi chiều dài lò xo.', sol: 'Trong không khí: Δl₁ = mg/k = 10/500 = 0.02 m.<br>Trong nước chịu thêm F_A = ρ_nước·V·g = 1000·(1/8000)·10 = 1.25 N.<br>Trọng lượng biểu kiến: P\' = 10 - 1.25 = 8.75 N.<br>Δl₂ = 8.75/500 = 0.0175 m.<br>Thay đổi = 0.02 - 0.0175 = 0.0025 m = 2.5 mm.' },
    { topic: 'dong-luc-hoc', level: 'coban', text: 'Bài 16: Một ô tô khối lượng 1.5 tấn đang chạy với vận tốc 72 km/h thì hãm phanh, dừng lại sau 50m. Tính lực hãm phanh trung bình.', sol: '1. Đổi v = 72 km/h = 20 m/s. m = 1500 kg.<br>2. Gia tốc: a = (0 - v²)/2s = -400/100 = -4 m/s².<br>3. Lực hãm: F = ma = 1500 × (-4) = -6000 N. Độ lớn là 6000 N.' },
    { topic: 'dong-luc-hoc', level: 'trungbinh', text: 'Bài 17: Một vật 2kg trượt trên mặt phẳng ngang với hệ số ma sát μ = 0.2. Lực kéo ngang F = 10N. Tính gia tốc của vật.', sol: '1. Lực ma sát: F_ms = μmg = 0.2 × 2 × 10 = 4 N.<br>2. Theo định luật II Newton: F - F_ms = ma.<br>3. Suy ra: 10 - 4 = 2a → a = 6/2 = 3 m/s².' },
    { topic: 'nang-luong', level: 'coban', text: 'Bài 18: Tính động năng của một viên đạn 50g bay với vận tốc 400 m/s.', sol: 'Động năng: W_đ = ½mv² = 0.5 × 0.05 × 400² = 4000 J.' },
    { topic: 'nang-luong', level: 'trungbinh', text: 'Bài 19: Ném một vật 500g từ độ cao 10m xuống đất với vận tốc ban đầu 5 m/s. Tính cơ năng tại thời điểm ném.', sol: '1. Chọn mốc thế năng tại mặt đất.<br>2. Động năng W_đ = ½mv² = 0.5 × 0.5 × 25 = 6.25 J.<br>3. Thế năng W_t = mgh = 0.5 × 10 × 10 = 50 J.<br>4. Cơ năng W = W_đ + W_t = 56.25 J.' },
    { topic: 'nang-luong', level: 'nangcao', text: 'Bài 20: Con lắc đơn dài l = 1m kéo lệch góc 60° rồi thả nhẹ. Tính vận tốc khi qua vị trí cân bằng.', sol: '1. Cơ năng bảo toàn. Ban đầu: W_đ=0, W_t = mgl(1 - cosα) = mg(1 - 0.5) = 0.5mg.<br>2. Tại VTCB: W_t=0, W_đ = ½mv².<br>3. Suy ra ½mv² = 0.5mg → v = √g ≈ √10 = 3.16 m/s.' },
    { topic: 'ap-suat', level: 'trungbinh', text: 'Bài 21: Máy bay bay ở độ cao 10km. Áp suất ngoài là 0.26 atm. Nếu không điều áp, áp lực tác dụng lên cửa sổ S = 0.1 m² từ trong ra ngoài là bao nhiêu?', sol: '1. Áp suất trong máy bay p_in = 1 atm. p_out = 0.26 atm.<br>2. Chênh lệch áp suất Δp = 0.74 atm = 0.74 × 101325 = 74980 Pa.<br>3. Áp lực F = Δp × S = 74980 × 0.1 = 7498 N.' },
    { topic: 'thuy-luc', level: 'coban', text: 'Bài 22: Kích thủy lực có tỉ lệ diện tích S₂/S₁ = 100. Cần nâng xe 2000kg. Phải tác dụng lực F₁ bao nhiêu?', sol: '1. F₂ = Trọng lượng xe = 2000 × 10 = 20000 N.<br>2. Nguyên lý Pascal: F₁ = F₂ / (S₂/S₁) = 20000 / 100 = 200 N.' },
    { topic: 'ac-si-met', level: 'trungbinh', text: 'Bài 23: Một quả cầu thép (ρ = 7800 kg/m³) có thể tích 100 cm³ chìm trong nước. Tính lực căng của sợi dây treo nó.', sol: '1. Trọng lượng: P = ρ_thép × V × g = 7800 × 10⁻⁴ × 10 = 7.8 N.<br>2. Lực đẩy: F_A = ρ_nước × V × g = 1000 × 10⁻⁴ × 10 = 1 N.<br>3. Lực căng dây: T = P - F_A = 7.8 - 1 = 6.8 N.' },
    { topic: 'dong-luc-hoc', level: 'nangcao', text: 'Bài 24: Một hệ hai vật m₁=2kg, m₂=3kg nối với nhau qua ròng rọc. Tính gia tốc của hệ.', sol: '1. Phương trình: P₂ - T = m₂a và T - P₁ = m₁a.<br>2. Cộng 2 pt: (m₂-m₁)g = (m₁+m₂)a.<br>3. Gia tốc a = (3-2)×10 / (2+3) = 10/5 = 2 m/s².' },
    { topic: 'nang-luong', level: 'trungbinh', text: 'Bài 25: Xe 1 tấn lên dốc nghiêng 30° với v không đổi 36 km/h. μ = 0.1. Tính công suất động cơ.', sol: '1. v = 10 m/s. Trọng lượng thành phần P_x = mg·sin(30) = 5000 N.<br>2. Lực ma sát F_ms = μmg·cos(30) = 0.1×10000×0.866 = 866 N.<br>3. Lực kéo F_k = P_x + F_ms = 5866 N.<br>4. Công suất P = F_k × v = 5866 × 10 = 58660 W.' }
];

const QUIZ = [
    { q: "Biến dạng kéo xảy ra khi nào?", opts: ["Vật bị lực ép từ hai đầu vào nhau", "Vật bị lực kéo dài ra từ hai đầu", "Vật bị uốn cong", "Vật bị xoắn"], ans: 1, expl: "Biến dạng kéo làm thanh vật dài ra theo chiều lực tác dụng." },
    { q: "Định luật Hooke phát biểu rằng lực đàn hồi:", opts: ["Tỉ lệ thuận với thời gian biến dạng", "Tỉ lệ nghịch với độ cứng của lò xo", "Tỉ lệ thuận với độ biến dạng", "Không phụ thuộc vào độ biến dạng"], ans: 2, expl: "F = k·|Δl|, F tỉ lệ thuận với Δl." },
    { q: "Đơn vị của độ cứng lò xo k là:", opts: ["N·m", "N/m", "m/N", "kg/m"], ans: 1, expl: "Từ F = kΔl → k = F/Δl → đơn vị N/m." },
    { q: "Áp suất được tính bằng công thức:", opts: ["p = F·S", "p = F/S", "p = S/F", "p = m·g"], ans: 1, expl: "Áp suất là áp lực trên 1 đơn vị diện tích." },
    { q: "Đơn vị của áp suất trong hệ SI là:", opts: ["N", "N/m", "Pa (N/m²)", "kg/m²"], ans: 2, expl: "Pascal (Pa)." },
    { q: "Áp suất chất lỏng tại độ sâu h được tính bằng:", opts: ["p = ρgh", "p = p₀ + ρgh", "p = p₀ - ρgh", "p = p₀ · ρgh"], ans: 1, expl: "Tổng áp suất gồm áp suất khí quyển p₀ và áp suất cột chất lỏng ρgh." },
    { q: "Khi lặn xuống sâu hơn trong nước, áp suất:", opts: ["Giảm dần", "Không đổi", "Tăng dần", "Bằng áp suất mặt nước"], ans: 2, expl: "Theo công thức p = p₀ + ρgh." },
    { q: "Lực đàn hồi có hướng:", opts: ["Cùng chiều với lực gây biến dạng", "Ngược chiều với lực gây biến dạng", "Vuông góc với lực gây biến dạng", "Không xác định được hướng"], ans: 1, expl: "Lực đàn hồi luôn chống lại sự biến dạng." },
    { q: "Tại sao đáy đập thủy điện phải dày hơn phần trên?", opts: ["Để tiết kiệm vật liệu xây dựng", "Vì áp suất nước tăng theo độ sâu", "Để đập đứng vững về mặt hình học", "Vì đáy tiếp xúc với nền đất"], ans: 1, expl: "h lớn thì p lớn, nên đáy chịu lực cực mạnh." },
    { q: "Kéo lò xo vượt quá giới hạn đàn hồi thì:", opts: ["Lò xo quay về hình dạng ban đầu", "Lò xo bị biến dạng vĩnh viễn", "Lò xo sẽ cứng hơn sau đó", "Lực đàn hồi tăng gấp đôi"], ans: 1, expl: "Trở thành biến dạng dẻo." },
    { q: "Hai bình cùng đáy, đựng cùng chất lỏng, cùng độ cao. Bình A thẳng, bình B phình. Áp suất tại đáy:", opts: ["Bình A lớn hơn", "Bình B lớn hơn", "Bằng nhau", "Phụ thuộc chất lỏng"], ans: 2, expl: "Áp suất chất lỏng chỉ phụ thuộc độ sâu h, không phụ thuộc hình dạng bình." },
    { q: "Người đứng trên tuyết mang giày tuyết rộng để:", opts: ["Đi nhanh hơn", "Tăng diện tích → giảm áp suất → không lún", "Giữ ấm chân", "Đẹp hơn"], ans: 1, expl: "S tăng làm p = F/S giảm." },
    { q: "Dây đàn guitar dày thì âm thanh phát ra:", opts: ["Cao hơn dây mảnh", "Thấp hơn dây mảnh", "Bằng dây mảnh", "Không liên quan độ dày"], ans: 1, expl: "Dày hơn → tần số thấp hơn → âm trầm (thấp) hơn." },
    { q: "Lực đàn hồi xuất hiện khi:", opts: ["Vật đứng yên trên mặt phẳng ngang", "Vật bị biến dạng", "Vật chuyển động thẳng đều", "Vật rơi tự do"], ans: 1, expl: "Do vật bị biến dạng tạo ra lực chống lại." },
    { q: "Áp suất tại các điểm nằm trên cùng mặt phẳng nằm ngang trong chất lỏng:", opts: ["Tăng dần từ trong ra ngoài", "Bằng nhau", "Phụ thuộc vị trí ngang", "Chỉ bằng ở mặt thoáng"], ans: 1, expl: "Theo định luật cơ bản của tĩnh học lưu chất." },
    { q: "Lò xo A k=100 N/m, lò xo B k=200 N/m. Lò xo nào cứng hơn?", opts: ["Lò xo A", "Lò xo B", "Như nhau", "Không xác định"], ans: 1, expl: "k lớn hơn = cứng hơn." },
    { q: "Lò xo dài 25cm khi treo vật 2N, dài 30cm khi treo vật 4N. l₀ và k là:", opts: ["l₀ = 20 cm, k = 40 N/m", "l₀ = 22 cm, k = 50 N/m", "l₀ = 18 cm, k = 60 N/m", "l₀ = 25 cm, k = 80 N/m"], ans: 0, expl: "k = ΔF/Δl = 2 / 0.05 = 40. l₀ = 25 - 2/40 = 20cm." },
    { q: "Áp suất dưới đáy bể nước sâu 3 m (ρ=1000, p₀=10⁵) là:", opts: ["10⁵ Pa", "1.3×10⁵ Pa", "3×10⁴ Pa", "2×10⁵ Pa"], ans: 1, expl: "p = 100000 + 1000×10×3 = 130000 = 1.3×10⁵." },
    { q: "Một vật S = 2 cm² chịu lực kéo F = 400 N. Ứng suất là:", opts: ["2×10⁶ Pa", "2×10⁴ Pa", "200 Pa", "800 Pa"], ans: 0, expl: "400 / 0.0002 = 2,000,000 Pa." },
    { q: "Lò xo k = 50 N/m, treo vật m = 100 g. Chiều dài lò xo tăng thêm:", opts: ["5 cm", "2 cm", "10 cm", "0.5 cm"], ans: 1, expl: "Δl = mg/k = 0.1×10 / 50 = 0.02m = 2cm." },
    { q: "Thợ lặn ở độ sâu 20 m, biển ρ = 1025. Áp suất tổng là bao nhiêu atm?", opts: ["1 atm", "2 atm", "3 atm", "4 atm"], ans: 2, expl: "p = 10⁵ + 1025×10×20 = 305000 Pa ≈ 3 atm." },
    { q: "Hai lò xo k₁=100, k₂=100 mắc nối tiếp, độ cứng tương đương:", opts: ["200 N/m", "100 N/m", "50 N/m", "25 N/m"], ans: 2, expl: "1/k = 1/100 + 1/100 = 2/100 → k = 50 N/m." },
    { q: "Áp suất chất lỏng KHÔNG phụ thuộc vào:", opts: ["Khối lượng riêng", "Gia tốc trọng trường", "Độ sâu h", "Hình dạng và thể tích bình chứa"], ans: 3, expl: "Công thức p = p₀ + ρgh không có biến về hình dạng." },
    { q: "Máy ép thủy lực S₁=5cm², S₂=200cm², f₁=50N. F₂ bằng:", opts: ["500 N", "1250 N", "2000 N", "4000 N"], ans: 2, expl: "F₂ = F₁ × S₂/S₁ = 50 × 200/5 = 2000 N." },
    { q: "Tại sao tàu ngầm làm bằng thép lại nổi được?", opts: ["Thép nhẹ hơn nước", "Tàu rỗng, thể tích lớn nên lực đẩy Archimedes đủ lớn", "Thép có tính đàn hồi đặc biệt", "Áp suất triệt tiêu"], ans: 1, expl: "Nhờ thể tích chiếm chỗ lớn nên lực đẩy lên rất lớn cân bằng với trọng lượng." },
    { q: "Nguyên lý làm việc của phanh thủy lực (phanh ô tô) là gì?", opts: ["Định luật Hooke", "Nguyên lý Archimedes", "Nguyên lý Pascal", "Định luật Newton"], ans: 2, expl: "Nguyên lý Pascal giúp truyền nguyên vẹn áp suất qua chất lỏng, từ bàn đạp phanh khuếch đại lực lên các bánh xe." },
    { q: "Lực nào giữ cho bầu khí quyển của Trái Đất không bị bay vào vũ trụ?", opts: ["Lực đàn hồi", "Lực ma sát", "Lực đẩy Archimedes", "Lực hấp dẫn"], ans: 3, expl: "Lực hấp dẫn của Trái Đất hút các phân tử khí, giữ chúng lại tạo thành bầu khí quyển." },
    { q: "Khi ta dùng ống hút uống nước, điều gì thực sự đẩy nước lên?", opts: ["Lực hút của miệng", "Sự mao dẫn", "Áp suất khí quyển", "Lực đẩy Archimedes"], ans: 2, expl: "Khi hút, ta làm giảm áp suất trong ống, áp suất khí quyển bên ngoài lớn hơn sẽ đẩy nước lên." },
    { q: "Vật chất không thể di chuyển nhanh hơn tốc độ nào?", opts: ["Tốc độ âm thanh", "Tốc độ ánh sáng trong chân không", "Tốc độ vũ trụ cấp 1", "Không có giới hạn"], ans: 1, expl: "Theo thuyết tương đối hẹp của Einstein, tốc độ ánh sáng trong chân không (c) là giới hạn tốc độ tuyệt đối của vũ trụ." },
    { q: "Độ cứng k của lò xo phụ thuộc vào yếu tố nào?", opts: ["Khối lượng vật treo", "Lực kéo", "Bản chất vật liệu và kích thước lò xo", "Gia tốc trọng trường"], ans: 2, expl: "k là đại lượng đặc trưng cho bản thân lò xo, phụ thuộc vào chất liệu, tiết diện dây, đường kính vòng và số vòng." }
];

const CHATBOT_KNOWLEDGE = [
    {
        keywords: ['lò xo', 'định luật hooke', 'kéo', 'nén', 'đàn hồi', 'k', 'delta l', 'độ giãn', 'độ cứng'],
        response: "Định luật Hooke cho biết: Trong giới hạn đàn hồi, lực đàn hồi tỉ lệ thuận với độ biến dạng của lò xo. Công thức là: F = k.|Δl|. Trong đó k là độ cứng (N/m), và Δl là độ biến dạng (m). Cần tôi giải giúp bài tập nào về lò xo không?"
    },
    {
        keywords: ['áp suất', 'áp lực', 'p =', 'sâu', 'chất lỏng', 'nước', 'pascal', 'p0', 'rho', 'đáy bể'],
        response: "Áp suất chất lỏng tại một điểm ở độ sâu h được tính bằng công thức: p = p₀ + ρ.g.h (p₀ là áp suất khí quyển, ρ là khối lượng riêng, g là gia tốc rơi tự do). Bạn có thắc mắc gì về áp suất hay máy ép thủy lực không?"
    },
    {
        keywords: ['máy ép thủy lực', 'piston', 'thủy lực', 'đòn bẩy chất lỏng'],
        response: "Máy ép thủy lực hoạt động dựa trên nguyên lý Pascal: Áp suất được truyền đi nguyên vẹn trong chất lỏng. Công thức là: F₁/S₁ = F₂/S₂. Tiết diện S càng lớn thì lực nâng F thu được càng lớn! Ứng dụng thực tế là máy nâng ô tô trong gara đó."
    },
    {
        keywords: ['ác si mét', 'archimedes', 'nổi', 'chìm', 'thuyền', 'lực đẩy'],
        response: "Lực đẩy Archimedes tác dụng lên vật nhúng trong chất lỏng có độ lớn bằng trọng lượng phần chất lỏng bị vật chiếm chỗ: F_A = ρ_lỏng . V_chìm . g. Vật nổi khi F_A > Trọng lượng P, lơ lửng khi bằng, và chìm khi F_A < P."
    },
    {
        keywords: ['biến dạng', 'uốn', 'xoắn', 'dẻo', 'giới hạn đàn hồi'],
        response: "Có 4 loại biến dạng chính: Kéo (dài ra), Nén (ngắn lại), Uốn (cong trục), Xoắn (vặn quanh trục). Đặc biệt chú ý, nếu kéo lực quá lớn vượt qua 'Giới hạn đàn hồi', vật sẽ bị biến dạng dẻo (không thể tự khôi phục hình dáng cũ)."
    },
    {
        keywords: ['newton', '3 định luật', 'niuton', 'niu tơn', 'lực', 'gia tốc', 'f=ma'],
        response: "Nhà vật lý Isaac Newton có 3 định luật cơ bản: 1. Quán tính (Vật đang đứng yên sẽ tiếp tục đứng yên, đang CĐTĐ sẽ tiếp tục CĐTĐ nếu không có lực tác dụng). 2. Gia tốc tỉ lệ thuận với lực (F = m.a). 3. Lực và phản lực (A tác dụng lên B một lực thì B cũng tác dụng lại A một lực cùng phương, ngược chiều, cùng độ lớn)."
    },
    {
        keywords: ['điện', 'dòng điện', 'hiệu điện thế', 'ôm', 'ohm', 'vôn', 'ampe'],
        response: "Về Điện học: Định luật Ohm phát biểu Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với Hiệu điện thế và tỉ lệ nghịch với Điện trở (I = U/R). Công suất điện P = U.I."
    },
    {
        keywords: ['quang', 'ánh sáng', 'khúc xạ', 'phản xạ', 'thấu kính', 'gương'],
        response: "Về Quang học: Ánh sáng truyền theo đường thẳng trong môi trường trong suốt và đồng tính. Khi gặp mặt phân cách 2 môi trường, nó có thể bị phản xạ hoặc khúc xạ (bị gãy khúc). Tốc độ ánh sáng trong chân không là c = 300,000 km/s!"
    },
    {
        keywords: ['năng lượng', 'động năng', 'thế năng', 'cơ năng', 'bảo toàn'],
        response: "Định luật bảo toàn năng lượng là nền tảng của vạn vật: 'Năng lượng không tự nhiên sinh ra cũng không tự nhiên mất đi, nó chỉ chuyển hóa từ dạng này sang dạng khác'. Cơ năng là tổng của Động năng (1/2.m.v²) và Thế năng (m.g.h)."
    },
    {
        keywords: ['nhiệt', 'động học phân tử', 'nhiệt độ', 'celsius', 'kelvin'],
        response: "Nhiệt học nghiên cứu về chuyển động hỗn loạn của các phân tử. Nhiệt độ càng cao, các phân tử cấu tạo nên vật chuyển động càng nhanh. Độ 0 tuyệt đối (0 Kelvin, tức -273.15°C) là trạng thái mà mọi chuyển động phân tử đều ngừng lại."
    },
    {
        keywords: ['thuyết tương đối', 'einstein', 'e=mc2', 'e=mc^2', 'thời gian'],
        response: "Theo thuyết tương đối của Albert Einstein, không gian và thời gian không phải là tuyệt đối. Đặc biệt, phương trình E=mc² cho thấy khối lượng và năng lượng có thể chuyển hóa lẫn nhau. Một khối lượng cực nhỏ cũng chứa một năng lượng khổng lồ!"
    },
    {
        keywords: ['hố đen', 'vũ trụ', 'hệ mặt trời', 'trái đất', 'trọng lực', 'hấp dẫn'],
        response: "Lực hấp dẫn là lực hút giữa mọi vật có khối lượng. Định luật Vạn vật hấp dẫn của Newton mô tả lực này. Hố đen là những khu vực có mật độ vật chất dày đặc đến mức lực hấp dẫn của nó không cho phép cả ánh sáng thoát ra ngoài!"
    },
    {
        keywords: ['chào', 'hello', 'hi', 'bạn là ai', 'tên gì', 'có ai ở đây', 'alo'],
        response: "Chào bạn! Tôi là Trợ lý AI Siêu Việt - Tinh Thông Mọi Kiến Thức Vật Lý. Hãy hỏi tôi bất cứ điều gì về vạn vật, từ lò xo, áp suất cho đến hố đen hay thuyết tương đối!"
    },
    {
        keywords: ['cảm ơn', 'thank', 'hay quá', 'giỏi', 'tuyệt vời', 'đúng rồi', 'ok'],
        response: "Rất sẵn lòng! Giới hạn duy nhất của tri thức là trí tưởng tượng. Đừng ngại khám phá thêm các hiện tượng vật lý khác nhé!"
    },
    {
        keywords: ['làm sao', 'cách giải', 'công thức', 'hướng dẫn', 'tính'],
        response: "Vật lý là việc tìm ra công thức phù hợp với hiện tượng. Hãy cho tôi biết cụ thể bạn đang cần tính toán về lực, vận tốc, năng lượng hay áp suất?"
    },
    {
        keywords: ['ngu', 'dốt', 'chán', 'khó hiểu', 'không biết'],
        response: "Vật lý mô tả lại thế giới tự nhiên bằng ngôn ngữ Toán học nên đôi khi hơi phức tạp. Hãy chia nhỏ vấn đề ra, bạn đang vướng mắc ở hiện tượng nào? Tôi sẽ giải thích bằng ngôn ngữ đời thường nhất cho bạn!"
    }
];

const EXAM_DATA_TEMP = {
    p1: [
        { q: "Lực đàn hồi của lò xo xuất hiện khi nào?", opts: ["Khi lò xo bị nung nóng", "Khi lò xo bị biến dạng", "Khi lò xo bị làm lạnh", "Khi lò xo đặt nằm ngang"], ans: 1 },
        { q: "Đơn vị của áp suất là gì?", opts: ["N", "J", "Pa", "W"], ans: 2 },
        { q: "Áp suất chất lỏng tại độ sâu h tính bằng công thức nào?", opts: ["p = ρgh", "p = ρg/h", "p = mgh", "p = F/S"], ans: 0 },
        { q: "Khi một vật nổi trên mặt nước, lực đẩy Archimedes có độ lớn bằng:", opts: ["Trọng lượng của vật", "Thể tích của vật", "Khối lượng riêng của nước", "Trọng lượng phần nước bị vật chiếm chỗ"], ans: 3 },
        { q: "Biến dạng nén xảy ra khi vật:", opts: ["Bị kéo dài ra", "Bị ép ngắn lại", "Bị uốn cong", "Bị xoắn vòng"], ans: 1 },
        { q: "Động năng của một vật phụ thuộc vào:", opts: ["Vận tốc và khối lượng", "Vị trí và khối lượng", "Lực tác dụng", "Gia tốc"], ans: 0 },
        { q: "Công thức tính thế năng trọng trường là:", opts: ["Wt = 1/2mv²", "Wt = mgh", "Wt = mg/h", "Wt = F.s"], ans: 1 },
        { q: "Cơ năng bảo toàn khi vật chỉ chịu tác dụng của:", opts: ["Lực ma sát", "Lực cản không khí", "Trọng lực và lực đàn hồi", "Bất kỳ lực nào"], ans: 2 },
        { q: "Công của lực tác dụng được tính bằng:", opts: ["A = F.s.cos(α)", "A = F.s.sin(α)", "A = F/s", "A = m.a"], ans: 0 },
        { q: "Trong máy ép thủy lực, lực nâng F₂ tỉ lệ thuận với:", opts: ["Vận tốc piston", "Tiết diện S₂", "Khối lượng chất lỏng", "Chiều cao cột chất lỏng"], ans: 1 },
        { q: "Nếu khối lượng vật tăng gấp đôi, vận tốc không đổi thì động năng:", opts: ["Tăng gấp đôi", "Tăng gấp 4", "Không đổi", "Giảm một nửa"], ans: 0 },
        { q: "Một lò xo có độ cứng k=100 N/m, giãn 5cm. Lực đàn hồi là:", opts: ["500 N", "50 N", "5 N", "0.5 N"], ans: 2 }
    ],
    p2: [
        {
            q: "Nhận định sau về lực ma sát và công cơ học:",
            opts: [
                { text: "a) Lực ma sát luôn sinh công cản.", ans: "D" },
                { text: "b) Lực ma sát có thể sinh công phát động trong một số trường hợp đặc biệt.", ans: "D" },
                { text: "c) Công của trọng lực phụ thuộc vào hình dạng quỹ đạo chuyển động.", ans: "S" },
                { text: "d) Khi vật trượt xuống mặt phẳng nghiêng, trọng lực luôn sinh công dương.", ans: "D" }
            ]
        },
        {
            q: "Nhận định sau về áp suất chất lỏng:",
            opts: [
                { text: "a) Áp suất chất lỏng tại một điểm phụ thuộc vào hình dạng bình chứa.", ans: "S" },
                { text: "b) Áp suất chất lỏng luôn tác dụng vuông góc lên mặt tiếp xúc.", ans: "D" },
                { text: "c) Ở cùng một độ sâu trong lòng chất lỏng, áp suất tại mọi hướng đều bằng nhau.", ans: "D" },
                { text: "d) Lực đẩy Archimedes không phụ thuộc vào khối lượng riêng của vật.", ans: "D" }
            ]
        }
    ],
    p3: [
        { q: "Một vật có m=2kg, chuyển động với v=5m/s. Tính động năng (J).", ans: 25 },
        { q: "Lò xo có k=200N/m, chịu lực kéo 10N. Độ giãn (cm) là bao nhiêu?", ans: 5 },
        { q: "Thợ lặn ở sâu 10m trong nước (ρ=1000, g=10). Áp suất do nước gây ra (Pa) là?", ans: 100000 },
        { q: "Máy ép thủy lực có S₂ = 100 S₁. F₁ = 50N thì F₂ (N) bằng bao nhiêu?", ans: 5000 }
    ],
    p4: [
        {
            q: "Câu 1 (1.0đ): Trình bày ngắn gọn nguyên lý Pascal. Máy ép thủy lực hoạt động như thế nào?",
            sol: "- Nguyên lý Pascal: Áp suất tác dụng lên một chất lỏng chứa trong bình kín được truyền đi nguyên vẹn theo mọi hướng.\n- Ứng dụng trong máy ép thủy lực: Truyền áp suất p = F₁/S₁ = F₂/S₂ giúp khuếch đại lực."
        },
        {
            q: "Câu 2 (1.0đ): Một con lắc đơn dài 1m được kéo lệch góc 60 độ rồi thả nhẹ. Dùng định luật bảo toàn cơ năng chứng minh vận tốc ở VTCB là √(gl).",
            sol: "- Chọn mốc thế năng ở VTCB.\n- Cơ năng đầu: W = Wt = mgl(1-cos60) = 0.5mgl.\n- Cơ năng ở VTCB: W = Wđ = 0.5mv².\n- Bảo toàn: 0.5mv² = 0.5mgl => v = √(gl)."
        },
        {
            q: "Câu 3 (1.0đ): Giải thích vì sao khi bơm xe đạp, nếu ta lấy tay bịt vòi bơm và nén piston xuống thì càng nén càng thấy nặng?",
            sol: "- Khi bịt kín và nén, thể tích khối khí giảm (V giảm).\n- Quá trình có thể coi gần đúng là đẳng nhiệt, p tỉ lệ nghịch với V.\n- Thể tích giảm làm áp suất tăng cao, nên áp lực tác dụng ngược lại piston rất lớn, tay ta cảm thấy nặng."
        }
    ]
};

const EXAM_DATA = {
    de_2025: {
        title: "Đề Thi Đánh Giá Năng Lực 2025",
        part1: [
            { q: "Lực đàn hồi của lò xo xuất hiện khi nào?", opts: ["Khi lò xo bị nung nóng", "Khi lò xo bị biến dạng", "Khi lò xo bị làm lạnh", "Khi lò xo đặt nằm ngang"], ans: 1 },
            { q: "Đơn vị của áp suất là gì?", opts: ["N", "J", "Pa", "W"], ans: 2 },
            { q: "Áp suất chất lỏng tại độ sâu h tính bằng công thức nào?", opts: ["p = ρgh", "p = ρg/h", "p = mgh", "p = F/S"], ans: 0 },
            { q: "Khi một vật nổi trên mặt nước, lực đẩy Archimedes có độ lớn bằng:", opts: ["Trọng lượng của vật", "Thể tích của vật", "Khối lượng riêng của nước", "Trọng lượng phần nước bị vật chiếm chỗ"], ans: 3 },
            { q: "Biến dạng nén xảy ra khi vật:", opts: ["Bị kéo dài ra", "Bị ép ngắn lại", "Bị uốn cong", "Bị xoắn vòng"], ans: 1 },
            { q: "Động năng của một vật phụ thuộc vào:", opts: ["Vận tốc và khối lượng", "Vị trí và khối lượng", "Lực tác dụng", "Gia tốc"], ans: 0 },
            { q: "Công thức tính thế năng trọng trường là:", opts: ["Wt = 1/2mv²", "Wt = mgh", "Wt = mg/h", "Wt = F.s"], ans: 1 },
            { q: "Cơ năng bảo toàn khi vật chỉ chịu tác dụng của:", opts: ["Lực ma sát", "Lực cản không khí", "Trọng lực và lực đàn hồi", "Bất kỳ lực nào"], ans: 2 },
            { q: "Công của lực tác dụng được tính bằng:", opts: ["A = F.s.cos(α)", "A = F.s.sin(α)", "A = F/s", "A = m.a"], ans: 0 },
            { q: "Trong máy ép thủy lực, lực nâng F₂ tỉ lệ thuận với:", opts: ["Vận tốc piston", "Tiết diện S₂", "Khối lượng chất lỏng", "Chiều cao cột chất lỏng"], ans: 1 },
            { q: "Nếu khối lượng vật tăng gấp đôi, vận tốc không đổi thì động năng:", opts: ["Tăng gấp đôi", "Tăng gấp 4", "Không đổi", "Giảm một nửa"], ans: 0 },
            { q: "Một lò xo có độ cứng k=100 N/m, giãn 5cm. Lực đàn hồi là:", opts: ["500 N", "50 N", "5 N", "0.5 N"], ans: 2 }
        ],
        part2: [
            {
                q: "Nhận định sau về lực ma sát và công cơ học:",
                opts: [
                    { text: "a) Lực ma sát luôn sinh công cản.", ans: "D" },
                    { text: "b) Lực ma sát có thể sinh công phát động trong một số trường hợp đặc biệt.", ans: "D" },
                    { text: "c) Công của trọng lực phụ thuộc vào hình dạng quỹ đạo chuyển động.", ans: "S" },
                    { text: "d) Khi vật trượt xuống mặt phẳng nghiêng, trọng lực luôn sinh công dương.", ans: "D" }
                ]
            },
            {
                q: "Nhận định sau về áp suất chất lỏng:",
                opts: [
                    { text: "a) Áp suất chất lỏng tại một điểm phụ thuộc vào hình dạng bình chứa.", ans: "S" },
                    { text: "b) Áp suất chất lỏng luôn tác dụng vuông góc lên mặt tiếp xúc.", ans: "D" },
                    { text: "c) Ở cùng một độ sâu trong lòng chất lỏng, áp suất tại mọi hướng đều bằng nhau.", ans: "D" },
                    { text: "d) Lực đẩy Archimedes không phụ thuộc vào khối lượng riêng của vật.", ans: "D" }
                ]
            }
        ],
        part3: [
            { q: "Một vật có m=2kg, chuyển động với v=5m/s. Tính động năng (J).", ans: 25 },
            { q: "Lò xo có k=200N/m, chịu lực kéo 10N. Độ giãn (cm) là bao nhiêu?", ans: 5 },
            { q: "Thợ lặn ở sâu 10m trong nước (ρ=1000, g=10). Áp suất do nước gây ra (Pa) là?", ans: 100000 },
            { q: "Máy ép thủy lực có S₂ = 100 S₁. F₁ = 50N thì F₂ (N) bằng bao nhiêu?", ans: 5000 }
        ],
        part4: [
            {
                q: "Câu 1 (1.0đ): Trình bày ngắn gọn nguyên lý Pascal. Máy ép thủy lực hoạt động như thế nào?",
                sol: "- Nguyên lý Pascal: Áp suất tác dụng lên một chất lỏng chứa trong bình kín được truyền đi nguyên vẹn theo mọi hướng.\n- Ứng dụng trong máy ép thủy lực: Truyền áp suất p = F₁/S₁ = F₂/S₂ giúp khuếch đại lực."
            },
            {
                q: "Câu 2 (1.0đ): Một con lắc đơn dài 1m được kéo lệch góc 60 độ rồi thả nhẹ. Dùng định luật bảo toàn cơ năng chứng minh vận tốc ở VTCB là √(gl).",
                sol: "- Chọn mốc thế năng ở VTCB.\n- Cơ năng đầu: W = Wt = mgl(1-cos60) = 0.5mgl.\n- Cơ năng ở VTCB: W = Wđ = 0.5mv².\n- Bảo toàn: 0.5mv² = 0.5mgl => v = √(gl)."
            },
            {
                q: "Câu 3 (1.0đ): Giải thích vì sao khi bơm xe đạp, nếu ta lấy tay bịt vòi bơm và nén piston xuống thì càng nén càng thấy nặng?",
                sol: "- Khi bịt kín và nén, thể tích khối khí giảm (V giảm).\n- Quá trình có thể coi gần đúng là đẳng nhiệt, p tỉ lệ nghịch với V.\n- Thể tích giảm làm áp suất tăng cao, nên áp lực tác dụng ngược lại piston rất lớn, tay ta cảm thấy nặng."
            }
        ]
    },
    de_2024: {
        title: "Đề Kiểm Tra Học Kỳ 2024",
        part1: [
            { q: "Khối lượng riêng của nước xấp xỉ bằng bao nhiêu?", opts: ["100 kg/m³", "1000 kg/m³", "10000 kg/m³", "1 kg/m³"], ans: 1 },
            { q: "Biến dạng cắt xảy ra khi:", opts: ["Hai lực ngược chiều tác dụng vào 2 đầu", "Vật bị xoắn", "Hai lực trượt trên bề mặt vật ngược chiều nhau", "Vật bị ép"], ans: 2 },
            { q: "Gia tốc rơi tự do trên Trái Đất thường được lấy xấp xỉ:", opts: ["9.8 m/s²", "10.5 m/s²", "8.9 m/s²", "12 m/s²"], ans: 0 },
            { q: "Lực đẩy Archimedes phụ thuộc vào:", opts: ["Khối lượng của vật", "Thể tích phần chất lỏng bị chiếm chỗ", "Độ sâu của vật", "Hình dạng của vật"], ans: 1 },
            { q: "Một vật chịu tác dụng của 2 lực cân bằng thì:", opts: ["Sẽ đứng yên", "Sẽ chuyển động thẳng đều", "Đứng yên hoặc chuyển động thẳng đều", "Sẽ thay đổi vận tốc"], ans: 2 },
            { q: "Công của lực cản luôn:", opts: ["Dương", "Âm", "Bằng không", "Tỉ lệ với vận tốc"], ans: 1 },
            { q: "Động lượng của một vật được tính bằng công thức:", opts: ["p = m.v", "p = m.a", "p = m.v²", "p = F.t"], ans: 0 },
            { q: "Định luật III Newton nói về:", opts: ["Quán tính", "Lực và gia tốc", "Tác dụng và phản tác dụng", "Lực hấp dẫn"], ans: 2 },
            { q: "Thế năng đàn hồi của lò xo (k) giãn (Δl) là:", opts: ["Wt = k.Δl", "Wt = 1/2.k.(Δl)²", "Wt = 1/2.k.Δl", "Wt = m.g.Δl"], ans: 1 },
            { q: "Hiệu suất của một máy tính bằng:", opts: ["A_có_ích / A_toàn_phần", "A_toàn_phần / A_có_ích", "Công suất toàn phần", "Công vô ích"], ans: 0 },
            { q: "Áp suất khí quyển ở điều kiện tiêu chuẩn là:", opts: ["10^5 Pa", "1.013 x 10^5 Pa", "10^6 Pa", "100 Pa"], ans: 1 },
            { q: "Lực căng bề mặt chất lỏng phụ thuộc vào:", opts: ["Bản chất chất lỏng", "Nhiệt độ", "Cả bản chất và nhiệt độ", "Không phụ thuộc nhiệt độ"], ans: 2 }
        ],
        part2: [
            {
                q: "Nhận định sau về chất lưu tĩnh:",
                opts: [
                    { text: "a) Áp suất tĩnh trong lòng chất lỏng giảm khi độ sâu tăng.", ans: "S" },
                    { text: "b) Lực đẩy Acsimet hướng thẳng đứng lên trên.", ans: "D" },
                    { text: "c) Thể tích phần chìm càng lớn thì lực đẩy càng nhỏ.", ans: "S" },
                    { text: "d) Áp suất do khí quyển tác dụng không đáng kể trong tính toán tàu ngầm.", ans: "S" }
                ]
            },
            {
                q: "Nhận định về năng lượng cơ học:",
                opts: [
                    { text: "a) Cơ năng là tổng của động năng và thế năng.", ans: "D" },
                    { text: "b) Động năng không bao giờ âm.", ans: "D" },
                    { text: "c) Thế năng có thể có giá trị âm tùy thuộc vào mốc.", ans: "D" },
                    { text: "d) Khi có ma sát, cơ năng luôn được bảo toàn.", ans: "S" }
                ]
            }
        ],
        part3: [
            { q: "Một quả bóng khối lượng 0.5kg rơi từ độ cao 20m. Vận tốc lúc chạm đất (m/s) là? (Bỏ qua sức cản, g=10)", ans: 20 },
            { q: "Áp suất của cột nước cao 5m là bao nhiêu (Pa)? (ρ=1000, g=10)", ans: 50000 },
            { q: "Lực kéo 50N tác dụng làm vật dịch chuyển 4m theo hướng của lực. Công sinh ra (J) là?", ans: 200 },
            { q: "Tính động lượng (kg.m/s) của ô tô 1000kg đang chạy với v=15m/s.", ans: 15000 }
        ],
        part4: [
            {
                q: "Câu 1 (1.0đ): Trình bày định luật bảo toàn cơ năng và nêu ví dụ minh họa.",
                sol: "- Phát biểu: Cơ năng của một vật chuyển động chỉ dưới tác dụng của trọng lực hoặc lực đàn hồi luôn được bảo toàn.\n- Ví dụ: Quả bóng rơi tự do (thế năng chuyển dần thành động năng, tổng không đổi)."
            },
            {
                q: "Câu 2 (1.0đ): Một ống hình chữ U chứa nước. Đổ thêm dầu vào một nhánh cao 10cm. Tính độ chênh lệch mực nước ở hai nhánh. Biết ρ_nước = 1000, ρ_dầu = 800.",
                sol: "- Cân bằng áp suất ở đáy cột dầu: ρ_dầu.g.h_dầu = ρ_nước.g.h_nước\n- => h_nước = (ρ_dầu / ρ_nước) * h_dầu = (800 / 1000) * 10 = 8 cm.\n- Độ chênh lệch: 10 - 8 = 2cm."
            },
            {
                q: "Câu 3 (1.0đ): Ứng dụng thực tế của định luật Bernoulli trong thiết kế cánh máy bay?",
                sol: "- Cánh máy bay có mặt trên cong, mặt dưới phẳng.\n- Vận tốc không khí ở mặt trên lớn hơn mặt dưới.\n- Áp suất mặt trên nhỏ hơn mặt dưới, tạo ra lực nâng khí động lực học."
            }
        ]
    },
    de_2026: { title: "Đề Thi Đánh Giá Năng Lực 2026", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_hsg: { title: "Đề Thi Học Sinh Giỏi Cấp Tỉnh", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_olympic: { title: "Đề Olympic Vật Lý 30/4", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_cuoi_ky: { title: "Đề Thi Cuối Kỳ I - Trọng Điểm", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_khao_sat: { title: "Đề Khảo Sát Chất Lượng Đầu Năm", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_chuyen_ly: { title: "Đề Thi Thử Chuyên Lý KHTN", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_on_tap_1: { title: "Đề Ôn Tập Chương IV - Mức 1", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_on_tap_2: { title: "Đề Ôn Tập Chương IV - Mức 2", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_on_tap_3: { title: "Đề Ôn Tập Chương IV - Mức 3", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 },
    de_mo_phong: { title: "Đề Kiểm Tra Tương Tác 3D", part1: EXAM_DATA_TEMP.p1, part2: EXAM_DATA_TEMP.p2, part3: EXAM_DATA_TEMP.p3, part4: EXAM_DATA_TEMP.p4 }
};
