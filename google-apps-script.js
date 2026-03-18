// ====================================================
// Google Apps Script — CoachGEN Leaders Form Handler
// Dán toàn bộ code này vào Google Apps Script Editor
// ====================================================

// ID của Google Spreadsheet (sẽ tự động lấy từ sheet đang mở)
function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse dữ liệu JSON từ form
        var data = JSON.parse(e.postData.contents);

        // Ghi timestamp + dữ liệu vào dòng mới
        sheet.appendRow([
            new Date(),              // Thời gian đăng ký
            data.fullname || '',     // Họ và tên
            data.email || '',        // Email
            data.phone || '',        // Số điện thoại
            data.role || '',         // Vai trò
            data.message || ''       // Nhu cầu
        ]);

        // Gửi email thông báo
        var emailBody =
            '🎯 CoachGEN Leaders - Đăng ký mới!\n\n' +
            '👤 Họ tên: ' + (data.fullname || 'N/A') + '\n' +
            '📧 Email: ' + (data.email || 'N/A') + '\n' +
            '📱 SĐT: ' + (data.phone || 'N/A') + '\n' +
            '💼 Vai trò: ' + (data.role || 'N/A') + '\n' +
            '💬 Nhu cầu: ' + (data.message || 'Không có') + '\n\n' +
            '⏰ Thời gian: ' + new Date().toLocaleString('vi-VN');

        MailApp.sendEmail({
            to: 'winsm.pro@gmail.com',
            subject: '📋 [CoachGEN Leaders] Đăng ký mới từ ' + (data.fullname || 'Khách'),
            body: emailBody
        });

        // Trả về response thành công
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'success', message: 'Đã nhận thông tin!' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Hàm tạo header cho sheet (chạy 1 lần)
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(1, 1, 1, 6).setValues([
        ['Thời gian', 'Họ và tên', 'Email', 'Số điện thoại', 'Vai trò', 'Nhu cầu']
    ]);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    sheet.setFrozenRows(1);
}
