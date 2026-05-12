const HTML_THEORY = `
    <section id="theory" class="page-section">
        <div class="container">
            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">BÍ MẬT CỦA SỰ ĐÀN HỒI (Bài 33)</h2>
            <div class="grid-4 reveal" style="margin-bottom: 50px;">
                <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><h3>Biến Dạng Kéo</h3><p style="margin-top: 10px; color: var(--text-muted);">Hover để xem</p></div><div class="flip-card-back"><p>Vật dài ra dọc theo trục lực tác dụng.</p><br><p class="mono" style="font-size: 13px; color: var(--accent-1);">Ví dụ: Cầu treo, dây đàn guitar.</p></div></div></div>
                <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><h3>Biến Dạng Nén</h3><p style="margin-top: 10px; color: var(--text-muted);">Hover để xem</p></div><div class="flip-card-back"><p>Vật ngắn lại dọc theo trục lực tác dụng.</p><br><p class="mono" style="font-size: 13px; color: var(--accent-1);">Ví dụ: Trụ cầu, đệm mút.</p></div></div></div>
                <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><h3>Biến Dạng Uốn</h3><p style="margin-top: 10px; color: var(--text-muted);">Hover để xem</p></div><div class="flip-card-back"><p>Trục của vật bị cong đi.</p><br><p class="mono" style="font-size: 13px; color: var(--accent-1);">Ví dụ: Dầm nhà, ván nhảy cầu.</p></div></div></div>
                <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><h3>Biến Dạng Xoắn</h3><p style="margin-top: 10px; color: var(--text-muted);">Hover để xem</p></div><div class="flip-card-back"><p>Các tiết diện ngang quay tương đối.</p><br><p class="mono" style="font-size: 13px; color: var(--accent-1);">Ví dụ: Trục xe, vặn tuốc-nơ-vít.</p></div></div></div>
            </div>

            <div class="grid-2 reveal">
                <div class="glass-card">
                    <h3>Giới Hạn Đàn Hồi</h3>
                    <p style="margin-top: 15px; line-height: 1.6; color: var(--text-muted);">Giới hạn mà nếu vượt qua, vật không khôi phục lại hình dạng ban đầu (biến dạng dẻo).</p>
                    <div style="margin-top: 20px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px;"><span>Bắt đầu kéo</span><span style="color: var(--warning);">Giới hạn đàn hồi</span><span style="color: var(--danger);">Đứt</span></div>
                        <div style="height: 10px; background: linear-gradient(90deg, var(--accent-1) 50%, var(--warning) 80%, var(--danger) 100%); border-radius: 5px;"></div>
                    </div>
                </div>
                <div class="glass-card">
                    <h3>Định Luật Hooke</h3>
                    <div class="formula-box">F<sub style="font-size:0.7em">đh</sub> = k · |Δl|</div>
                    <ul style="margin-top: 15px; padding-left: 20px; color: var(--text-muted); line-height: 1.8;">
                        <li><strong>F<sub style="font-size:0.7em">đh</sub></strong>: Lực đàn hồi (N)</li>
                        <li><strong>k</strong>: Độ cứng (N/m)</li>
                        <li><strong>Δl = l - l₀</strong>: Độ biến dạng (m)</li>
                    </ul>
                </div>
            </div>

            <div class="section-divider" style="margin: 80px 0;"></div>

            <h2 class="gradient-text reveal" style="text-align: center; font-size: 2.5rem; margin-bottom: 50px;">ÁP SUẤT CHẤT LỎNG (Bài 34)</h2>
            <div class="grid-3 reveal">
                <div class="glass-card"><h3>Áp Lực & Áp Suất</h3><div class="formula-box">p = F / S</div><p style="color: var(--text-muted); font-size: 14px;">Áp suất là độ lớn áp lực trên 1 đơn vị diện tích (Pa).</p></div>
                <div class="glass-card"><h3>Khối Lượng Riêng</h3><div class="formula-box">ρ = m / V</div><p style="color: var(--text-muted); font-size: 14px;">Nước: 1000 kg/m³, Dầu: 800 kg/m³, Thủy ngân: 13600 kg/m³.</p></div>
                <div class="glass-card"><h3>Áp Suất Chất Lỏng</h3><div class="formula-box">p = p₀ + ρgh</div><p style="color: var(--text-muted); font-size: 14px;">Tăng theo độ sâu <strong>h</strong>, bằng nhau trên cùng mặt phẳng ngang.</p></div>
            </div>
        </div>
    </section>
`;
