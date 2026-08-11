# Hướng dẫn chỉnh sửa và xuất bản portfolio

## Chạy website trên máy

1. Cài Node.js bản LTS tại https://nodejs.org.
2. Mở Terminal trong thư mục dự án.
3. Chạy `npm install`.
4. Chạy `npm run dev`.
5. Mở địa chỉ được Terminal hiển thị, thường là `http://localhost:3000`.

## Chỉnh sửa nội dung

- Nội dung, số liệu, nhiệm vụ và chứng chỉ: `content/portfolio.ts`.
- Cấu trúc website: `app/page.tsx`.
- Màu sắc, bố cục và hiệu ứng: `app/globals.css`.
- Ảnh dự án: `public/images`.
- CV tải xuống: `public/cv/pham-thi-thuy-marketing-cv.pdf`.

Giữ nguyên tên file ảnh khi thay ảnh để không cần sửa code. Nếu đổi tên file, cập nhật đường dẫn tương ứng trong `content/portfolio.ts`.

## Đưa lên Vercel miễn phí

1. Tạo tài khoản GitHub và tạo một repository mới.
2. Tải toàn bộ mã nguồn trong thư mục này lên repository.
3. Đăng nhập Vercel bằng GitHub.
4. Chọn **Add New → Project** và chọn repository vừa tạo.
5. Vercel sẽ nhận diện Next.js. Giữ thiết lập mặc định và chọn **Deploy**.
6. Sau khi hoàn tất, website có địa chỉ dạng `ten-ban-chon.vercel.app`.

## Cập nhật website

Sửa file trên máy hoặc GitHub rồi đẩy thay đổi lên repository. Vercel sẽ tự động build và cập nhật website.

## Về tên miền

Địa chỉ `*.vercel.app` là tên miền phụ miễn phí và có thể chọn tên nếu chưa có người sử dụng. Một tên miền thực sự như `thuyphammarketing.com` hoặc `thuyphamportfolio.com` phải được đăng ký riêng. Sau khi sở hữu, vào **Vercel → Project → Settings → Domains** để kết nối.
