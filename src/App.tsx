import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'

const baseUrl = import.meta.env.BASE_URL
const appLogoUrl = `${baseUrl}app-logo.png`

const privacyPoints = [
  'Bạn luôn biết thông tin nào đang được lưu trong app.',
  'Dữ liệu của bạn lưu 100% offline trên máy bạn, không được gửi đi bất kỳ đâu, không lo lộ lọt thông tin cá nhân, giấy tờ.',
  'Bạn có thể tự xoá toàn bộ dữ liệu của app bất kỳ lúc nào một cách dễ dàng nhất.',
]

const benefitCards = [
  {
    icon: 'add_a_photo',
    title: 'Thêm giấy tờ theo cách bạn quen',
    desc: 'Chụp ảnh, scan thông minh, chọn từ thư viện hoặc đính kèm PDF đều được.',
    tone: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    icon: 'manage_search',
    title: 'Tìm lại cực nhanh',
    desc: 'Tìm theo tên, phân loại, ghi chú và cả chữ trong ảnh/PDF sau khi app nhận diện.',
    tone: 'bg-violet-500/20 text-violet-300',
  },
  {
    icon: 'shield_lock',
    title: 'Riêng tư và an toàn',
    desc: 'Khóa app bằng mật khẩu, vân tay/Face ID, chống chụp màn hình và lưu dữ liệu offline.',
    tone: 'bg-emerald-500/20 text-emerald-300',
  },
]

const mainFeatureCards = [
  {
    icon: 'folder',
    title: 'Quản lý giấy tờ của bạn',
    desc: 'Lưu và sắp xếp giấy tờ cá nhân gọn gàng, mở lại nhanh khi cần.',
  },
  {
    icon: 'manage_search',
    title: 'Tìm kiếm nhanh giấy tờ',
    desc: 'Tìm theo tên, phân loại, ghi chú và cả nội dung OCR chỉ trong vài giây.',
  },
  {
    icon: 'share',
    title: 'Nhanh chóng chia sẻ giấy tờ',
    desc: 'Gửi giấy tờ cho người thân hoặc đối tác nhanh chóng ngay từ trong app.',
  },
]

const supportFeatureCards = [
  {
    icon: 'picture_as_pdf',
    title: 'Tạo PDF từ giấy tờ hoặc ảnh bất kỳ',
    desc: 'Gộp ảnh thành file PDF gọn gàng, tiện gửi đi hoặc lưu hồ sơ.',
  },
  {
    icon: 'text_snippet',
    title: 'OCR ảnh/PDF sang văn bản',
    desc: 'Nhận diện chữ từ ảnh và PDF, hỗ trợ tốt cho tiếng Việt để dễ tìm và sao chép.',
  },
  {
    icon: 'fingerprint',
    title: 'Mật khẩu và sinh trắc học',
    desc: 'Bạn có thể đặt mật khẩu truy cập app và mở khoá bằng vân tay/Face ID.',
  },
  {
    icon: 'folder_zip',
    title: 'Sao lưu và khôi phục bằng file',
    desc: 'Khi cài lại app, bạn cần tạo file backup và khôi phục lại từ file sao lưu đó.',
  },
]

const mockupPages = [
  {
    title: 'Trang chủ',
    desc: 'Quản lý toàn bộ giấy tờ trong một nơi, xem nhanh mục đã ghim, giấy tờ sắp hết hạn và mở lại ngay khi cần dùng.',
    image: `${baseUrl}mockups/home-overview.svg`,
  },
  {
    title: 'Tìm kiếm',
    desc: 'Tìm theo tên giấy tờ, nhãn, ghi chú và nội dung OCR. Hỗ trợ tìm không dấu để người dùng phổ thông tra cứu dễ hơn.',
    image: `${baseUrl}mockups/search-ocr.svg`,
  },
  {
    title: 'Ảnh',
    desc: 'Xem toàn bộ ảnh giấy tờ theo dạng thư viện, mở nhanh từng ảnh để đối chiếu thông tin hoặc chuyển sang PDF khi cần.',
    image: `${baseUrl}mockups/tab-images.svg`,
  },
  {
    title: 'Tạo PDF',
    desc: 'Chọn ảnh bất kỳ để tạo file PDF gọn gàng, có cấu hình cơ bản trước khi xuất và chia sẻ ngay trong vài thao tác.',
    image: `${baseUrl}mockups/tab-pdf.svg`,
  },
  {
    title: 'Chữ',
    desc: 'OCR chuyển ảnh và PDF sang văn bản để sao chép hoặc tìm kiếm lại. Tối ưu tốt cho tiếng Việt và giấy tờ thông dụng.',
    image: `${baseUrl}mockups/tab-ocr.svg`,
  },
  {
    title: 'Cài đặt',
    desc: 'Quản lý bảo mật, thông báo, sao lưu/khôi phục và các tùy chọn cá nhân để bạn chủ động kiểm soát dữ liệu của mình.',
    image: `${baseUrl}mockups/security-settings.svg`,
  },
]

