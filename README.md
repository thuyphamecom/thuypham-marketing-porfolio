# Marketing Portfolio – Phạm Thị Thùy

Website được xây bằng Next.js, React và TypeScript. Nội dung được tách riêng để dễ cập nhật mà không cần chỉnh lại giao diện.

## Chạy website trên máy

```bash
npm install
npm run dev
```

## Sửa nội dung

Mở file `content/portfolio.ts` và chỉnh các phần tương ứng:

- `profile`: thông tin cá nhân, email, LinkedIn và CV.
- `traits`: đặc điểm cá nhân.
- `skills`, `tools`: năng lực và công cụ.
- `moonspark`, `natura`, `unilever`: nội dung từng dự án.
- `certificates`: tên và đường dẫn chứng chỉ.

## Thay hình ảnh

Hình ảnh được lưu trong `public/images` theo từng dự án. Cách đơn giản nhất là thay ảnh mới bằng đúng tên file cũ. Nếu đổi tên file, cập nhật lại `src` trong `content/portfolio.ts`.

## Thay CV

Thay file `public/cv/pham-thi-thuy-marketing-cv.pdf`. Nếu dùng tên khác, sửa trường `profile.cv` trong `content/portfolio.ts`.

## Xuất bản

1. Đưa toàn bộ mã nguồn lên GitHub.
2. Đăng nhập Vercel bằng GitHub.
3. Chọn **Add New → Project** và import repository.
4. Chọn **Deploy**.
5. Mỗi lần cập nhật và push lên nhánh `main`, Vercel sẽ tự động cập nhật website trên link cũ.

## Kiểm tra trước khi gửi nhà tuyển dụng

- Mở website bằng cửa sổ ẩn danh.
- Kiểm tra trên điện thoại và máy tính.
- Kiểm tra nút tải CV, LinkedIn, email và chứng chỉ.
- Bảo đảm không có MSSV hoặc thông tin cá nhân của thành viên khác trong ảnh.
