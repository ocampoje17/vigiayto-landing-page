import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'

const privacyPoints = [
  'Bạn luôn biết thông tin nào đang được lưu trong app.',
  'Dữ liệu của bạn lưu 100% offline trên máy bạn, không được gửi đi bất kỳ đâu, không lo lộ lọt thông tin cá nhân, giấy tờ.',
  'Bạn có thể tự xoá toàn bộ dữ liệu của app bất kỳ lúc nào một cách dễ dàng nhất.',
]

const benefitCards = [
  {
    icon: 'photo_camera',
    title: 'Thêm giấy tờ rất nhanh',
    desc: 'Bạn có thể chụp, scan, chọn từ thư viện hoặc đính kèm PDF trong vài thao tác.',
    tone: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    icon: 'manage_search',
    title: 'Tìm lại trong vài giây',
    desc: 'Tìm theo tên, phân loại, ghi chú, và cả nội dung chữ đã nhận diện từ ảnh/PDF.',
    tone: 'bg-violet-500/20 text-violet-300',
  },
  {
    icon: 'wifi_off',
    title: '100% offline',
    desc: 'Dữ liệu nằm trên máy bạn. Không cần cloud, không gửi dữ liệu cá nhân ra ngoài.',
    tone: 'bg-emerald-500/20 text-emerald-300',
  },
]

