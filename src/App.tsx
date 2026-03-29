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
    title: 'Lưu giấy tờ theo cách quen thuộc',
    desc: 'Chụp ảnh, quét nhanh, chọn từ thư viện hoặc đính kèm PDF đều dễ làm.',
    tone: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    icon: 'manage_search',
    title: 'Tìm lại trong vài giây',
    desc: 'Tìm theo tên, phân loại, ghi chú và cả chữ trong ảnh/PDF sau khi app nhận diện.',
    tone: 'bg-violet-500/20 text-violet-300',
  },
  {
    icon: 'shield_lock',
    title: 'Riêng tư là mặc định',
    desc: 'Khóa app bằng mật khẩu, vân tay/Face ID và lưu dữ liệu hoàn toàn offline.',
    tone: 'bg-emerald-500/20 text-emerald-300',
  },
]

const mainFeatureCards = [
  {
    icon: 'folder',
    bgIcon: 'inventory_2',
    title: 'Quản lý giấy tờ gọn gàng',
    desc: 'Lưu và sắp xếp giấy tờ cá nhân rõ ràng để mở lại nhanh khi cần.',
    iconTone: 'text-sky-100',
    iconBg: 'bg-sky-400/20 border-sky-200/40',
    cardTone: 'from-sky-500/30 via-indigo-500/20 to-transparent',
    glowTone: 'bg-sky-400/35',
  },
  {
    icon: 'manage_search',
    bgIcon: 'travel_explore',
    title: 'Tìm kiếm nhanh giấy tờ',
    desc: 'Tìm theo tên, phân loại, ghi chú hoặc nội dung OCR chỉ trong vài giây.',
    iconTone: 'text-violet-100',
    iconBg: 'bg-violet-400/20 border-violet-200/40',
    cardTone: 'from-violet-500/30 via-fuchsia-500/20 to-transparent',
    glowTone: 'bg-violet-400/35',
  },
  {
    icon: 'share',
    bgIcon: 'forward_to_inbox',
    title: 'Chia sẻ giấy tờ khi cần',
    desc: 'Gửi giấy tờ cho người thân hoặc đối tác ngay từ trong app, rất nhanh và rõ ràng.',
    iconTone: 'text-emerald-100',
    iconBg: 'bg-emerald-400/20 border-emerald-200/40',
    cardTone: 'from-emerald-500/30 via-teal-500/20 to-transparent',
    glowTone: 'bg-emerald-400/35',
  },
]

const supportFeatureCards = [
  {
    icon: 'picture_as_pdf',
    title: 'Tạo PDF từ giấy tờ hoặc ảnh bất kỳ',
    desc: 'Gộp ảnh thành file PDF gọn gàng để lưu hồ sơ hoặc gửi đi khi cần.',
  },
  {
    icon: 'text_snippet',
    title: 'OCR ảnh/PDF sang văn bản',
    desc: 'Nhận diện chữ từ ảnh và PDF để bạn dễ tìm lại, sao chép và đọc nội dung.',
  },
  {
    icon: 'fingerprint',
    title: 'Mật khẩu và sinh trắc học',
    desc: 'Bạn có thể đặt mật khẩu truy cập app và mở khoá bằng vân tay/Face ID.',
  },
]

