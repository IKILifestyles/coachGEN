# Hướng dẫn kết nối Form → Google Sheets + Email

## Tổng quan
Khi người dùng điền form đăng ký trên website, dữ liệu sẽ:
1. ✅ Tự động lưu vào **Google Sheets** 
2. ✅ Gửi email thông báo đến **winsm.pro@gmail.com**

---

## Các bước thiết lập (khoảng 5 phút)

### Bước 1: Tạo Google Spreadsheet
1. Vào [Google Sheets](https://sheets.google.com)
2. Tạo bảng tính mới, đặt tên: **"CoachGEN Leaders - Đăng ký"**

### Bước 2: Mở Apps Script Editor
1. Trong Google Sheets, vào menu **Tiện ích mở rộng** → **Apps Script**
2. Xóa toàn bộ code mặc định trong editor

### Bước 3: Dán code
1. Mở file `google-apps-script.js` trong thư mục dự án
2. **Copy toàn bộ nội dung** và dán vào Apps Script Editor
3. Bấm **Lưu** (Ctrl+S), đặt tên project: "CoachGEN Form Handler"

### Bước 4: Tạo header cho Sheet
1. Trong Apps Script Editor, chọn hàm **`setupSheet`** từ dropdown ở thanh công cụ
2. Bấm nút **▶ Chạy**
3. Lần đầu sẽ yêu cầu cấp quyền → Bấm **"Xem lại quyền"** → Chọn tài khoản Google → **"Cho phép"**
4. Kiểm tra lại Google Sheet — dòng đầu tiên sẽ có header: `Thời gian | Họ và tên | Email | SĐT | Vai trò | Nhu cầu`

### Bước 5: Deploy Web App
1. Bấm nút **Triển khai** (Deploy) → **Triển khai mới** (New deployment)
2. Bấm ⚙️ chọn loại: **Ứng dụng web** (Web app)
3. Cấu hình:
   - **Mô tả**: CoachGEN Form Handler
   - **Thực thi dưới vai**: **Tôi** (Me)
   - **Ai có quyền truy cập**: **Bất kỳ ai** (Anyone)
4. Bấm **Triển khai** (Deploy)
5. **Copy URL Web App** được hiển thị (dạng: `https://script.google.com/macros/s/AKfycb.../exec`)

### Bước 6: Dán URL vào website
1. Mở file `js/main.js`
2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Thay `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` bằng URL bạn vừa copy ở bước 5
4. Lưu file

---

## ✅ Kiểm tra
1. Mở website và điền form đăng ký thử
2. Kiểm tra Google Sheets → dữ liệu xuất hiện ở dòng mới
3. Kiểm tra email **winsm.pro@gmail.com** → nhận được email thông báo

---

## ⚠️ Lưu ý quan trọng
- Google Apps Script gửi email miễn phí (giới hạn ~100 email/ngày với tài khoản cá nhân)
- Nếu cần thay email nhận thông báo, sửa trong file `google-apps-script.js` dòng `to: 'winsm.pro@gmail.com'`
- Mỗi lần sửa code Apps Script, bạn cần **Deploy lại** (New deployment) và cập nhật URL mới vào `main.js`
