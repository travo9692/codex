# 🩺 Zalo Mini App - Đặt lịch khám bệnh (Demo)

Demo ứng dụng đặt lịch khám bệnh và chăm sóc khách hàng qua Zalo Mini App.

## 📦 Tech stack
 - ⚙️ Backend: ExpressJS + MongoDB (Mongoose)
- 💻 Frontend: React + Vite (Zalo Mini App SDK)
- 🔔 Scheduler + ZNS API: Nhắc lịch tự động qua Zalo

---

## 📁 Thư mục

```
.
├── backend/                # ExpressJS API
│   ├── src/
│   │   ├── controllers/    # API logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── scheduler/      # Cron jobs nhắc lịch
│   │   ├── data/           # JSON storage (demo)
│   │   ├── utils/          # File helpers
│   │   └── app.js          # Server setup
│   ├── .env.example        # Mẫu biến môi trường
│   └── package.json
├── frontend/               # React Mini App (Zalo SDK)
│   ├── src/
│   └── vite.config.js
├── docker-compose.yml     # Local dev DB
```

---

## 🚀 Hướng dẫn chạy local

### 1. Clone repo
```bash
git clone https://github.com/your-org/zalo-miniapp-healthcare.git
cd zalo-miniapp-healthcare
```

### 2. Chạy backend
```bash
cd backend
cp .env.example .env
npm install
npm start
```

### 3. Cài đặt frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Kết nối với Zalo Mini App
- Vào [Zalo Developer Console](https://developers.zalo.me/miniapp)
- Tạo app mới, nhập URL frontend (https://localhost:5173 hoặc Vercel link)

---

## 🔌 API chính

### `POST /patients`
Tạo bệnh nhân mới
```json
{
  "zalo_id": "abc123",
  "name": "Nguyễn Văn A",
  "phone": "0987654321",
  "dob": "1990-01-01"
}
```

### `GET /patients/:zalo_id`
Lấy hồ sơ bệnh nhân

### `POST /appointments`
Đặt lịch khám
```json
{
  "zalo_id": "abc123",
  "doctor_name": "BS. Trần Thị B",
  "service": "Khám tổng quát",
  "appointment_time": "2025-08-01T10:00:00",
  "note": "Đau đầu 2 ngày"
}
```

### `GET /appointments/:zalo_id`
Danh sách lịch của bệnh nhân

---

## 🔔 Nhắc lịch tự động qua Zalo

Hệ thống tự động kiểm tra các lịch khám sắp đến và gửi tin nhắn nhắc nhở tới:
- 📩 Bệnh nhân: trước 1 giờ khám
- 👨‍⚕️ Bác sĩ: tổng hợp lịch hôm đó

Sử dụng Zalo ZNS API hoặc OA Chat API:
- Tự động chạy bằng `node-cron`
- Đăng ký mẫu tin ZNS tại https://zalo.cloud/

---

## 🛡️ Ghi chú
- Sử dụng Mongoose cho MongoDB
- Có thể triển khai backend lên VPS hoặc Railway
- Frontend tương thích Zalo SDK v2
- Scheduler độc lập, có thể mở rộng gửi thông báo theo ngày/tuần

## 🚀 Kế hoạch triển khai

1. **Chuẩn bị môi trường**: Thuê VPS hoặc dùng nền tảng cloud (Railway, Render ...)
   và cài đặt Node.js cùng MongoDB hoặc Docker.
2. **Clone mã nguồn** và tạo file `.env` giống `.env.example` cho backend.
3. **Cài đặt phụ thuộc** cho cả hai thư mục `backend/` và `frontend/` rồi build project.
4. **Chạy backend** bằng `node` hoặc `pm2`, đảm bảo cổng API được mở.
5. **Triển khai frontend** lên dịch vụ tĩnh (Vercel, Netlify) hoặc trực tiếp trên VPS.
6. **Thiết lập scheduler** để gửi thông báo tự động, có thể dùng `pm2` hoặc `cron`.
7. **Cấu hình webhook** trong Zalo Developer Console trỏ về API để nhận sự kiện.

---

## 📬 Liên hệ
HLHTR - Zalo Mini App Dev