const experienceItems = [
  { title: 'Ghim giấy tờ quan trọng', desc: 'Giấy tờ hay dùng luôn ở đầu danh sách để mở nhanh.' },
  {
    title: 'Khóa app bằng mật khẩu',
    desc: 'Bạn có thể bật mật khẩu và mở nhanh bằng vân tay hoặc Face ID trên máy hỗ trợ.',
  },
  { title: 'Nhắc ngày hết hạn', desc: 'Ứng dụng nhắc trước khi giấy tờ sắp hết hạn để bạn chủ động gia hạn.' },
  { title: 'Thùng rác 30 ngày', desc: 'Lỡ xóa vẫn có thể khôi phục trước khi bị xóa vĩnh viễn.' },
  { title: 'Xuất backup .vgtd', desc: 'Sao lưu dữ liệu thành 1 file để cất giữ hoặc chuyển sang máy khác.' },
  { title: 'Khôi phục bằng PIN 6 số', desc: 'File sao lưu có mã PIN để bảo vệ khi chia sẻ hoặc lưu trữ.' },
  { title: 'My Documents cá nhân', desc: 'Lưu ghi chú nhanh kèm ảnh, video, file trong kho riêng tiện tra cứu.' },
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

const appLogoUrl = `${import.meta.env.BASE_URL}app-logo.png`

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
              The Digital Archivist
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-6">
              An tâm lưu trữ <br />
              mọi giấy tờ cá nhân.
            </h1>
            <p className="text-base md:text-lg text-white/70 font-light max-w-md mb-8 leading-relaxed">
              Ví Giấy Tờ giúp bạn gom giấy tờ vào một chỗ, tìm lại nhanh, nhắc hạn đúng lúc và sao lưu
              an toàn. Mọi thứ được thiết kế để ai cũng dùng được, không cần rành công nghệ.
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
              <span
                className="material-symbols-outlined text-[120px] text-white opacity-90 filter drop-shadow-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
            </div>
            <div className="absolute -top-4 -right-2 bg-white/10 backdrop-blur-xl p-4 rounded-2xl -rotate-12 shadow-lg border border-white/20">
              <span
                className="material-symbols-outlined text-white/80 text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock
              </span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl p-5 rounded-2xl rotate-6 shadow-lg border border-white/20">
              <span className="material-symbols-outlined text-white/80 text-2xl">fingerprint</span>
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
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Bạn sẽ dùng mỗi ngày</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
          {experienceItems.map((item) => (
            <article className="flex-none w-56 snap-center group glass-card rounded-3xl p-5" key={item.title}>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                <img src={appLogoUrl} alt="" className="w-8 h-8 rounded-lg" />
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 h-auto md:h-[360px] mb-12">
        <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
            <img
              alt="Biometric interface"
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBplopES53gxjW9O-ZNxl6eVp23KPqlw9ktar90E0iGuGc4WocKdqsaDt4yxfdsftrEzryNvpnnXub9Q97JmRQsoYISsDoU3b-HH21Gs2T9A-ciaeM2FgeiNEhcz_RSsaxg63J2RfXTfPWzIRAQoeG0z-PgHGP6ma-_xvZKono0yYUUn7Qfq-gOMNmEz6irp2tvjW1GSHRxnqAGl-cph_4AbuceokXuz7uJadSARsv58dKSc1I0ADaN-BmUwLpUFOE2kthi0iyMTTE"
            />
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold tracking-tight text-white mb-2">Cam kết rõ ràng về dữ liệu</h4>
            <ul className="text-sm text-white/70 space-y-2">
              {privacyPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 glass-card rounded-3xl p-5 flex items-center gap-5 group transition-all hover:bg-white/10">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 shadow-md group-hover:rotate-6 transition-transform border border-white/10">
            <span className="material-symbols-outlined text-white text-3xl">notifications_active</span>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Nhắc hạn tự động mỗi ngày</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Bật thông báo để nhận nhắc khi giấy tờ sắp hết hạn, tránh quên các mốc quan trọng.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 flex flex-col justify-center text-center transition-all hover:bg-white/10">
          <div className="text-3xl font-extrabold text-white mb-1">30 ngày</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Thùng Rác Khôi Phục</div>
        </div>
        <div className="glass-card rounded-3xl p-5 flex flex-col justify-center text-center transition-all hover:bg-white/10">
          <div className="text-3xl font-extrabold text-white mb-1">PIN 6 số</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Bảo Vệ File Backup</div>
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
            Ví giấy tờ giúp bạn lưu và quản lý thông tin giấy tờ cá nhân để tra cứu thuận tiện hơn.
            Ứng dụng không thay thế hoàn toàn giấy tờ bản gốc trong các trường hợp pháp luật yêu cầu.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">2. Trách nhiệm của người dùng</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Bạn cần cung cấp thông tin đúng sự thật, bảo vệ thiết bị cá nhân và không chia sẻ trái phép
            dữ liệu của người khác.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">3. Bảo mật tài khoản và thiết bị</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Bạn nên bật mật khẩu ứng dụng, sinh trắc học và giữ an toàn cho điện thoại của mình. Nếu
            cho người khác mượn máy, hãy cân nhắc khóa ứng dụng để tránh lộ thông tin giấy tờ.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">4. Sao lưu và khôi phục dữ liệu</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Ứng dụng có tính năng xuất file sao lưu để bạn tự lưu giữ. Bạn chịu trách nhiệm bảo quản
            file sao lưu và mã PIN khôi phục. Nếu mất file hoặc quên PIN, dữ liệu có thể không khôi
            phục lại được.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">5. Giới hạn sử dụng</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Không dùng ứng dụng cho mục đích vi phạm pháp luật, gian lận giấy tờ, hoặc gây ảnh hưởng
            đến quyền lợi của người khác.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">6. Điều chỉnh điều khoản</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Nội dung điều khoản có thể được cập nhật để phù hợp với phiên bản mới và quy định pháp lý.
            Khi tiếp tục sử dụng ứng dụng sau khi điều khoản thay đổi, bạn đồng ý với nội dung cập
            nhật đó.
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
            Ví giấy tờ lưu các thông tin bạn tự nhập như tên giấy tờ, ảnh, PDF, ghi chú, phân loại,
            ngày hết hạn và nội dung chữ nhận diện từ ảnh/PDF để hỗ trợ tìm kiếm nhanh.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Quyền truy cập trên thiết bị</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Ứng dụng chỉ xin quyền khi cần dùng tính năng tương ứng, ví dụ: camera để chụp/scan, thư
            viện để chọn ảnh, thông báo để nhắc hạn. Bạn có thể tắt các quyền này trong cài đặt máy.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Sao lưu dữ liệu và mã PIN</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Khi xuất sao lưu, dữ liệu được đóng gói thành file `.vgtd` và bảo vệ bằng mã PIN do bạn
            đặt. Bạn cần tự bảo quản file sao lưu và mã PIN để tránh người khác truy cập trái phép.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold">Quyền kiểm soát của bạn</h2>
          <p className="text-white/70 mt-2 text-sm leading-relaxed">
            Bạn có quyền chỉnh sửa, xóa từng mục, khôi phục từ thùng rác, hoặc xóa toàn bộ dữ liệu bất
            kỳ lúc nào ngay trong ứng dụng.
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
