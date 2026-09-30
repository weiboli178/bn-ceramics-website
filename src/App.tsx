import { type CSSProperties, useState } from 'react'
import { ArrowUpRight, Download, Globe2, Menu, X } from 'lucide-react'
import './App.css'

type Lang = 'en' | 'zh'
type Product = { code: string; type: string; zhType: string; size: string; image: string; page: number }

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`
const catalogueUrl = assetUrl('catalogue/bn-daily-stock-29-sep-2026.pdf')
const products: Product[] = [
  { code: '66101', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66101.jpg'), page: 23 },
  { code: '66103', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66103.jpg'), page: 23 },
  { code: '66107', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66107.jpg'), page: 23 },
  { code: '612105', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 1200 mm', image: assetUrl('products/slab-612105.jpg'), page: 25 },
  { code: '40101', type: 'Vitrified Tile', zhType: '玻化砖', size: '400 × 400 mm', image: assetUrl('products/vitrified-40101.jpg'), page: 19 },
  { code: '40105', type: 'Vitrified Tile', zhType: '玻化砖', size: '400 × 400 mm', image: assetUrl('products/vitrified-40105.jpg'), page: 19 },
]

const copy = {
  en: {
    navProducts: 'Products', navCatalogue: 'Catalogue', navCompany: 'Company', navContact: 'Contact', language: '中文',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: 'Tiles made to define a space.',
    heroText: 'A considered collection of wall tiles, floor tiles and polished surfaces for contemporary projects.', heroCta: 'View the catalogue', heroNote: '2026 stock collection · 28 pages',
    introLabel: 'Our collection', introTitle: 'Materials with a quiet, lasting presence.', introText: 'Discover selected tile designs from the current BN Daily Stock book. Each tile card links to the exact page in the product manual.',
    productsLabel: 'Featured designs', productAction: 'View in catalogue', catalogueLabel: 'Complete product manual', catalogueTitle: 'Every pattern. One catalogue.', catalogueText: 'View all current designs, sizes and article codes in the BN Daily Stock product book.', catalogueAction: 'Open PDF catalogue',
    companyLabel: 'BN Ceramics', companyTitle: 'Made for the surfaces people live with.', companyText: 'BN Ceramics produces wall tiles, floor tiles and polished collections for residential, commercial and project applications in Nigeria.', detailOne: 'Wall & decorative tiles', detailTwo: 'Floor tile collections', detailThree: 'Polished tile series',
    contactLabel: 'Contact', contactTitle: 'Let’s talk about your next project.', contactText: 'For catalogue access, availability and business enquiries, contact the BN Ceramics team.', phone: '+234 XXX XXX XXXX', email: 'sales@bnceramics.example', address: 'Company address, Nigeria', contactNote: 'Before publishing, replace every marked placeholder with BN’s official information.', placeholderTag: 'TO BE UPDATED', logoTag: 'LOGO PLACEHOLDER', footer: 'Ceramic surfaces for modern spaces.',
  },
  zh: {
    navProducts: '产品', navCatalogue: '手册', navCompany: '公司', navContact: '联系', language: 'English',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: '用瓷砖定义空间。',
    heroText: '面向现代项目的墙砖、地砖与抛光砖精选系列。', heroCta: '查看产品手册', heroNote: '2026 现货产品系列 · 28 页',
    introLabel: '产品系列', introTitle: '安静、耐看且经得起时间的材质。', introText: '浏览 BN Daily Stock 产品手册中的精选瓷砖。每一张产品卡片均可直接跳转到手册对应页。',
    productsLabel: '精选花色', productAction: '在手册中查看', catalogueLabel: '完整产品手册', catalogueTitle: '全部花色，一本手册。', catalogueText: '在 BN Daily Stock 产品手册中查看现有的全部花色、规格与产品编号。', catalogueAction: '打开 PDF 手册',
    companyLabel: 'BN Ceramics', companyTitle: '为人们生活的空间而打造。', companyText: 'BN Ceramics 在尼日利亚生产墙砖、地砖和抛光砖系列，适用于住宅、商业空间与工程项目。', detailOne: '墙砖与装饰砖', detailTwo: '地砖产品系列', detailThree: '抛光砖系列',
    contactLabel: '联系', contactTitle: '聊聊您的下一个项目。', contactText: '如需产品手册、库存信息或商务咨询，请联系 BN Ceramics 团队。', phone: '+234 XXX XXX XXXX', email: 'sales@bnceramics.example', address: 'Company address, Nigeria', contactNote: '上线前，请将所有带标记的占位内容替换为 BN 正式资料。', placeholderTag: '待补充', logoTag: 'LOGO 待补充', footer: '为现代空间打造的陶瓷表面。',
  },
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]
  const productHref = (page: number) => `${catalogueUrl}#page=${page}`
  const closeMenu = () => setMenuOpen(false)

  const pageImages = {
    '--hero-image': `url("${assetUrl('products/slab-612105.jpg')}")`,
    '--catalogue-image': `url("${assetUrl('products/super-polished-66107.jpg')}")`,
  } as CSSProperties

  return <main style={pageImages}>
    <section id="top" className="hero">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="BN Ceramics home"><span className="brand-mark">BN</span><span>BN Ceramics<small>Nigeria Limited</small></span><b className="placeholder-chip brand-chip">{t.logoTag}</b></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#products" onClick={closeMenu}>{t.navProducts}</a><a href="#catalogue" onClick={closeMenu}>{t.navCatalogue}</a><a href="#company" onClick={closeMenu}>{t.navCompany}</a><a href="#contact" onClick={closeMenu}>{t.navContact}</a>
          <button type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}><Globe2 size={15} /> {t.language}</button>
        </nav>
      </header>
      <div className="hero-content"><p className="overline">{t.heroKicker}</p><h1>{t.heroTitle}</h1><p className="hero-text">{t.heroText}</p><a className="hero-link" href={catalogueUrl} target="_blank" rel="noreferrer">{t.heroCta} <ArrowUpRight size={19} /></a></div>
      <div className="hero-bottom"><span>{t.heroNote}</span><span>01 <i /> 03</span></div>
    </section>

    <section className="intro section-pad"><p className="section-label">{t.introLabel}</p><div><h2>{t.introTitle}</h2><p>{t.introText}</p></div></section>

    <section id="products" className="products section-pad"><div className="product-heading"><p className="section-label">{t.productsLabel}</p><span>06 / 28</span></div><div className="product-grid">
      {products.map((product) => <a className="product" key={product.code} href={productHref(product.page)} target="_blank" rel="noreferrer"><div className="product-image"><img src={product.image} alt={`${product.type} ${product.code}`} /></div><div className="product-meta"><span>{lang === 'en' ? product.type : product.zhType}</span><ArrowUpRight size={18} /></div><h3>{product.code}</h3><p>{product.size}</p><strong>{t.productAction}</strong></a>)}
    </div></section>

    <section id="catalogue" className="catalogue"><div className="catalogue-image" /><div className="catalogue-copy"><p className="section-label">{t.catalogueLabel}</p><h2>{t.catalogueTitle}</h2><p>{t.catalogueText}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">{t.catalogueAction} <Download size={18} /></a></div></section>

    <section id="company" className="company section-pad"><p className="section-label">{t.companyLabel}</p><div className="company-main"><h2>{t.companyTitle}</h2><p>{t.companyText}</p></div><div className="company-list"><span>01&nbsp;&nbsp; {t.detailOne}</span><span>02&nbsp;&nbsp; {t.detailTwo}</span><span>03&nbsp;&nbsp; {t.detailThree}</span></div></section>
    <section id="contact" className="contact section-pad"><p className="section-label">{t.contactLabel}</p><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-items"><a href="tel:+234000000000"><span>{t.phone}</span><b className="placeholder-chip">{t.placeholderTag}</b></a><a href="mailto:sales@bnceramics.example"><span>{t.email}</span><b className="placeholder-chip">{t.placeholderTag}</b></a><span><span>{t.address}</span><b className="placeholder-chip">{t.placeholderTag}</b></span></div><p className="contact-alert">{t.contactNote}</p></div></section>
    <footer><a className="brand" href="#top"><span className="brand-mark">BN</span><span>BN Ceramics<small>Nigeria Limited</small></span></a><p>{t.footer}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">PDF catalogue <ArrowUpRight size={15} /></a></footer>
  </main>
}

export default App