const contactCards = [
  {
    title: 'Liên hệ qua Gmail',
    value: 'namqhong@gmail.com',
    href: 'mailto:namqhong@gmail.com',
    icon: 'mail',
  },
  {
    title: 'Nhắn qua Telegram',
    value: '@namhnz',
    href: 'https://t.me/namhnz',
    icon: 'send',
  },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function AppLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = window.localStorage.getItem('vigiayto-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    window.localStorage.setItem('vigiayto-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen relative isolate overflow-x-hidden text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <div aria-hidden className="page-mesh-bg fixed inset-0 -z-20" />
      <img
        alt="Dong Son Drum Watermark"
        className="dong-son-watermark"
        src="https://lh3.googleusercontent.com/aida/ADBb0ui2W5Dal8bjOUvcTN6Pnqy3jD6M_jUdrIj848qA38d-bMxhLyz1Y1MiW3vE3hljCvtfsZ4GdVHngyzwosPGpfuSdc59TUrd2TajD9His6X4fV3g2v_8BKUdZzOPZcgjUedq7Sqzd8pnpZBfhOUmN939qTGUH2dJIlTGK0esWspiektAO9kIxXAkYAGjA0Vm4P10icIH19hzDGqI1VWis7d_1jz09yuZhJeCUqsAL64bpNaddBv-d7HgqG1_00ZIxFjs0TyZm-Cv"
      />

      <header className="fixed top-4 left-0 right-0 z-50 px-6">
        <nav className="max-w-7xl mx-auto bg-zinc-950/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-6 h-14 flex items-center justify-between font-sans antialiased tracking-tight">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <img src={appLogoUrl} alt="Logo Ví Giấy Tờ" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold tracking-tighter text-zinc-50">Ví Giấy Tờ</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
                end
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/quyen-rieng-tu"
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                Quyền riêng tư
              </NavLink>
              <NavLink
                to="/dieu-khoan-su-dung"
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                Điều khoản sử dụng
              </NavLink>
              <NavLink
                to="/lien-he"
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                Liên hệ
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1.5 hover:bg-zinc-800/50 rounded-full transition-all active:scale-95 duration-200 flex items-center justify-center"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Đổi giao diện sáng/tối"
            >
              <span className="material-symbols-outlined text-zinc-50 text-xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.vigiayto.placeholder"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-indigo-950 px-5 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-100 transition-all active:scale-95 duration-200 shadow-sm"
            >
              Tải trên Play Store
            </a>
          </div>
        </nav>
      </header>

      {children}

      <footer className="w-full py-12 bg-zinc-950/20 backdrop-blur-xl border-t border-white/5 relative z-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-zinc-50">Ví Giấy Tờ</span>
            <p className="text-xs font-normal leading-relaxed text-zinc-400 max-w-[260px]">
              © 2026 Ví Giấy Tờ. The Digital Archivist. Built for privacy and security.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-zinc-50 uppercase tracking-[0.2em]">Pháp lý</span>
            <nav className="flex items-center gap-4">
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to="/quyen-rieng-tu">
                Quyền riêng tư
              </Link>
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to="/dieu-khoan-su-dung">
                Điều khoản sử dụng
              </Link>
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to="/lien-he">
                Liên hệ
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <span className="text-[11px] font-bold text-zinc-50 uppercase tracking-[0.2em]">Liên hệ</span>
            <div className="flex flex-col gap-3 text-xs text-zinc-400">
              <a className="hover:text-zinc-200 inline-flex items-center gap-2" href="mailto:namqhong@gmail.com">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>namqhong@gmail.com</span>
              </a>
              <a
                className="hover:text-zinc-200 inline-flex items-center gap-2"
                href="https://t.me/namhnz"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>@namhnz</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
      <section className="relative overflow-hidden rounded-[2.5rem] hero-glass p-6 md:p-12 mb-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
              Ví giấy tờ cho mọi người
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-6">
              Lưu giấy tờ gọn gàng, <br />
              tìm lại cực nhanh.
            </h1>
            <p className="text-base md:text-lg text-white/70 font-light max-w-md mb-8 leading-relaxed">
              Từ CCCD, bằng lái đến hồ sơ cá nhân, bạn có thể quản lý ngay trên điện thoại.
              Dễ dùng cho người phổ thông, thao tác rõ ràng, không rối.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.vigiayto.placeholder"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xl">android</span>
                Tải cho Android
              </a>
              <Link
                to="/quyen-rieng-tu"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                Xem cam kết riêng tư
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />
            <div className="relative bg-white/5 backdrop-blur-2xl p-12 rounded-[3rem] rotate-12 shadow-2xl border border-white/10">
              <img src={appLogoUrl} alt="Logo Ví Giấy Tờ" className="w-[120px] h-[120px] rounded-[28px] object-cover" />
            </div>
            <div className="absolute -top-4 -right-2 bg-white/10 backdrop-blur-xl p-4 rounded-2xl -rotate-12 shadow-lg border border-white/20">
              <span className="material-symbols-outlined text-white/80 text-xl">lock</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl p-5 rounded-2xl rotate-6 shadow-lg border border-white/20">
              <span className="material-symbols-outlined text-white/80 text-2xl">wifi_off</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {benefitCards.map((item) => (
          <div
            key={item.title}
            className="group glass-card p-6 rounded-3xl transition-all hover:translate-y-[-4px] cursor-default"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${item.tone} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner border border-white/10`}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Các chức năng quan trọng</h2>
        </div>
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="space-y-4">
            {mainFeatureCards.map((item, idx) => (
              <div key={item.title}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
                {idx < mainFeatureCards.length - 1 ? <div className="h-px bg-white/10 mt-4" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-emerald-300/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 border border-emerald-200/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-200 text-2xl">verified_user</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Bảo mật là ưu tiên trên hết</h2>
          </div>
          <p className="text-emerald-100 font-semibold text-base leading-relaxed">
            App chạy 100% offline, không gửi dữ liệu ra ngoài máy bạn, không dùng bất kỳ dịch vụ nào cần kết nối mạng.
            Bạn có thể yên tâm rằng thông tin giấy tờ cá nhân không bị lộ lọt ra bên ngoài thiết bị.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
              <p className="text-white font-semibold text-sm">100% offline trên thiết bị</p>
              <p className="text-white/70 text-xs mt-2">Dữ liệu chỉ lưu trong máy của bạn, không đồng bộ lên cloud.</p>
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
              <p className="text-white font-semibold text-sm">Không gửi dữ liệu ra ngoài</p>
              <p className="text-white/70 text-xs mt-2">Không có bên thứ ba nào nhận nội dung giấy tờ của bạn.</p>
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
              <p className="text-white font-semibold text-sm">Lưu ý khi cài lại app</p>
              <p className="text-white/70 text-xs mt-2">
                Trước khi cài lại, hãy xuất file backup. Sau đó khôi phục lại từ file sao lưu để giữ dữ liệu.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4 mt-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-white text-xl mt-0.5">fingerprint</span>
            <p className="text-white/90 text-sm leading-relaxed">
              Bạn có thể đặt mật khẩu khi truy cập app và dùng sinh trắc học (vân tay/Face ID) để mở khoá nhanh.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-amber-200/40 shadow-[0_0_32px_rgba(245,158,11,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-200/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-100 text-2xl">favorite</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Tâm thư từ người tạo app</h2>
          </div>
          <p className="text-white/90 text-base leading-relaxed italic">
            "Là một người dùng giống bạn, tôi luôn mong muốn việc quản lý giấy tờ phải thật tiện lợi nhưng vẫn tuyệt
            đối an toàn. Vì vậy, Ví giấy tờ được xây dựng theo hướng lưu trữ và xử lý offline hoàn toàn, không gửi dữ
            liệu cho bất kỳ bên nào ngoài thiết bị của bạn, để bạn có thể dùng app với sự yên tâm trọn vẹn."
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Các chức năng phụ hữu ích</h2>
        </div>
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {supportFeatureCards.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-white text-xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-base">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Các chức năng chính của app</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
          {mockupPages.map((item) => (
            <article className="flex-none w-[360px] snap-center group glass-card rounded-3xl p-4" key={item.title}>
              <img
                src={item.image}
                alt={`Mockup ${item.title}`}
                className="w-full h-[250px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-slate-900/40 p-1"
                loading="lazy"
              />
              <h3 className="text-base font-bold text-white mt-4">{item.title}</h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Offline Trên Thiết Bị</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div>
              <p className="text-3xl font-extrabold text-white">PIN 6 số</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Bảo Vệ File Backup</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div>
              <p className="text-3xl font-extrabold text-white">OCR</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Hỗ Trợ Tốt Tiếng Việt</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function TermsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-5">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          Điều khoản sử dụng
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">Điều khoản sử dụng của Ví giấy tờ</h1>
        <p className="text-white/60 text-sm">Cập nhật lần cuối: 29/03/2026</p>

        <section>
          <h2 className="text-lg font-bold">1. Mục đích sử dụng</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Ví giấy tờ giúp bạn quản lý bản chụp và thông tin giấy tờ cá nhân để tra cứu nhanh. Ứng dụng hỗ trợ
            lưu trữ tiện lợi nhưng không thay thế hoàn toàn giấy tờ bản gốc trong các trường hợp pháp luật yêu cầu.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">2. Trách nhiệm của người dùng</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Bạn chịu trách nhiệm về nội dung đưa vào app, bảo quản thiết bị cá nhân, bảo mật mật khẩu/PIN và không
            chia sẻ trái phép giấy tờ của người khác.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">3. Sao lưu và khôi phục</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            App cho phép xuất file sao lưu `.vgtd` và đặt PIN 6 số. Bạn cần giữ file backup và PIN cẩn thận.
            Nếu mất file hoặc quên PIN, dữ liệu có thể không khôi phục lại được.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">4. Xoá dữ liệu và thùng rác</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Mục đã xoá sẽ vào thùng rác để bạn khôi phục trong thời gian cho phép. Sau đó, dữ liệu có thể bị xoá
            vĩnh viễn khỏi ứng dụng.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">5. Cập nhật điều khoản</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Điều khoản có thể được cập nhật theo phiên bản ứng dụng mới hoặc yêu cầu pháp lý. Việc bạn tiếp tục sử dụng
            ứng dụng sau thời điểm cập nhật đồng nghĩa với việc bạn đồng ý điều khoản mới.
          </p>
        </section>
      </section>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-5">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          Quyền riêng tư
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">Chính sách quyền riêng tư của Ví giấy tờ</h1>
        <p className="text-white/60 text-sm">Cập nhật lần cuối: 29/03/2026</p>
        <section>
          <h2 className="text-lg font-bold">Cam kết cốt lõi về quyền riêng tư</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-white/70 text-sm leading-relaxed">
            {privacyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold">Dữ liệu nào được lưu trong ứng dụng</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Ví giấy tờ lưu các thông tin do bạn tạo: tên giấy tờ, hình ảnh, PDF, ghi chú, phân loại, ngày hết hạn,
            và nội dung chữ nhận diện để hỗ trợ tìm kiếm nhanh hơn.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Quyền truy cập trên thiết bị</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            App chỉ xin quyền khi cần dùng tính năng tương ứng: camera để chụp/scan, thư viện để chọn ảnh,
            thông báo để nhắc hết hạn. Bạn có thể tắt từng quyền trong cài đặt máy bất cứ lúc nào.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Bảo vệ khi sao lưu dữ liệu</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Khi xuất backup, file `.vgtd` được bảo vệ bởi PIN 6 số bạn tự đặt. Chỉ người có PIN đúng mới có thể
            khôi phục nội dung từ file sao lưu đó.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Quyền kiểm soát của bạn</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Bạn có thể chỉnh sửa, xóa, khôi phục dữ liệu hoặc xóa toàn bộ dữ liệu ngay trong app. Bạn là người toàn
            quyền kiểm soát nội dung của mình.
          </p>
        </section>
      </section>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-6">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          Liên hệ
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">Liên hệ với Ví giấy tờ</h1>
        <p className="text-white/70 text-sm leading-relaxed">
          Nếu bạn cần góp ý, báo lỗi hoặc muốn trao đổi thêm về ứng dụng, vui lòng liên hệ qua một trong
          hai kênh dưới đây.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              className="glass-card rounded-3xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">{card.icon}</span>
              </div>
              <div>
                <p className="text-white/60 text-sm">{card.title}</p>
                <p className="text-white font-semibold mt-1">{card.value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/dieu-khoan-su-dung"
          element={
            <AppLayout>
              <TermsPage />
            </AppLayout>
          }
        />
        <Route
          path="/quyen-rieng-tu"
          element={
            <AppLayout>
              <PrivacyPage />
            </AppLayout>
          }
        />
        <Route
          path="/lien-he"
          element={
            <AppLayout>
              <ContactPage />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
