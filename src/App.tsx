import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'

type Language = 'vi' | 'en'

const baseUrl = import.meta.env.BASE_URL
const appLogoUrl = `${baseUrl}app-logo.png`

const HOME_PATH = '/'
const PRIVACY_PATH = '/quyen-rieng-tu'
const TERMS_PATH = '/dieu-khoan-su-dung'
const CONTACT_PATH = '/lien-he'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.namhnz.vigiayto'

const THEME_STORAGE_KEY = 'vigiayto-theme'
const LANGUAGE_STORAGE_KEY = 'vigiayto-language'

const privacyPoints = [
  'Bạn luôn biết thông tin nào đang được lưu trong app.',
  'Dữ liệu của bạn lưu 100% offline trên máy bạn, không được gửi đi bất kỳ đâu, không lo lộ lọt thông tin cá nhân, giấy tờ.',
  'Bạn có thể tự xoá toàn bộ dữ liệu của app bất kỳ lúc nào một cách dễ dàng nhất.',
]

const privacyPointsEn = [
  'You always know what information is stored in the app.',
  'Your data is stored 100% offline on your device and is never sent anywhere else.',
  'You can delete all app data at any time.',
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

const benefitCardsEn = [
  {
    icon: 'add_a_photo',
    title: 'Save documents your way',
    desc: 'Capture photos, scan quickly, pick from your gallery, or attach PDF files easily.',
    tone: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    icon: 'manage_search',
    title: 'Find documents in seconds',
    desc: 'Search by name, category, notes, and OCR text from images or PDFs.',
    tone: 'bg-violet-500/20 text-violet-300',
  },
  {
    icon: 'shield_lock',
    title: 'Privacy by default',
    desc: 'Lock the app with password, fingerprint/Face ID, with fully offline storage.',
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

const mainFeatureCardsEn = [
  {
    icon: 'folder',
    bgIcon: 'inventory_2',
    title: 'Organize your documents',
    desc: 'Store and sort personal documents clearly so you can reopen them quickly.',
    iconTone: 'text-sky-100',
    iconBg: 'bg-sky-400/20 border-sky-200/40',
    cardTone: 'from-sky-500/30 via-indigo-500/20 to-transparent',
    glowTone: 'bg-sky-400/35',
  },
  {
    icon: 'manage_search',
    bgIcon: 'travel_explore',
    title: 'Fast document search',
    desc: 'Search by name, category, notes, or OCR content in just a few seconds.',
    iconTone: 'text-violet-100',
    iconBg: 'bg-violet-400/20 border-violet-200/40',
    cardTone: 'from-violet-500/30 via-fuchsia-500/20 to-transparent',
    glowTone: 'bg-violet-400/35',
  },
  {
    icon: 'share',
    bgIcon: 'forward_to_inbox',
    title: 'Share when needed',
    desc: 'Send documents to family members or partners directly from the app.',
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

const supportFeatureCardsEn = [
  {
    icon: 'picture_as_pdf',
    title: 'Create PDFs from any document or image',
    desc: 'Combine images into neat PDF files for archive or sharing.',
  },
  {
    icon: 'text_snippet',
    title: 'OCR from images and PDFs',
    desc: 'Extract text from images and PDFs for easier search and copy.',
  },
  {
    icon: 'fingerprint',
    title: 'Password and biometrics',
    desc: 'Set an app password and unlock with fingerprint/Face ID.',
  },
]

const mockupPages = [
  {
    title: 'Trang chủ',
    desc: 'Quản lý toàn bộ giấy tờ cá nhân quan trọng ngay tại trang chủ.',
    image: `${baseUrl}screenshots/play_store_01.png`,
  },
  {
    title: 'Sắp đến hạn',
    desc: 'Theo dõi và nhận nhắc nhở các giấy tờ sắp hết hạn.',
    image: `${baseUrl}screenshots/play_store_02.png`,
  },
  {
    title: 'Đã hết hạn',
    desc: 'Phân loại rõ ràng các giấy tờ đã quá hạn sử dụng.',
    image: `${baseUrl}screenshots/play_store_03.png`,
  },
  {
    title: 'Sổ ghi chú',
    desc: 'Lưu trữ nhanh thông tin quan trọng đi kèm giấy tờ.',
    image: `${baseUrl}screenshots/play_store_04.png`,
  },
  {
    title: 'Trang ảnh',
    desc: 'Quản lý hình ảnh chụp giấy tờ trực quan và rõ nét.',
    image: `${baseUrl}screenshots/play_store_05.png`,
  },
  {
    title: 'Sổ ghi nợ',
    desc: 'Ghi chép và theo dõi các khoản nợ cá nhân tiện lợi.',
    image: `${baseUrl}screenshots/play_store_06.png`,
  },
  {
    title: 'Tạo PDF & Cài đặt',
    desc: 'Tùy chỉnh cấu hình ứng dụng và xuất bản tài liệu dễ dàng.',
    image: `${baseUrl}screenshots/play_store_07.png`,
  },
  {
    title: 'Nhận dạng chữ CCCD',
    desc: 'Tự động trích xuất thông tin chữ từ ảnh chụp căn cước công dân.',
    image: `${baseUrl}screenshots/play_store_08.png`,
  },
  {
    title: 'Chi tiết CCCD',
    desc: 'Xem đầy đủ thông tin chi tiết và các trường dữ liệu của căn cước.',
    image: `${baseUrl}screenshots/play_store_09.png`,
  },
  {
    title: 'Quét mã QR ngân hàng',
    desc: 'Quét và lưu trữ thông tin mã QR chuyển khoản ngân hàng tiện lợi.',
    image: `${baseUrl}screenshots/play_store_10.png`,
  },
]

const mockupPagesEn = [
  {
    title: 'Home Screen',
    desc: 'Manage all your important personal documents right on the home screen.',
    image: `${baseUrl}screenshots/play_store_01.png`,
  },
  {
    title: 'Upcoming Expirations',
    desc: 'Track and receive reminders for documents that are about to expire.',
    image: `${baseUrl}screenshots/play_store_02.png`,
  },
  {
    title: 'Expired Documents',
    desc: 'Clearly categorize documents that have passed their expiration date.',
    image: `${baseUrl}screenshots/play_store_03.png`,
  },
  {
    title: 'Notes',
    desc: 'Quickly store important notes accompanying your documents.',
    image: `${baseUrl}screenshots/play_store_04.png`,
  },
  {
    title: 'Document Photos',
    desc: 'Manage document photos visually with high clarity.',
    image: `${baseUrl}screenshots/play_store_05.png`,
  },
  {
    title: 'Debt Ledger',
    desc: 'Conveniently record and track personal debts.',
    image: `${baseUrl}screenshots/play_store_06.png`,
  },
  {
    title: 'PDF & Settings',
    desc: 'Customize app configuration and export documents easily.',
    image: `${baseUrl}screenshots/play_store_07.png`,
  },
  {
    title: 'ID Card OCR',
    desc: 'Automatically extract text information from ID card photos.',
    image: `${baseUrl}screenshots/play_store_08.png`,
  },
  {
    title: 'ID Card Details',
    desc: 'View full detailed information and data fields of the ID card.',
    image: `${baseUrl}screenshots/play_store_09.png`,
  },
  {
    title: 'Bank QR Scanner',
    desc: 'Scan and store bank transfer QR code information conveniently.',
    image: `${baseUrl}screenshots/play_store_10.png`,
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

const contactCardsEn = [
  {
    title: 'Contact via Gmail',
    value: 'namqhong@gmail.com',
    href: 'mailto:namqhong@gmail.com',
    icon: 'mail',
  },
  {
    title: 'Message via Telegram',
    value: '@namhnz',
    href: 'https://t.me/namhnz',
    icon: 'send',
  },
]

const layoutTextByLanguage = {
  vi: {
    logoAlt: 'Logo Ví Giấy Tờ',
    appName: 'Ví Giấy Tờ',
    navHome: 'Trang chủ',
    navPrivacy: 'Quyền riêng tư',
    navTerms: 'Điều khoản sử dụng',
    navTermsShort: 'Điều khoản',
    navContact: 'Liên hệ',
    themeAria: 'Đổi giao diện sáng/tối',
    languageAria: 'Chuyển ngôn ngữ English/Tiếng Việt',
    playStoreShort: 'Play Store',
    playStoreCta: 'Tải trên Play Store',
    footerCopyright: '© 2026 Ví Giấy Tờ. Lưu giấy tờ an toàn, dễ dùng mỗi ngày.',
    footerLegal: 'Pháp lý',
    footerContact: 'Liên hệ',
  },
  en: {
    logoAlt: 'Vi Giay To logo',
    appName: 'Vi Giay To',
    navHome: 'Home',
    navPrivacy: 'Privacy',
    navTerms: 'Terms of Use',
    navTermsShort: 'Terms',
    navContact: 'Contact',
    themeAria: 'Switch light/dark theme',
    languageAria: 'Switch language between English and Vietnamese',
    playStoreShort: 'Play Store',
    playStoreCta: 'Get it on Play Store',
    footerCopyright: '© 2026 Vi Giay To. Safe and simple document storage.',
    footerLegal: 'Legal',
    footerContact: 'Contact',
  },
} as const

const homeTextByLanguage = {
  vi: {
    badge: 'Ví giấy tờ cho mọi người',
    titleLine1: 'Lưu giấy tờ gọn gàng,',
    titleLine2: 'tìm lại cực nhanh.',
    desc: 'Từ CCCD, bằng lái đến hồ sơ cá nhân, bạn có thể quản lý ngay trên điện thoại. Dễ dùng cho người phổ thông, thao tác rõ ràng, không rối. Ứng dụng hoàn toàn miễn phí.',
    androidCta: 'Tải cho Android',
    privacyCta: 'Xem cam kết bảo mật 100% offline',
    mainFeaturesTitle: 'Các chức năng quan trọng',
    mainFeaturesHint: '3 việc quan trọng nhất bạn dùng hằng ngày',
    securityTitle: 'Bảo mật là ưu tiên trên hết',
    securityDesc:
      'Ví Giấy Tờ chạy 100% offline. Dữ liệu chỉ nằm trên máy bạn, không gửi ra ngoài và không qua bất kỳ dịch vụ nào cần kết nối mạng.',
    securityFact1Title: 'Dữ liệu ở trên máy bạn',
    securityFact1Desc: 'Thông tin giấy tờ không rời khỏi thiết bị của bạn.',
    securityFact2Title: 'Không có đồng bộ đám mây',
    securityFact2Desc: 'App không phụ thuộc dịch vụ online hay tài khoản bên ngoài.',
    securityFact3Title: 'Cần sao lưu trước khi cài lại',
    securityFact3Desc: 'Khi cài lại app, hãy xuất file backup trước để giữ dữ liệu an toàn.',
    securityAccess: 'Bạn có thể đặt mật khẩu và mở khóa bằng vân tay/Face ID để vào app nhanh hơn.',
    creatorTitle: 'Tâm thư từ người tạo app',
    creatorQuote:
      '"Là một người dùng như bạn, tôi muốn việc quản lý giấy tờ phải thật tiện lợi nhưng vẫn an toàn tuyệt đối. Vì vậy, Ví Giấy Tờ được xây dựng để lưu và xử lý hoàn toàn offline, không gửi dữ liệu ra ngoài thiết bị của bạn, để bạn có thể yên tâm sử dụng mỗi ngày."',
    supportTitle: 'Các chức năng phụ hữu ích',
    launchBadge: 'ĐƯỢC NHẮC ĐẾN',
    launchTitle: 'Ví Giấy Tờ đang được giới thiệu trên các nền tảng launch của Việt Nam',
    screensTitle: 'Hình ảnh thực tế của app',
    screensHintDesktop: 'Vuốt ngang để xem thêm',
    screensHintMobile: 'Vuốt ngang để xem thêm các màn hình.',
    metric1Title: '100% offline',
    metric1Desc: 'Dữ liệu ở trên thiết bị',
    metric2Title: 'Tìm lại trong vài giây',
    metric2Desc: 'Theo tên, phân loại, ghi chú',
    metric3Title: 'Người Việt phát triển',
    metric3Desc: 'Tối ưu cho nhu cầu tiếng Việt',
  },
  en: {
    badge: 'Document wallet for everyone',
    titleLine1: 'Keep documents organized,',
    titleLine2: 'find them in seconds.',
    desc: 'From ID cards and driver licenses to personal records, you can manage everything on your phone. Easy for everyday users, clear flow, no confusion. The app is free.',
    androidCta: 'Download for Android',
    privacyCta: 'See the 100% offline privacy commitment',
    mainFeaturesTitle: 'Core features',
    mainFeaturesHint: 'Top 3 tasks you use every day',
    securityTitle: 'Security is top priority',
    securityDesc:
      'Vi Giay To runs 100% offline. Your data stays on your device and is never sent out to any online service.',
    securityFact1Title: 'Data stays on your device',
    securityFact1Desc: 'Your document information does not leave your phone.',
    securityFact2Title: 'No cloud sync',
    securityFact2Desc: 'The app does not depend on online services or accounts.',
    securityFact3Title: 'Backup before reinstall',
    securityFact3Desc: 'Before reinstalling the app, export a backup file to keep your data safe.',
    securityAccess: 'You can set a password and unlock with fingerprint/Face ID for faster access.',
    creatorTitle: 'A note from the creator',
    creatorQuote:
      '"As a user like you, I wanted document management to be simple and truly private. That is why Vi Giay To stores and processes everything offline, without sending your data outside your device."',
    supportTitle: 'Helpful extra features',
    launchBadge: 'FEATURED ON',
    launchTitle: 'Vi Giay To is featured on Vietnamese launch platforms',
    screensTitle: 'Actual app screenshots',
    screensHintDesktop: 'Swipe horizontally to see more',
    screensHintMobile: 'Swipe horizontally to view more screens.',
    metric1Title: '100% offline',
    metric1Desc: 'Data stays on device',
    metric2Title: 'Find in seconds',
    metric2Desc: 'By name, category, notes',
    metric3Title: 'Built by a Vietnamese developer',
    metric3Desc: 'Optimized for local usage',
  },
} as const

const termsSectionsByLanguage = {
  vi: [
    {
      title: '1. Mục đích sử dụng',
      desc: 'Ví giấy tờ giúp bạn quản lý bản chụp và thông tin giấy tờ cá nhân để tra cứu nhanh. Ứng dụng hỗ trợ lưu trữ tiện lợi nhưng không thay thế hoàn toàn giấy tờ bản gốc trong các trường hợp pháp luật yêu cầu.',
    },
    {
      title: '2. Trách nhiệm của người dùng',
      desc: 'Bạn chịu trách nhiệm về nội dung đưa vào app, bảo quản thiết bị cá nhân, bảo mật mật khẩu/PIN và không chia sẻ trái phép giấy tờ của người khác.',
    },
    {
      title: '3. Sao lưu và khôi phục',
      desc: 'App cho phép xuất file sao lưu `.vgtd` và đặt PIN 6 số. Bạn cần giữ file backup và PIN cẩn thận. Nếu mất file hoặc quên PIN, dữ liệu có thể không khôi phục lại được.',
    },
    {
      title: '4. Xoá dữ liệu và thùng rác',
      desc: 'Mục đã xoá sẽ vào thùng rác để bạn khôi phục trong thời gian cho phép. Sau đó, dữ liệu có thể bị xoá vĩnh viễn khỏi ứng dụng.',
    },
    {
      title: '5. Cập nhật điều khoản',
      desc: 'Điều khoản có thể được cập nhật theo phiên bản ứng dụng mới hoặc yêu cầu pháp lý. Việc bạn tiếp tục sử dụng ứng dụng sau thời điểm cập nhật đồng nghĩa với việc bạn đồng ý điều khoản mới.',
    },
  ],
  en: [
    {
      title: '1. Purpose of use',
      desc: 'Vi Giay To helps you manage personal document images and information for fast lookup. It improves convenience but does not replace original legal documents where required by law.',
    },
    {
      title: '2. User responsibilities',
      desc: 'You are responsible for content added to the app, keeping your device secure, protecting your password/PIN, and not sharing other people’s documents without permission.',
    },
    {
      title: '3. Backup and restore',
      desc: 'The app allows exporting `.vgtd` backup files protected by a 6-digit PIN. Keep the file and PIN safe. If either is lost, data recovery may not be possible.',
    },
    {
      title: '4. Deletion and trash',
      desc: 'Deleted items are moved to trash for a limited restore period. After that, data may be permanently removed from the app.',
    },
    {
      title: '5. Terms updates',
      desc: 'Terms may be updated for new app versions or legal requirements. Continued use after updates means you accept the new terms.',
    },
  ],
} as const

const privacySectionsByLanguage = {
  vi: [
    {
      title: 'Dữ liệu của bạn có được chia sẻ đi đâu không?',
      desc: 'Không. Dữ liệu của app lưu 100% offline trên máy bạn, không được gửi đi bất kỳ nơi nào khác.',
    },
    {
      title: 'Dữ liệu nào được lưu trong ứng dụng',
      desc: 'Ví giấy tờ lưu các thông tin do bạn tạo: tên giấy tờ, hình ảnh, PDF, ghi chú, phân loại, ngày hết hạn, và nội dung chữ nhận diện để hỗ trợ tìm kiếm nhanh hơn.',
    },
    {
      title: 'Quyền truy cập trên thiết bị',
      desc: 'App chỉ xin quyền khi cần dùng tính năng tương ứng: camera để chụp/scan, thư viện để chọn ảnh, thông báo để nhắc hết hạn. Bạn có thể tắt từng quyền trong cài đặt máy bất cứ lúc nào.',
    },
    {
      title: 'Bảo vệ khi sao lưu dữ liệu',
      desc: 'Khi xuất backup, file `.vgtd` được bảo vệ bởi PIN 6 số bạn tự đặt. Chỉ người có PIN đúng mới có thể khôi phục nội dung từ file sao lưu đó.',
    },
    {
      title: 'Quyền kiểm soát của bạn',
      desc: 'Bạn có thể chỉnh sửa, xóa, khôi phục dữ liệu hoặc xóa toàn bộ dữ liệu ngay trong app. Bạn là người toàn quyền kiểm soát nội dung của mình.',
    },
  ],
  en: [
    {
      title: 'Is your data shared anywhere?',
      desc: 'No. App data is stored 100% offline on your device and is not sent to any external service.',
    },
    {
      title: 'What data is stored in the app',
      desc: 'Vi Giay To stores the data you create: document names, images, PDFs, notes, categories, expiry dates, and recognized text to support search.',
    },
    {
      title: 'Device permissions',
      desc: 'The app only asks for permissions needed by each feature: camera for scan/capture, gallery for images, and notifications for expiry reminders.',
    },
    {
      title: 'Backup protection',
      desc: 'When exporting backup, the `.vgtd` file is protected by your 6-digit PIN. Only users with the correct PIN can restore that backup.',
    },
    {
      title: 'Your control',
      desc: 'You can edit, delete, restore data, or wipe everything directly in the app. You stay in full control.',
    },
  ],
} as const

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function AppLayout({
  children,
  language,
  setLanguage,
}: {
  children: ReactNode
  language: Language
  setLanguage: (language: Language) => void
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const text = layoutTextByLanguage[language]
  const nextLanguage: Language = language === 'vi' ? 'en' : 'vi'

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
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
              <img src={appLogoUrl} alt={text.logoAlt} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" />
              <span className="text-base sm:text-xl font-bold tracking-tighter text-zinc-50 truncate">{text.appName}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to={HOME_PATH}
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
                end
              >
                {text.navHome}
              </NavLink>
              <NavLink
                to={PRIVACY_PATH}
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                {text.navPrivacy}
              </NavLink>
              <NavLink
                to={TERMS_PATH}
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                {text.navTerms}
              </NavLink>
              <NavLink
                to={CONTACT_PATH}
                className={({ isActive }) =>
                  isActive
                    ? 'text-zinc-50 font-semibold border-b-2 border-zinc-50 pb-0.5'
                    : 'text-zinc-400 hover:text-zinc-50 transition-colors text-sm'
                }
              >
                {text.navContact}
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 p-1.5 hover:bg-zinc-800/50 rounded-full transition-all active:scale-95 duration-200 flex items-center justify-center shrink-0"
              onClick={() => setLanguage(nextLanguage)}
              aria-label={text.languageAria}
            >
              <span className="text-zinc-50 text-[11px] font-bold tracking-wide uppercase">
                {nextLanguage === 'vi' ? 'VI' : 'EN'}
              </span>
            </button>
            <button
              type="button"
              className="w-8 h-8 sm:w-auto sm:h-auto p-1.5 hover:bg-zinc-800/50 rounded-full transition-all active:scale-95 duration-200 flex items-center justify-center shrink-0"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label={text.themeAria}
            >
              <span className="material-symbols-outlined text-zinc-50 text-xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-indigo-950 px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-zinc-100 transition-all active:scale-95 duration-200 shadow-sm shrink-0"
            >
              <span className="sm:hidden">{text.playStoreShort}</span>
              <span className="hidden sm:inline">{text.playStoreCta}</span>
            </a>
          </div>
        </nav>
        <div className="md:hidden mt-2">
          <div className="max-w-7xl mx-auto overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 px-1">
              <NavLink
                to={HOME_PATH}
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
                end
              >
                {text.navHome}
              </NavLink>
              <NavLink
                to={PRIVACY_PATH}
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                {text.navPrivacy}
              </NavLink>
              <NavLink
                to={TERMS_PATH}
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                {text.navTermsShort}
              </NavLink>
              <NavLink
                to={CONTACT_PATH}
                className={({ isActive }) =>
                  `whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? 'text-zinc-50 border-zinc-50 bg-white/10'
                      : 'text-zinc-300 border-white/20 hover:text-zinc-50'
                  }`
                }
              >
                {text.navContact}
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="w-full py-10 sm:py-12 bg-zinc-950/20 backdrop-blur-xl border-t border-white/5 relative z-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-7 md:gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-zinc-50">{text.appName}</span>
            <p className="text-xs font-normal leading-relaxed text-zinc-400 max-w-[260px]">{text.footerCopyright}</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-zinc-50 uppercase tracking-[0.2em]">{text.footerLegal}</span>
            <nav className="flex items-center flex-wrap gap-3">
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to={PRIVACY_PATH}>
                {text.navPrivacy}
              </Link>
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to={TERMS_PATH}>
                {text.navTerms}
              </Link>
              <Link className="text-xs text-zinc-400 hover:text-zinc-50 transition-all" to={CONTACT_PATH}>
                {text.navContact}
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <span className="text-[11px] font-bold text-zinc-50 uppercase tracking-[0.2em]">{text.footerContact}</span>
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

function HomePage({ language }: { language: Language }) {
  const text = homeTextByLanguage[language]
  const layoutText = layoutTextByLanguage[language]
  const benefitCardsData = language === 'vi' ? benefitCards : benefitCardsEn
  const mainFeatureCardsData = language === 'vi' ? mainFeatureCards : mainFeatureCardsEn
  const supportFeatureCardsData = language === 'vi' ? supportFeatureCards : supportFeatureCardsEn
  const mockupPagesData = language === 'vi' ? mockupPages : mockupPagesEn

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
      {/* Ambient neon decorative blobs */}
      <div className="absolute top-20 left-10 -z-10 ambient-glow-1 pointer-events-none hidden md:block" />
      <div className="absolute top-[40%] right-10 -z-10 ambient-glow-2 pointer-events-none hidden md:block" />

      <section className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] hero-glass p-5 sm:p-6 md:p-12 mb-8 shadow-2xl animate-fade-in-up">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm animate-fade-in-up delay-100">
              {text.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-5 sm:mb-6 animate-fade-in-up delay-200">
              {text.titleLine1} <br />
              {text.titleLine2}
            </h1>
            <p className="text-base md:text-lg text-white/70 font-light max-w-md mb-8 leading-relaxed animate-fade-in-up delay-300">{text.desc}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start animate-fade-in-up delay-400">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-indigo-900 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xl">android</span>
                {text.androidCta}
              </a>
              <Link
                to={PRIVACY_PATH}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                {text.privacyCta}
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[250px] sm:max-w-[320px] aspect-square flex items-center justify-center animate-fade-in-up delay-500">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />
            <div className="relative bg-white/5 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.25rem] sm:rounded-[3rem] rotate-12 shadow-2xl border border-white/10 hero-mockup-main">
              <img
                src={appLogoUrl}
                alt={layoutText.logoAlt}
                className="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] rounded-[22px] sm:rounded-[28px] object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-2 bg-white/10 backdrop-blur-xl p-4 rounded-2xl -rotate-12 shadow-lg border border-white/20 hero-mockup-lock">
              <span className="material-symbols-outlined text-white/80 text-xl">lock</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl p-5 rounded-2xl rotate-6 shadow-lg border border-white/20 hero-mockup-wifi">
              <span className="material-symbols-outlined text-white/80 text-2xl">wifi_off</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {benefitCardsData.map((item, idx) => (
          <div
            key={item.title}
            className={`group glass-card p-6 rounded-3xl cursor-default reveal-on-scroll stagger-${idx + 1}`}
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
        <div className="flex items-end justify-between mb-6 reveal-on-scroll">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">{text.mainFeaturesTitle}</h2>
          <p className="hidden md:block text-sm text-white/70">{text.mainFeaturesHint}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {mainFeatureCardsData.map((item, idx) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br ${item.cardTone} glass-card p-5 sm:p-6 min-h-[205px] sm:min-h-[220px] reveal-on-scroll stagger-${idx + 1}`}
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

      <section className="mb-12 reveal-on-scroll">
        <div className="security-priority-card glass-card rounded-3xl p-6 md:p-8 border border-white/20">
          <div className="security-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="security-icon-box w-12 h-12 rounded-2xl border flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">verified_user</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">{text.securityTitle}</h2>
            </div>
            <div className="security-highlight rounded-2xl p-4">
              <p className="text-white font-semibold text-base leading-relaxed">{text.securityDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="security-fact rounded-2xl p-4 reveal-on-scroll stagger-1">
                <p className="text-white font-semibold text-sm">{text.securityFact1Title}</p>
                <p className="text-white/70 text-xs mt-2">{text.securityFact1Desc}</p>
              </div>
              <div className="security-fact rounded-2xl p-4 reveal-on-scroll stagger-2">
                <p className="text-white font-semibold text-sm">{text.securityFact2Title}</p>
                <p className="text-white/70 text-xs mt-2">{text.securityFact2Desc}</p>
              </div>
              <div className="security-fact rounded-2xl p-4 reveal-on-scroll stagger-3">
                <p className="text-white font-semibold text-sm">{text.securityFact3Title}</p>
                <p className="text-white/70 text-xs mt-2">{text.securityFact3Desc}</p>
              </div>
            </div>
            <div className="security-access rounded-2xl p-4 mt-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-white text-xl mt-0.5">fingerprint</span>
              <p className="text-white/90 text-sm leading-relaxed">{text.securityAccess}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 reveal-on-scroll">
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-amber-200/40 shadow-[0_0_32px_rgba(245,158,11,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-200/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-100 text-2xl">favorite</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">{text.creatorTitle}</h2>
          </div>
          <p className="text-white/90 text-base leading-relaxed italic">{text.creatorQuote}</p>
        </div>
      </section>

      <section className="mb-12 reveal-on-scroll">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">{text.supportTitle}</h2>
        </div>
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {supportFeatureCardsData.map((item, idx) => (
              <div key={item.title} className={`flex items-start gap-3 reveal-on-scroll stagger-${(idx % 2) + 1}`}>
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

      <section className="mb-12 reveal-on-scroll">
        <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase mb-3 backdrop-blur-sm">
              {text.launchBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white max-w-2xl leading-snug">
              {text.launchTitle}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center gap-4 shrink-0">
            <a
              href="https://unikorn.vn/p/vi-giay-to?ref=embed-vi-giay-to"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-105 active:scale-95 duration-200 shrink-0"
            >
              <img
                src="https://unikorn.vn/api/widgets/badge/vi-giay-to?theme=light"
                alt="Ví giấy tờ trên Unikorn.vn"
                style={{ width: '256px', height: '64px' }}
                width="256"
                height="64"
                className="dark:hidden"
              />
              <img
                src="https://unikorn.vn/api/widgets/badge/vi-giay-to?theme=dark"
                alt="Ví giấy tờ trên Unikorn.vn"
                style={{ width: '256px', height: '64px' }}
                width="256"
                height="64"
                className="hidden dark:block"
              />
            </a>
            <a
              href="https://launch.j2team.dev/products/vi-giay-to?utm_source=badge-launched&utm_medium=badge&utm_campaign=badge-vi-giay-to"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-105 active:scale-95 duration-200 shrink-0"
            >
              <img
                src="https://launch.j2team.dev/badge/vi-giay-to/light"
                alt="Ví giấy tờ - Launched on J2TEAM Launch"
                style={{ width: '250px', height: '54px' }}
                width="250"
                height="54"
                loading="lazy"
                className="dark:hidden"
              />
              <img
                src="https://launch.j2team.dev/badge/vi-giay-to/dark"
                alt="Ví giấy tờ - Launched on J2TEAM Launch"
                style={{ width: '250px', height: '54px' }}
                width="250"
                height="54"
                loading="lazy"
                className="hidden dark:block"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="mb-12 reveal-on-scroll">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">{text.screensTitle}</h2>
          <p className="hidden sm:block text-xs text-white/60">{text.screensHintDesktop}</p>
        </div>
        <p className="sm:hidden text-xs text-white/60 mb-3">{text.screensHintMobile}</p>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
          {mockupPagesData.map((item, idx) => (
            <article className={`flex-none w-[300px] sm:w-[340px] md:w-[360px] snap-center group glass-card rounded-3xl p-4 reveal-on-scroll stagger-${(idx % 3) + 1}`} key={item.title}>
              <img
                src={item.image}
                alt={`Screenshot ${item.title}`}
                className="w-full h-[400px] sm:h-[460px] md:h-[500px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-slate-900/40 p-1"
                loading="lazy"
              />
              <h3 className="text-base font-bold text-white mt-4">{item.title}</h3>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 reveal-on-scroll">
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="reveal-on-scroll stagger-1">
              <p className="text-3xl font-extrabold text-white">{text.metric1Title}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{text.metric1Desc}</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div className="reveal-on-scroll stagger-2">
              <p className="text-3xl font-extrabold text-white">{text.metric2Title}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{text.metric2Desc}</p>
            </div>
            <div className="hidden md:block w-px h-14 bg-white/15" />
            <div className="reveal-on-scroll stagger-3">
              <p className="text-3xl font-extrabold text-white">{text.metric3Title}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{text.metric3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function TermsPage({ language }: { language: Language }) {
  const sections = termsSectionsByLanguage[language]
  const badge = language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Use'
  const title = language === 'vi' ? 'Điều khoản sử dụng của Ví giấy tờ' : 'Terms of Use for Vi Giay To'
  const updated = language === 'vi' ? 'Cập nhật lần cuối: 29/03/2026' : 'Last updated: March 29, 2026'

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-5 reveal-on-scroll">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          {badge}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
        <p className="text-white/60 text-sm">{updated}</p>

        {sections.map((section, idx) => (
          <section key={section.title} className={`reveal-on-scroll stagger-${idx + 1}`}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <p className="text-white/70 mt-2 text-sm leading-relaxed">{section.desc}</p>
          </section>
        ))}
      </section>
    </main>
  )
}

function PrivacyPage({ language }: { language: Language }) {
  const sections = privacySectionsByLanguage[language]
  const points = language === 'vi' ? privacyPoints : privacyPointsEn
  const badge = language === 'vi' ? 'Quyền riêng tư' : 'Privacy'
  const title =
    language === 'vi' ? 'Chính sách quyền riêng tư của Ví giấy tờ' : 'Privacy Policy for Vi Giay To'
  const updated = language === 'vi' ? 'Cập nhật lần cuối: 29/03/2026' : 'Last updated: March 29, 2026'
  const coreTitle =
    language === 'vi' ? 'Cam kết cốt lõi về quyền riêng tư' : 'Core privacy commitments'

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-5 reveal-on-scroll">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          {badge}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
        <p className="text-white/60 text-sm">{updated}</p>
        <section className="reveal-on-scroll stagger-1">
          <h2 className="text-lg font-bold">{coreTitle}</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-white/70 text-sm leading-relaxed">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        {sections.map((section, idx) => (
          <section key={section.title} className={`reveal-on-scroll stagger-${(idx % 3) + 1}`}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <p className="text-white/70 mt-2 text-sm leading-relaxed">{section.desc}</p>
          </section>
        ))}
      </section>
    </main>
  )
}

function ContactPage({ language }: { language: Language }) {
  const cards = language === 'vi' ? contactCards : contactCardsEn
  const badge = language === 'vi' ? 'Liên hệ' : 'Contact'
  const title = language === 'vi' ? 'Liên hệ với Ví giấy tờ' : 'Contact Vi Giay To'
  const intro =
    language === 'vi'
      ? 'Nếu bạn cần góp ý, báo lỗi hoặc muốn trao đổi thêm về ứng dụng, vui lòng liên hệ qua một trong hai kênh dưới đây.'
      : 'If you want to share feedback, report bugs, or discuss the app, please contact me through one of the channels below.'

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-[8.5rem] md:pt-24 relative z-10">
      <section className="glass-card rounded-3xl p-6 md:p-8 text-white/90 space-y-6 reveal-on-scroll">
        <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
          {badge}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
        <p className="text-white/70 text-sm leading-relaxed">{intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
              className={`glass-card rounded-3xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all reveal-on-scroll stagger-${idx + 1}`}
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
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored === 'vi' || stored === 'en') return stored
    return window.navigator.language.toLowerCase().startsWith('vi') ? 'vi' : 'en'
  })

  const location = useLocation()

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll')
      revealElements.forEach((el) => observer.observe(el))
    }, 120)

    return () => {
      clearTimeout(timeoutId)
      const revealElements = document.querySelectorAll('.reveal-on-scroll')
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [location.pathname, language])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path={HOME_PATH}
          element={
            <AppLayout language={language} setLanguage={setLanguage}>
              <HomePage language={language} />
            </AppLayout>
          }
        />
        <Route
          path={TERMS_PATH}
          element={
            <AppLayout language={language} setLanguage={setLanguage}>
              <TermsPage language={language} />
            </AppLayout>
          }
        />
        <Route
          path={PRIVACY_PATH}
          element={
            <AppLayout language={language} setLanguage={setLanguage}>
              <PrivacyPage language={language} />
            </AppLayout>
          }
        />
        <Route
          path={CONTACT_PATH}
          element={
            <AppLayout language={language} setLanguage={setLanguage}>
              <ContactPage language={language} />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
      </Routes>
    </>
  )
}

export default App
