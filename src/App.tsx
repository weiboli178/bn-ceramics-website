import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Globe2, MapPin, Menu, X } from 'lucide-react'
import './App.css'

type Lang = 'en' | 'zh'
type Tile = { code: string; type: string; zhType: string; size: string; image: string; page: number }

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`
const catalogueUrl = assetUrl('catalogue/bn-daily-stock-29-sep-2026.pdf')
const address = 'No.168, Ajaokuta-Itobi Express Way, before Naija Bridge, Ajaokuta, Kogi State, Nigeria'
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
const tiles: Tile[] = [
  { code: '66107', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66107.jpg'), page: 23 },
  { code: '612105', type: 'Large Format', zhType: '大规格砖', size: '600 × 1200 mm', image: assetUrl('products/slab-612105.jpg'), page: 25 },
  { code: '66101', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66101.jpg'), page: 23 },
  { code: '40101', type: 'Vitrified Tile', zhType: '玻化砖', size: '400 × 400 mm', image: assetUrl('products/vitrified-40101.jpg'), page: 19 },
]

const copy = {
  en: {
    navProducts: 'Collections', navCatalogue: 'Catalogue', navCompany: 'Company', navContact: 'Contact', language: '中文',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>SURFACES THAT<br />SHAPE A PLACE.</>, heroText: 'CERAMIC COLLECTIONS MADE FOR THE RHYTHM OF CONTEMPORARY NIGERIAN SPACES.', heroCta: 'Explore the collection', heroIndex: 'Scroll to explore',
    materialLabel: 'BN Ceramics / Nigeria', materialTitle: 'MATERIAL IS THE FIRST THING A SPACE ASKS YOU TO FEEL.', materialText: 'We create tile collections with a quiet visual presence, built for the daily movement, light and atmosphere of the places people inhabit.',
    collectionLabel: 'The 2026 daily stock', collectionTitle: 'A MATERIAL LANGUAGE, SET IN MOTION.', collectionText: 'A selection from the current BN Daily Stock book. Every surface shown here links directly to its original product page.', selectedTile: 'Selected tile', viewInBook: 'View in catalogue', seeAll: 'Open the full catalogue',
    catalogueLabel: '28-page product book', catalogueTitle: 'EVERY PATTERN. ONE CATALOGUE.', catalogueText: 'Explore the current designs, sizes and article codes in the BN Daily Stock product book.', catalogueAction: 'Open PDF catalogue', catalogueMeta: '28 pages · product codes · sizes',
    companyLabel: 'A considered material partner', companyTitle: 'MADE FOR THE SPACES PEOPLE RETURN TO.', companyText: 'BN Ceramics produces wall tiles, floor tiles and polished collections for residential, commercial and project applications in Nigeria.', statOne: 'Wall & decorative tiles', statTwo: 'Floor tile collections', statThree: 'Polished tile series',
    contactLabel: 'Visit or get in touch', contactTitle: 'START WITH THE RIGHT SURFACE.', contactText: 'For catalogue access, availability and business enquiries, contact the BN Ceramics team.', addressTitle: 'BN Ceramics Industry Nigeria Limited', socialLabel: 'Social channels', tiktok: 'TikTok QR', facebook: 'Facebook QR', placeholderTag: 'TO BE UPDATED', footer: 'Ceramic surfaces for modern spaces.',
  },
  zh: {
    navProducts: '产品系列', navCatalogue: '产品手册', navCompany: '公司', navContact: '联系', language: 'English',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>用表面材质<br />塑造空间。</>, heroText: '为当代尼日利亚空间打造的瓷砖产品系列。', heroCta: '浏览产品系列', heroIndex: '向下浏览',
    materialLabel: 'BN Ceramics / Nigeria', materialTitle: '材质，是一个空间最先让人感受到的事物。', materialText: '我们打造安静耐看的瓷砖系列，让材质经得起日常流动、光线与人们所处空间的检验。',
    collectionLabel: '2026 现货产品', collectionTitle: '为项目构建完整的材质语言。', collectionText: '精选自当前 BN Daily Stock 产品手册。这里展示的每一款花色均可直接跳转至手册原页。', selectedTile: '精选产品', viewInBook: '在手册中查看', seeAll: '打开完整产品手册',
    catalogueLabel: '28 页产品手册', catalogueTitle: '全部花色，一本手册。', catalogueText: '在 BN Daily Stock 产品手册中查看现有的全部花色、规格与产品编号。', catalogueAction: '打开 PDF 手册', catalogueMeta: '28 页 · 产品编号 · 规格',
    companyLabel: '专业的材质伙伴', companyTitle: '为人们愿意反复回到的空间而打造。', companyText: 'BN Ceramics 在尼日利亚生产墙砖、地砖和抛光砖系列，适用于住宅、商业空间与工程项目。', statOne: '墙砖与装饰砖', statTwo: '地砖产品系列', statThree: '抛光砖系列',
    contactLabel: '到访或联系', contactTitle: '从合适的表面材质开始。', contactText: '如需产品手册、库存信息或商务咨询，请联系 BN Ceramics 团队。', addressTitle: 'BN Ceramics Industry Nigeria Limited', socialLabel: '社交媒体', tiktok: 'TikTok 二维码', facebook: 'Facebook 二维码', placeholderTag: '待补充', footer: '为现代空间打造的陶瓷表面。',
  },
}

function BrandMark() {
  const bTiles = [[4, 4], [13, 4], [22, 4], [4, 13], [31, 13], [4, 22], [13, 22], [22, 22], [4, 31], [31, 31], [4, 40], [13, 40], [22, 40]]
  const nTiles = [[57, 4], [93, 4], [57, 13], [66, 13], [93, 13], [57, 22], [75, 22], [93, 22], [57, 31], [84, 31], [93, 31], [57, 40], [93, 40]]
  return <svg className="brand-mark" viewBox="0 0 106 48" role="img" aria-label="BN Ceramics logo">{bTiles.map(([x, y]) => <rect key={`b-${x}-${y}`} x={x} y={y} width="7" height="7" rx=".8" fill="currentColor" />)}{nTiles.map(([x, y]) => <rect key={`n-${x}-${y}`} x={x} y={y} width="7" height="7" rx=".8" fill="currentColor" />)}</svg>
}

function QrPlaceholder({ label, tag }: { label: string; tag: string }) {
  return <div className="social-qr"><div className="qr-art" aria-hidden="true"><i /><i /><i /><i /></div><div><strong>{label}</strong><span>{tag}</span></div></div>
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]
  const productHref = (page: number) => `${catalogueUrl}#page=${page}`
  const closeMenu = () => setMenuOpen(false)

  return <main>
    <section id="top" className="hero" style={{ backgroundImage: `url("${assetUrl('images/bn-hero-lobby-v1.png')}")` }}>
      <header className="nav-wrap"><a className="brand" href="#top" aria-label="BN Ceramics home"><BrandMark /><span>BN Ceramics<small>Nigeria Limited</small></span></a><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#collections" onClick={closeMenu}>{t.navProducts}</a><a href="#catalogue" onClick={closeMenu}>{t.navCatalogue}</a><a href="#company" onClick={closeMenu}>{t.navCompany}</a><a href="#contact" onClick={closeMenu}>{t.navContact}</a><button type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}><Globe2 size={15} /> {t.language}</button></nav></header>
      <div className="hero-content"><p className="overline hero-enter one">{t.heroKicker}</p><h1 className="hero-enter two">{t.heroTitle}</h1><p className="hero-text hero-enter three">{t.heroText}</p><a className="hero-cta hero-enter four" href="#collections">{t.heroCta} <ArrowDown size={17} /></a></div><div className="hero-bottom"><span>BN CERAMICS · KOGI STATE · NIGERIA</span><a href="#collections">{t.heroIndex} <ArrowDown size={14} /></a></div>
    </section>

    <section className="material-story section-pad reveal"><div className="material-image"><img src={assetUrl('images/bn-material-space-v1.png')} alt="Contemporary interior finished with large format ceramic surfaces" /></div><div className="material-copy"><p className="section-label">{t.materialLabel}</p><h2>{t.materialTitle}</h2><p>{t.materialText}</p><span className="material-note">01 / MATERIAL, LIGHT, SCALE</span></div></section>

    <section id="collections" className="collections section-pad"><div className="collections-heading reveal"><p className="section-label">{t.collectionLabel}</p><div><h2>{t.collectionTitle}</h2><p>{t.collectionText}</p></div></div><div className="product-showcase reveal">
      <a className="featured-tile" href={productHref(tiles[0].page)} target="_blank" rel="noreferrer"><img src={tiles[0].image} alt={`${tiles[0].type} ${tiles[0].code}`} /><div><span>{t.selectedTile} · 01</span><h3>{tiles[0].code}</h3><p>{lang === 'en' ? tiles[0].type : tiles[0].zhType} · {tiles[0].size}</p><b>{t.viewInBook} <ArrowUpRight size={16} /></b></div></a>
      <div className="tile-index">{tiles.slice(1).map((tile, index) => <a className="tile-index-card" key={tile.code} href={productHref(tile.page)} target="_blank" rel="noreferrer"><img src={tile.image} alt={`${tile.type} ${tile.code}`} /><span>0{index + 2}</span><div><strong>{tile.code}</strong><small>{lang === 'en' ? tile.type : tile.zhType}</small></div><ArrowUpRight size={17} /></a>)}</div>
    </div><a className="all-catalogue-link reveal" href={catalogueUrl} target="_blank" rel="noreferrer">{t.seeAll} <ArrowUpRight size={18} /></a></section>

    <section id="catalogue" className="catalogue reveal"><div className="catalogue-cover" style={{ backgroundImage: `linear-gradient(135deg, rgba(25,24,21,.28), rgba(0,0,0,.58)), url("${assetUrl('products/super-polished-66107.jpg')}")` }}><BrandMark /><p>DAILY STOCK<br />2026</p><i /></div><div className="catalogue-copy"><p className="section-label">{t.catalogueLabel}</p><h2>{t.catalogueTitle}</h2><p>{t.catalogueText}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">{t.catalogueAction} <Download size={18} /></a><small>{t.catalogueMeta}</small></div></section>

    <section id="company" className="company reveal"><div className="company-image"><img src={assetUrl('images/bn-quality-line-v1.png')} alt="Ceramic tile quality inspection line" /></div><div className="company-copy"><p className="section-label">{t.companyLabel}</p><h2>{t.companyTitle}</h2><p>{t.companyText}</p><div className="company-list"><span>01&nbsp;&nbsp; {t.statOne}</span><span>02&nbsp;&nbsp; {t.statTwo}</span><span>03&nbsp;&nbsp; {t.statThree}</span></div></div></section>

    <section id="contact" className="contact section-pad reveal"><p className="section-label">{t.contactLabel}</p><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-layout"><a className="map-card" href={mapsUrl} target="_blank" rel="noreferrer"><iframe title="BN Ceramics location map" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" /><span><MapPin size={17} /> {t.addressTitle}<ArrowUpRight size={17} /></span></a><div className="address-copy"><p>{address}</p><a href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={16} /></a><div className="social-list"><p>{t.socialLabel}</p><QrPlaceholder label={t.tiktok} tag={t.placeholderTag} /><QrPlaceholder label={t.facebook} tag={t.placeholderTag} /></div></div></div></div></section>
    <footer><a className="brand" href="#top"><BrandMark /><span>BN Ceramics<small>Nigeria Limited</small></span></a><p>{t.footer}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">PDF catalogue <ArrowUpRight size={15} /></a></footer>
  </main>
}

export default App
