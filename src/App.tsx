import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Globe2, Menu, X } from 'lucide-react'
import './App.css'

type Lang = 'en' | 'zh'
type Collection = { number: string; title: string; zhTitle: string; detail: string; zhDetail: string; image: string; page: number }

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`
const catalogueUrl = assetUrl('catalogue/bn-daily-stock-29-sep-2026.pdf')
const collections: Collection[] = [
  { number: '01', title: 'Wall Tiles', zhTitle: '墙砖系列', detail: 'Decorative surfaces for interiors', zhDetail: '适用于室内空间的装饰表面', image: assetUrl('products/vitrified-40101.jpg'), page: 19 },
  { number: '02', title: 'Floor Tiles', zhTitle: '地砖系列', detail: 'Built for daily movement', zhDetail: '为日常使用而打造', image: assetUrl('products/super-polished-66103.jpg'), page: 23 },
  { number: '03', title: 'Large Format', zhTitle: '大规格系列', detail: 'A calmer, continuous finish', zhDetail: '营造连贯而开阔的视觉效果', image: assetUrl('products/slab-612105.jpg'), page: 25 },
]

const copy = {
  en: {
    navProducts: 'Collections', navCatalogue: 'Catalogue', navCompany: 'Company', navContact: 'Contact', language: '中文',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>Surfaces that<br />shape a place.</>, heroText: 'Ceramic collections made for the rhythm of contemporary Nigerian spaces.', heroCta: 'Explore the collection', heroIndex: 'Scroll to explore',
    visualTag: 'TEMPORARY VISUAL · REPLACE WITH BN PROJECT PHOTOGRAPHY',
    manifestoLabel: 'BN Ceramics / Nigeria', manifestoTitle: 'Material is the first thing a space asks you to feel.', manifestoText: 'From quiet residences to high-traffic commercial interiors, our tile collections offer lasting character, practical performance and a considered finish.',
    collectionsLabel: 'Selected collections', collectionsIntro: 'A material language for every scale of project.', viewCollection: 'View in catalogue',
    catalogueLabel: '2026 Daily Stock', catalogueTitle: 'The current collection, in your hands.', catalogueText: 'A complete, mobile-friendly product book with article codes, formats and the tile designs currently available from BN Ceramics.', catalogueAction: 'Open PDF catalogue', catalogueMeta: '28 pages · product codes · sizes',
    companyLabel: 'A considered material partner', companyTitle: 'Made for the spaces people return to.', companyText: 'BN Ceramics produces wall tiles, floor tiles and polished collections for residential, commercial and project applications in Nigeria.', statOne: 'Wall & decorative tiles', statTwo: 'Floor tile collections', statThree: 'Polished tile series',
    contactLabel: 'Make contact', contactTitle: 'Let’s begin with the right surface.', contactText: 'For catalogue access, availability and business enquiries, contact the BN Ceramics team.', phone: '+234 XXX XXX XXXX', email: 'sales@bnceramics.example', address: 'Company address, Nigeria', contactNote: 'Replace every marked placeholder with BN’s official information before publishing.', placeholderTag: 'TO BE UPDATED', logoTag: 'LOGO PLACEHOLDER', footer: 'Ceramic surfaces for modern spaces.',
  },
  zh: {
    navProducts: '产品系列', navCatalogue: '产品手册', navCompany: '公司', navContact: '联系', language: 'English',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>用表面材质<br />塑造空间。</>, heroText: '为当代尼日利亚空间打造的瓷砖产品系列。', heroCta: '浏览产品系列', heroIndex: '向下浏览',
    visualTag: '临时视觉图 · 后续请替换为 BN 项目实拍图',
    manifestoLabel: 'BN Ceramics / Nigeria', manifestoTitle: '材质，是一个空间最先让人感受到的事物。', manifestoText: '无论是安静的住宅，还是人流频繁的商业空间，BN 的瓷砖系列都提供持久的质感、实用性能与考究的完成效果。',
    collectionsLabel: '精选系列', collectionsIntro: '为不同尺度的项目构建材质语言。', viewCollection: '在手册中查看',
    catalogueLabel: '2026 现货产品', catalogueTitle: '当前产品系列，尽在一本手册。', catalogueText: '查看适用于手机浏览的完整产品手册，其中包含产品编号、规格以及 BN Ceramics 现有花色。', catalogueAction: '打开 PDF 手册', catalogueMeta: '28 页 · 产品编号 · 规格',
    companyLabel: '专业的材质伙伴', companyTitle: '为人们愿意反复回到的空间而打造。', companyText: 'BN Ceramics 在尼日利亚生产墙砖、地砖和抛光砖系列，适用于住宅、商业空间与工程项目。', statOne: '墙砖与装饰砖', statTwo: '地砖产品系列', statThree: '抛光砖系列',
    contactLabel: '建立联系', contactTitle: '从合适的表面材质开始。', contactText: '如需产品手册、库存信息或商务咨询，请联系 BN Ceramics 团队。', phone: '+234 XXX XXX XXXX', email: 'sales@bnceramics.example', address: 'Company address, Nigeria', contactNote: '上线前，请将所有带标记的占位内容替换为 BN 正式资料。', placeholderTag: '待补充', logoTag: 'LOGO 待补充', footer: '为现代空间打造的陶瓷表面。',
  },
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]
  const closeMenu = () => setMenuOpen(false)
  const productHref = (page: number) => `${catalogueUrl}#page=${page}`
  const catalogueCoverStyle = { backgroundImage: `linear-gradient(135deg, rgba(25,24,21,.28), rgba(0,0,0,.58)), url("${assetUrl('products/super-polished-66107.jpg')}")` }

  return <main>
    <section id="top" className="hero" style={{ backgroundImage: `url("${assetUrl('images/bn-hero-lobby-v1.png')}")` }}>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="BN Ceramics home"><span className="brand-mark">BN</span><span>BN Ceramics<small>Nigeria Limited</small></span><b className="placeholder-chip brand-chip">{t.logoTag}</b></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#collections" onClick={closeMenu}>{t.navProducts}</a><a href="#catalogue" onClick={closeMenu}>{t.navCatalogue}</a><a href="#company" onClick={closeMenu}>{t.navCompany}</a><a href="#contact" onClick={closeMenu}>{t.navContact}</a>
          <button type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}><Globe2 size={15} /> {t.language}</button>
        </nav>
      </header>
      <div className="hero-content">
        <p className="overline hero-enter one">{t.heroKicker}</p><h1 className="hero-enter two">{t.heroTitle}</h1><p className="hero-text hero-enter three">{t.heroText}</p>
        <a className="hero-cta hero-enter four" href="#collections">{t.heroCta} <ArrowDown size={17} /></a>
      </div>
      <div className="hero-bottom"><span className="visual-tag">{t.visualTag}</span><a href="#collections">{t.heroIndex} <ArrowDown size={14} /></a></div>
    </section>

    <section className="manifesto section-pad reveal"><p className="section-label">{t.manifestoLabel}</p><div><h2>{t.manifestoTitle}</h2><p>{t.manifestoText}</p></div></section>

    <section id="collections" className="collections section-pad">
      <div className="collections-heading reveal"><p className="section-label">{t.collectionsLabel}</p><h2>{t.collectionsIntro}</h2></div>
      <div className="collection-list">
        {collections.map((collection, index) => <a className={`collection-card reveal delay-${index + 1}`} key={collection.number} href={productHref(collection.page)} target="_blank" rel="noreferrer" style={{ backgroundImage: `url("${collection.image}")` }}>
          <span className="collection-number">{collection.number}</span><div className="collection-copy"><p>{lang === 'en' ? collection.detail : collection.zhDetail}</p><h3>{lang === 'en' ? collection.title : collection.zhTitle}</h3><span>{t.viewCollection} <ArrowUpRight size={17} /></span></div>
        </a>)}
      </div>
    </section>

    <section id="catalogue" className="catalogue reveal"><div className="catalogue-cover" style={catalogueCoverStyle}><span>BN</span><p>DAILY STOCK<br />2026</p><i /></div><div className="catalogue-copy"><p className="section-label">{t.catalogueLabel}</p><h2>{t.catalogueTitle}</h2><p>{t.catalogueText}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">{t.catalogueAction} <Download size={18} /></a><small>{t.catalogueMeta}</small></div></section>

    <section id="company" className="company section-pad reveal"><p className="section-label">{t.companyLabel}</p><div className="company-main"><h2>{t.companyTitle}</h2><p>{t.companyText}</p></div><div className="company-list"><span>01&nbsp;&nbsp; {t.statOne}</span><span>02&nbsp;&nbsp; {t.statTwo}</span><span>03&nbsp;&nbsp; {t.statThree}</span></div></section>
    <section id="contact" className="contact section-pad reveal"><p className="section-label">{t.contactLabel}</p><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-items"><a href="tel:+234000000000"><span>{t.phone}</span><b className="placeholder-chip">{t.placeholderTag}</b></a><a href="mailto:sales@bnceramics.example"><span>{t.email}</span><b className="placeholder-chip">{t.placeholderTag}</b></a><span><span>{t.address}</span><b className="placeholder-chip">{t.placeholderTag}</b></span></div><p className="contact-alert">{t.contactNote}</p></div></section>
    <footer><a className="brand" href="#top"><span className="brand-mark">BN</span><span>BN Ceramics<small>Nigeria Limited</small></span></a><p>{t.footer}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">PDF catalogue <ArrowUpRight size={15} /></a></footer>
  </main>
}

export default App