const mockupPages = [
  {
    title: 'Trang tổng quan',
    desc: 'Xem nhanh toàn bộ giấy tờ trong một nơi, kèm mục đã ghim và giấy tờ sắp hết hạn.',
    image: `${baseUrl}mockups/home-overview.svg`,
  },
  {
    title: 'Tìm kiếm',
    desc: 'Tìm theo tên, nhãn, ghi chú hoặc nội dung OCR để mở lại giấy tờ chỉ trong vài giây.',
    image: `${baseUrl}mockups/search-ocr.svg`,
  },
  {
    title: 'Ảnh giấy tờ',
    desc: 'Xem giấy tờ theo dạng thư viện ảnh, mở nhanh từng ảnh để đối chiếu hoặc chuyển sang PDF.',
    image: `${baseUrl}mockups/tab-images.svg`,
  },
  {
    title: 'Xuất PDF',
    desc: 'Chọn ảnh bất kỳ để ghép thành file PDF gọn gàng, tiện lưu trữ và chia sẻ.',
    image: `${baseUrl}mockups/tab-pdf.svg`,
  },
  {
    title: 'OCR tiếng Việt',
    desc: 'Chuyển ảnh và PDF sang văn bản để sao chép, tìm kiếm lại và đọc nội dung dễ hơn.',
    image: `${baseUrl}mockups/tab-ocr.svg`,
  },
  {
    title: 'Cài đặt',
    desc: 'Quản lý mật khẩu, sinh trắc học, sao lưu và các tùy chọn riêng tư của ứng dụng.',
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

      <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-6">
        <nav className="max-w-7xl mx-auto bg-zinc-950/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl sm:rounded-full px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between font-sans antialiased tracking-tight">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 shrink-0 min-w-0">
              <img src={appLogoUrl} alt="Logo Ví Giấy Tờ" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" />
              <span className="text-base sm:text-xl font-bold tracking-tighter text-zinc-50 truncate">Ví Giấy Tờ</span>
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
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="w-8 h-8 sm:w-auto sm:h-auto p-1.5 hover:bg-zinc-800/50 rounded-full transition-all active:scale-95 duration-200 flex items-center justify-center shrink-0"
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
              className="bg-white text-indigo-950 px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-zinc-100 transition-all active:scale-95 duration-200 shadow-sm shrink-0"
            >
              <span className="sm:hidden">Play Store</span>
              <span className="hidden sm:inline">Tải trên Play Store</span>
            </a>
          </div>
        </nav>
        <div className="md:hidden mt-2">
          <div className="max-w-7xl mx-auto overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 px-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
                end
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/quyen-rieng-tu"
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                Quyền riêng tư
              </NavLink>
              <NavLink
                to="/dieu-khoan-su-dung"
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                Điều khoản
              </NavLink>
              <NavLink
                to="/lien-he"
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                Liên hệ
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="w-full py-10 sm:py-12 bg-zinc-950/20 backdrop-blur-xl border-t border-white/5 relative z-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-7 md:gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-zinc-50">Ví Giấy Tờ</span>
            <p className="text-xs font-normal leading-relaxed text-zinc-400 max-w-[260px]">
              © 2026 Ví Giấy Tờ. Lưu giấy tờ an toàn, dễ dùng mỗi ngày.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-zinc-50 uppercase tracking-[0.2em]">Pháp lý</span>
            <nav className="flex items-center flex-wrap gap-3">
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
      <section className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] hero-glass p-5 sm:p-6 md:p-12 mb-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
              Ví giấy tờ cho mọi người
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-5 sm:mb-6">
              Lưu giấy tờ gọn gàng, <br />
              tìm lại cực nhanh.
            </h1>
            <p className="text-base md:text-lg text-white/70 font-light max-w-md mb-8 leading-relaxed">
              Từ CCCD, bằng lái đến hồ sơ cá nhân, bạn có thể quản lý ngay trên điện thoại.
              Dễ dùng cho người phổ thông, thao tác rõ ràng, không rối. Ứng dụng hoàn toàn miễn phí.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.vigiayto.placeholder"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-indigo-900 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xl">android</span>
                Tải cho Android
              </a>
              <Link
                to="/quyen-rieng-tu"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                Xem cam kết bảo mật 100% offline
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[250px] sm:max-w-[320px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />
            <div className="relative bg-white/5 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.25rem] sm:rounded-[3rem] rotate-12 shadow-2xl border border-white/10">
              <img src={appLogoUrl} alt="Logo Ví Giấy Tờ" className="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] rounded-[22px] sm:rounded-[28px] object-cover" />
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
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Các chức năng quan trọng</h2>
          <p className="hidden md:block text-sm text-white/70">3 việc quan trọng nhất bạn dùng hằng ngày</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {mainFeatureCards.map((item, idx) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br ${item.cardTone} glass-card p-5 sm:p-6 min-h-[205px] sm:min-h-[220px] hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`absolute -top-14 -right-14 h-36 w-36 rounded-full blur-3xl ${item.glowTone}`} />
              <span className="material-symbols-outlined absolute -right-4 -bottom-5 text-[110px] text-white/[0.08] select-none pointer-events-none">
                {item.bgIcon}
              </span>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${item.iconBg}`}>
                    <span className={`material-symbols-outlined text-xl ${item.iconTone}`}>{item.icon}</span>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide text-white/60">0{idx + 1}</span>
                </div>

                <h3 className="text-white font-extrabold text-lg leading-tight">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mt-2 max-w-[36ch]">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="security-priority-card glass-card rounded-3xl p-6 md:p-8 border border-white/20">
          <div className="security-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="security-icon-box w-12 h-12 rounded-2xl border flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">verified_user</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Bảo mật là ưu tiên trên hết</h2>
            </div>
            <div className="security-highlight rounded-2xl p-4">
              <p className="text-white font-semibold text-base leading-relaxed">
                Ví Giấy Tờ chạy 100% offline. Dữ liệu chỉ nằm trên máy bạn, không gửi ra ngoài và không qua bất kỳ
                dịch vụ nào cần kết nối mạng.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="security-fact rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Dữ liệu ở trên máy bạn</p>
                <p className="text-white/70 text-xs mt-2">Thông tin giấy tờ không rời khỏi thiết bị của bạn.</p>
              </div>
              <div className="security-fact rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Không có đồng bộ đám mây</p>
                <p className="text-white/70 text-xs mt-2">App không phụ thuộc dịch vụ online hay tài khoản bên ngoài.</p>
              </div>
              <div className="security-fact rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Cần sao lưu trước khi cài lại</p>
                <p className="text-white/70 text-xs mt-2">
                  Khi cài lại app, hãy xuất file backup trước để giữ dữ liệu an toàn.
                </p>
              </div>
            </div>
            <div className="security-access rounded-2xl p-4 mt-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-white text-xl mt-0.5">fingerprint</span>
              <p className="text-white/90 text-sm leading-relaxed">
                Bạn có thể đặt mật khẩu và mở khóa bằng vân tay/Face ID để vào app nhanh hơn.
              </p>
            </div>
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
            "Là một người dùng như bạn, tôi muốn việc quản lý giấy tờ phải thật tiện lợi nhưng vẫn an toàn tuyệt đối.
            Vì vậy, Ví Giấy Tờ được xây dựng để lưu và xử lý hoàn toàn offline, không gửi dữ liệu ra ngoài thiết bị
            của bạn, để bạn có thể yên tâm sử dụng mỗi ngày."
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
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Các màn hình chính trong app</h2>
          <p className="hidden sm:block text-xs text-white/60">Vuốt ngang để xem thêm</p>
        </div>
        <p className="sm:hidden text-xs text-white/60 mb-3">Vuốt ngang để xem thêm các màn hình.</p>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
          {mockupPages.map((item) => (
            <article className="flex-none w-[300px] sm:w-[340px] md:w-[360px] snap-center group glass-card rounded-3xl p-4" key={item.title}>
              <img
                src={item.image}
                alt={`Mockup ${item.title}`}
                className="w-full h-[200px] sm:h-[230px] md:h-[250px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-slate-900/40 p-1"
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
              <p className="text-3xl font-extrabold text-white">100% offline</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Dữ liệu ở trên thiết bị</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div>
              <p className="text-3xl font-extrabold text-white">Tìm lại trong vài giây</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Theo tên, phân loại, ghi chú</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div>
              <p className="text-3xl font-extrabold text-white">Người Việt phát triển</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Tối ưu cho nhu cầu tiếng Việt</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function TermsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
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
          <h2 className="text-lg font-bold">Dữ liệu của bạn có được chia sẻ đi đâu không?</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Không. Dữ liệu của app lưu 100% offline trên máy bạn, không được gửi đi bất kỳ nơi nào khác.
          </p>
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
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
