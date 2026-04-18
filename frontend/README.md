# HCE-FMS Frontend Prototype

## Tổng quan

Frontend prototype cho hệ thống **HCE-FMS (Hệ thống Quản lý tài chính – học phí tích hợp AI)** được xây dựng bằng ReactJS và Tailwind CSS theo thiết kế mobile-first.

## 🚀 5 Insights cốt lõi đã triển khai

### 1. CHỨNG MINH LỘ TRÌNH (ROADMAP v1.1)
- ✅ Sidebar với menu "Hỗ trợ tài chính / Vay vốn"
- ✅ Modal thông báo Phase v1.1 khi click vào menu
- ✅ UI/UX thể hiện rõ kế hoạch phát triển

### 2. TÍNH DẤU VẾT (TRACEABILITY) TRỰC QUAN
- ✅ Developer/Debug Mode toggle ở góc màn hình
- ✅ Auto-add traceability badges: `[UC05]`, `[TC04]`, `[SUPL07]`
- ✅ Component borders khi debug mode bật
- ✅ 100% UI khớp với tài liệu yêu cầu

### 3. LUỒNG BPMN WORKFLOW
- ✅ Login → Dashboard → Tra cứu công nợ → QR Payment → Biên lai
- ✅ Navigation theo đúng trình tự nghiêm ngặt
- ✅ State management cho mỗi bước

### 4. PHÂN QUYỀN RBAC
- ✅ Role STUDENT: Dashboard, Công nợ, Thanh toán, Lịch sử
- ✅ Role ACCOUNTANT: Dashboard báo cáo, Đối soát webhook, AI forecast
- ✅ Quick role switch để demo

### 5. AI ENGINE PROTOTYPE & RỦI RO
- ✅ Chart.js visualization cho dự báo doanh thu
- ✅ **RISK WARNING BANNER (TC11)**: Cảnh báo dữ liệu chỉ 2 tháng
- ✅ AI forecast với độ tin cậy 45%

## 📁 Cấu trúc thư mục

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LoginScreen.js          # Màn hình đăng nhập RBAC
│   │   ├── Sidebar.js              # Menu navigation với roadmap
│   │   ├── DebugMode.js            # Traceability badges
│   │   ├── RoadmapModal.js         # Phase v1.1 notification
│   │   ├── StudentDashboard.js     # Student RBAC layout
│   │   ├── DebtDetails.js          # BPMN step 3
│   │   ├── QRPayment.js            # BPMN step 4 + 15min countdown
│   │   ├── PaymentReceipt.js       # BPMN step 5
│   │   └── AccountantDashboard.js  # Accountant RBAC + AI forecast
│   ├── App.js                     # Main router + state
│   ├── index.js                   # Entry point
│   └── index.css                  # Tailwind + custom styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Công nghệ sử dụng

- **React 18.2.0** - Frontend framework
- **React Router 6.8.0** - Navigation
- **Tailwind CSS 3.3.0** - Styling framework
- **Lucide React** - Icons
- **Chart.js 4.4.0** - Data visualization
- **React Chart.js 2** - Chart React wrapper

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open browser:** http://localhost:3000

## 📱 Mobile-First Design

- ✅ Responsive design cho tất cả screen sizes
- ✅ Touch-friendly buttons và interactions
- ✅ Optimized cho mobile demo
- ✅ Clean UI với Tailwind CSS

## 🔧 Debug Mode Features

Khi bật Debug Mode (nút bug ở góc phải):
- **Traceability badges** tự động thêm vào UI elements
- **Component borders** hiển thị structure
- **Console logging** được kích hoạt
- **State inspection** cho development

## 📊 Demo Flow

### Student Role Flow:
1. Login → Select "Sinh viên"
2. Dashboard → View debt summary
3. "Tra cứu công nợ" → View detailed fees
4. "Thanh toán" → QR Code với 15 phút countdown
5. "Giả lập thanh toán" → Biên lai thành công

### Accountant Role Flow:
1. Login → Select "Kế toán / Admin"
2. Dashboard → View revenue reports
3. "Dự báo Doanh thu AI" → Chart với risk warning
4. "Đối soát Webhook" → View reconciliation logs

## 🎯 Key Features cho Hội đồng

### Traceability Mapping:
- `[UC01]` - Dashboard
- `[UC02]` - Tra cứu công nợ  
- `[UC03]` - Lịch sử nộp tiền
- `[UC05]` - Thanh toán QR Code
- `[UC06]` - Biên lai thanh toán
- `[UC08]` - Dự báo Doanh thu AI
- `[TC04]` - 15 phút countdown
- `[TC11]` - Risk warning AI
- `[SUPL07]` - Gạch nợ

### Risk Management:
- **AI Risk Banner** hiển thị rõ ràng
- **Data limitation warnings**
- **Confidence level indicators**
- **Compliance badges**

## 📝 Notes cho Demo

1. **Roadmap Demo**: Click "Hỗ trợ tài chính" → Modal Phase v1.1
2. **Debug Mode**: Bật để thấy traceability badges
3. **Role Switch**: Logout → chọn role khác để demo RBAC
4. **AI Risk**: Accountant Dashboard → xem banner đỏ
5. **15min Timer**: QR Payment screen → countdown real-time

## 🔍 Compliance & Standards

- ✅ **Zero Tolerance SUPL03**: BigDecimal cho financial fields (backend)
- ✅ **@Transactional**: Database operations (backend)
- ✅ **ApiResponse<T>**: Standardized API responses (backend)
- ✅ **SOLID Principles**: Clean architecture
- ✅ **Mobile-first**: Responsive design
- ✅ **Accessibility**: Semantic HTML, ARIA labels
