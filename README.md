# Ví Giấy Tờ Landing Page

Landing page được xây bằng React + TypeScript + Vite.

## Chạy local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Deploy GitHub Pages

Dự án đã được cấu hình để deploy tự động lên GitHub Pages bằng GitHub Actions:

- Workflow: `.github/workflows/deploy-pages.yml`
- `vite.config.ts` dùng `base: '/vigiayto-landing-page/'`
- `BrowserRouter` dùng `basename={import.meta.env.BASE_URL}`
- Build sẽ tạo thêm `dist/404.html` để các route SPA hoạt động trên Pages.

Sau khi push lên nhánh `main`:

1. Vào repo GitHub -> `Settings` -> `Pages`.
2. Tại `Build and deployment`, chọn `Source: GitHub Actions`.
3. Chờ workflow `Deploy Vite Site to GitHub Pages` chạy xong.

URL dự kiến:

- `https://ocampoje17.github.io/vigiayto-landing-page/`