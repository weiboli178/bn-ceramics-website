import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Globe2, MapPin, Menu, X } from 'lucide-react'
import './App.css'

type Lang = 'en' | 'zh'
type Tile = { code: string; type: string; zhType: string; size: string; image: string; page: number }

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`
const catalogueUrl = assetUrl('catalogue/bn-daily-stock-29-sep-2026.pdf')
const address = 'Before Niger Bridge, 168 Ajaokuta - Ayangba Road Express Way, Itobe 263106, Kogi'
const mapsUrl = 'https://www.google.com/maps/place/BN+Ceramics/@7.4472976,6.6799043,17z/data=!3m1!4b1!4m6!3m5!1s0x1045eb35e40345b1:0x4cbd71d71d18944c!8m2!3d7.4472976!4d6.6799043!16s%2Fg%2F11fkdd98gq?entry=ttu'
const mapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.162223431094!2d6.6799043!3d7.4472976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1045eb35e40345b1%3A0x4cbd71d71d18944c!2sBN%20Ceramics!5e0!3m2!1szh-CN!2sng!4v1791038479401!5m2!1szh-CN!2sng'
const catalogueCards: Tile[] = [
  { code: '66107', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66107.jpg'), page: 23 },
  { code: '612105', type: 'Large Format', zhType: '大规格砖', size: '600 × 1200 mm', image: assetUrl('products/slab-612105.jpg'), page: 25 },
  { code: '66101', type: 'Super Polished', zhType: '超亮抛光砖', size: '600 × 600 mm', image: assetUrl('products/super-polished-66101.jpg'), page: 23 },
  { code: '40101', type: 'Vitrified Tile', zhType: '玻化砖', size: '400 × 400 mm', image: assetUrl('products/vitrified-40101.jpg'), page: 19 },
  { code: '612101', type: 'Large Format', zhType: '大规格砖', size: '600 × 1200 mm', image: assetUrl('products/slab-612101.jpg'), page: 25 },
  { code: '40105', type: 'Vitrified Tile', zhType: '玻化砖', size: '400 × 400 mm', image: assetUrl('products/vitrified-40105.jpg'), page: 19 },
]

const copy = {
  en: {
    navProducts: 'Collections', navCatalogue: 'Catalogue', navCompany: 'Company', navContact: 'Contact', language: '中文',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>SURFACES THAT<br />SHAPE A PLACE.</>, heroText: 'CERAMIC COLLECTIONS MADE FOR THE RHYTHM OF CONTEMPORARY NIGERIAN SPACES.', heroCta: 'Explore the collection', heroIndex: 'Scroll to explore',
    materialLabel: 'BN Ceramics / Nigeria', materialTitle: 'MATERIAL IS THE FIRST THING A SPACE ASKS YOU TO FEEL.', materialText: 'We create tile collections with a quiet visual presence, built for the daily movement, light and atmosphere of the places people inhabit.',
    collectionLabel: 'The 2026 daily stock', collectionTitle: 'SURFACES, ORGANIZED FOR YOUR NEXT SELECTION.', collectionText: 'Browse the current BN tile ranges by format and finish. Every catalogue card opens directly to its original product page.', selectedTile: 'Selected tile', viewInBook: 'View in catalogue', seeAll: 'Open the full catalogue',
    catalogueLabel: 'Full product book', catalogueTitle: 'THE COMPLETE RANGE, ONE CLEAR VIEW.', catalogueText: '28 pages of patterns, sizes and product codes — ready for your next selection.', catalogueAction: 'Open PDF catalogue', catalogueMeta: '28 pages · product codes · sizes',
    companyLabel: 'A considered material partner', companyTitle: 'MADE FOR THE SPACES PEOPLE RETURN TO.', companyText: 'BN Ceramics produces wall tiles, floor tiles and polished collections for residential, commercial and project applications in Nigeria.', statOne: 'Wall & decorative tiles', statTwo: 'Floor tile collections', statThree: 'Polished tile series',
    contactLabel: 'Visit or get in touch', contactTitle: 'START WITH THE RIGHT SURFACE.', contactText: 'For catalogue access, availability and business enquiries, contact the BN Ceramics team.', addressTitle: 'BN Ceramics Industry Nigeria Limited', mapAction: 'Open in Google Maps', socialLabel: 'Social channels', tiktok: 'TikTok', facebook: 'Facebook QR', placeholderTag: 'TO BE UPDATED', footer: 'Ceramic surfaces for modern spaces.',
  },
  zh: {
    navProducts: '产品系列', navCatalogue: '产品手册', navCompany: '公司', navContact: '联系', language: 'English',
    heroKicker: 'BN Ceramics Industry Nigeria Limited', heroTitle: <>用表面材质<br />塑造空间。</>, heroText: '为当代尼日利亚空间打造的瓷砖产品系列。', heroCta: '浏览产品系列', heroIndex: '向下浏览',
    materialLabel: 'BN Ceramics / Nigeria', materialTitle: '材质，是一个空间最先让人感受到的事物。', materialText: '我们打造安静耐看的瓷砖系列，让材质经得起日常流动、光线与人们所处空间的检验。',
    collectionLabel: '2026 现货产品', collectionTitle: '为下一次选品，整理好每一种表面。', collectionText: '按规格与工艺浏览当前 BN 瓷砖系列。每张目录卡片均可直接跳转到 PDF 的对应产品页。', selectedTile: '精选产品', viewInBook: '在手册中查看', seeAll: '打开完整产品手册',
    catalogueLabel: '完整产品手册', catalogueTitle: '完整产品范围，一目了然。', catalogueText: '28 页花色、规格与产品编号，为下一步选品准备就绪。', catalogueAction: '打开 PDF 手册', catalogueMeta: '28 页 · 产品编号 · 规格',
    companyLabel: '专业的材质伙伴', companyTitle: '为人们愿意反复回到的空间而打造。', companyText: 'BN Ceramics 在尼日利亚生产墙砖、地砖和抛光砖系列，适用于住宅、商业空间与工程项目。', statOne: '墙砖与装饰砖', statTwo: '地砖产品系列', statThree: '抛光砖系列',
    contactLabel: '到访或联系', contactTitle: '从合适的表面材质开始。', contactText: '如需产品手册、库存信息或商务咨询，请联系 BN Ceramics 团队。', addressTitle: 'BN Ceramics Industry Nigeria Limited', mapAction: '在 Google 地图中打开', socialLabel: '社交媒体', tiktok: 'TikTok', facebook: 'Facebook 二维码', placeholderTag: '待补充', footer: '为现代空间打造的陶瓷表面。',
  },
}

function BrandMark({ className = '' }: { className?: string }) {
  const bTiles = [[4, 4], [13, 4], [22, 4], [4, 13], [31, 13], [4, 22], [13, 22], [22, 22], [4, 31], [31, 31], [4, 40], [13, 40], [22, 40]]
  const nTiles = [[57, 4], [93, 4], [57, 13], [66, 13], [93, 13], [57, 22], [75, 22], [93, 22], [57, 31], [84, 31], [93, 31], [57, 40], [93, 40]]
  return <svg className={`brand-mark ${className}`} viewBox="0 0 106 48" role="img" aria-label="BN Ceramics logo">{[...bTiles, ...nTiles].map(([x, y], index) => <rect className="logo-tile" style={{ '--tile-index': index } as CSSProperties} key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx=".8" fill="currentColor" />)}</svg>
}

function QrPlaceholder({ label, tag }: { label: string; tag: string }) {
  return <div className="social-qr"><div className="qr-art" aria-hidden="true"><i /><i /><i /><i /></div><div><strong>{label}</strong><span>{tag}</span></div></div>
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMaterial, setActiveMaterial] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const t = copy[lang]
  const materialSlides = [
    { image: assetUrl('images/bn-material-space-v1.png'), alt: 'Contemporary interior finished with large format ceramic surfaces', label: '01 / MATERIAL, LIGHT, SCALE', zhLabel: '01 / 材质、光线、尺度' },
    { image: assetUrl('images/bn-material-living-v2.png'), alt: 'Sunlit contemporary living room with polished ceramic floor tiles', label: '02 / LIVING WITH MATERIAL', zhLabel: '02 / 材质融入生活' },
    { image: assetUrl('images/bn-material-bath-v2.png'), alt: 'Boutique bathroom with dark porcelain wall and floor tiles', label: '03 / WALLS, WATER, TEXTURE', zhLabel: '03 / 墙面、水汽、肌理' },
  ]
  const productHref = (page: number) => `${catalogueUrl}#page=${page}`
  const closeMenu = () => setMenuOpen(false)
  const selectMaterial = (index: number) => setActiveMaterial((index + materialSlides.length) % materialSlides.length)
  useEffect(() => {
    const timer = window.setInterval(() => setActiveMaterial((index) => (index + 1) % materialSlides.length), 5600)
    return () => window.clearInterval(timer)
  }, [materialSlides.length])
  const moveHero = (event: PointerEvent<HTMLElement>) => {
    const hero = heroRef.current
    if (!hero) return
    const bounds = hero.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 20
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 14
    hero.style.setProperty('--pointer-x', `${x}px`)
    hero.style.setProperty('--pointer-y', `${y}px`)
    hero.style.setProperty('--pointer-x-back', `${x * -.25}px`)
    hero.style.setProperty('--pointer-y-back', `${y * -.25}px`)
    hero.style.setProperty('--pointer-x-copy', `${x * -.12}px`)
    hero.style.setProperty('--pointer-y-copy', `${y * -.12}px`)
  }
  const resetHero = () => {
    heroRef.current?.style.setProperty('--pointer-x', '0px')
    heroRef.current?.style.setProperty('--pointer-y', '0px')
    heroRef.current?.style.setProperty('--pointer-x-back', '0px')
    heroRef.current?.style.setProperty('--pointer-y-back', '0px')
    heroRef.current?.style.setProperty('--pointer-x-copy', '0px')
    heroRef.current?.style.setProperty('--pointer-y-copy', '0px')
  }

  return <main>
    <section ref={heroRef} id="top" className="hero hero-interactive" onPointerMove={moveHero} onPointerLeave={resetHero} style={{ backgroundImage: `url("${assetUrl('images/bn-hero-lobby-v1.png')}")` }}>
      <header className="nav-wrap"><a className="brand" href="#top" aria-label="BN Ceramics home"><BrandMark /><span>BN Ceramics<small>Nigeria Limited</small></span></a><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#collections" onClick={closeMenu}>{t.navProducts}</a><a href="#catalogue" onClick={closeMenu}>{t.navCatalogue}</a><a href="#company" onClick={closeMenu}>{t.navCompany}</a><a href="#contact" onClick={closeMenu}>{t.navContact}</a><button type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}><Globe2 size={15} /> {t.language}</button></nav></header>
      <div className="hero-monogram" aria-hidden="true"><BrandMark className="hero-monogram-mark" /></div>
      <div className="hero-imprint" aria-hidden="true"><BrandMark className="hero-imprint-mark" /></div>
      <div className="hero-content"><p className="overline hero-enter one">{t.heroKicker}</p><h1 className="hero-enter two">{t.heroTitle}</h1><p className="hero-text hero-enter three">{t.heroText}</p><a className="hero-cta hero-enter four" href="#collections">{t.heroCta} <ArrowDown size={17} /></a></div><div className="hero-bottom"><span>BN CERAMICS · KOGI STATE · NIGERIA</span><a href="#collections">{t.heroIndex} <ArrowDown size={14} /></a></div>
    </section>

    <section className="material-story section-pad reveal"><div className="material-carousel" aria-label="BN Ceramics material spaces">{materialSlides.map((slide, index) => <img className={index === activeMaterial ? 'active' : ''} key={slide.image} src={slide.image} alt={slide.alt} />)}<div className="material-carousel-meta"><span>{String(activeMaterial + 1).padStart(2, '0')} / 03</span><span>{lang === 'en' ? materialSlides[activeMaterial].label.split(' / ')[1] : materialSlides[activeMaterial].zhLabel.split(' / ')[1]}</span></div><div className="material-carousel-nav"><button type="button" onClick={() => selectMaterial(activeMaterial - 1)} aria-label="Previous material image"><ChevronLeft size={18} /></button><div>{materialSlides.map((slide, index) => <button type="button" className={index === activeMaterial ? 'active' : ''} key={slide.image} onClick={() => selectMaterial(index)} aria-label={`Show material image ${index + 1}`} />)}</div><button type="button" onClick={() => selectMaterial(activeMaterial + 1)} aria-label="Next material image"><ChevronRight size={18} /></button></div></div><div className="material-copy"><p className="section-label">{t.materialLabel}</p><h2>{t.materialTitle}</h2><p>{t.materialText}</p><span className="material-note">{lang === 'en' ? materialSlides[activeMaterial].label : materialSlides[activeMaterial].zhLabel}</span></div></section>

    <section id="company" className="capability reveal" style={{ backgroundImage: `url("${assetUrl('images/bn-quality-line-v1.png')}")` }}><div className="capability-inner"><div className="capability-card"><p className="section-label">{t.companyLabel}</p><h2>{t.companyTitle}</h2><p>{t.companyText}</p></div><div className="capability-list"><span><b>01</b> {t.statOne}</span><span><b>02</b> {t.statTwo}</span><span><b>03</b> {t.statThree}</span></div></div></section>

    <section id="collections" className="catalogue-library reveal"><div id="catalogue" className="catalogue-library-inner"><div className="catalogue-library-head"><div><p className="section-label">{t.collectionLabel}</p><h2>{t.collectionTitle}</h2><p>{t.collectionText}</p></div></div><div className="catalogue-library-grid">{catalogueCards.map((tile, index) => <a className="catalogue-card" key={tile.code} href={productHref(tile.page)} target="_blank" rel="noreferrer"><div className="catalogue-card-cover" style={{ backgroundImage: `linear-gradient(145deg, rgba(9,9,7,.08), rgba(9,9,7,.68)), url("${tile.image}")` }}><span>BN CERAMICS</span><strong>{tile.size.replace(' mm', '')}<small>{lang === 'en' ? tile.type : tile.zhType}</small></strong><i>DAILY STOCK · 2026</i></div><div className="catalogue-card-copy"><span className="catalogue-card-accent" /><h3>{tile.size.replace(' mm', '')} <em>{tile.code}</em></h3><p>{lang === 'en' ? tile.type : tile.zhType}</p><div><small>{String(index + 1).padStart(2, '0')} · {t.catalogueLabel}</small><b>{t.catalogueAction} <ArrowUpRight size={15} /></b></div></div></a>)}</div><a className="catalogue-library-all" href={catalogueUrl} target="_blank" rel="noreferrer">{t.seeAll} <ArrowUpRight size={18} /></a></div></section>

    <section id="contact" className="contact reveal"><div className="contact-top section-pad"><div><p className="section-label">{t.contactLabel}</p><h2>{t.contactTitle}</h2></div><div className="contact-details"><p>{t.contactText}</p><div className="address-copy"><p>{address}</p><a href={mapsUrl} target="_blank" rel="noreferrer">{t.mapAction} <ArrowUpRight size={16} /></a></div><div className="social-list"><p>{t.socialLabel}</p><div className="social-qr social-qr-live"><img src={assetUrl('images/bn-tiktok-qr.png')} alt="TikTok QR code for BN Ceramics" /><div><strong>{t.tiktok}</strong><span>@bnceramics3</span></div></div><QrPlaceholder label={t.facebook} tag={t.placeholderTag} /></div></div></div><a className="map-card map-card-wide" href={mapsUrl} target="_blank" rel="noreferrer"><iframe title="BN Ceramics location map" src={mapsEmbedUrl} loading="lazy" /><span><MapPin size={17} /> {t.addressTitle}<ArrowUpRight size={17} /></span></a></section>
    <footer><a className="brand" href="#top"><BrandMark /><span>BN Ceramics<small>Nigeria Limited</small></span></a><p>{t.footer}</p><a href={catalogueUrl} target="_blank" rel="noreferrer">PDF catalogue <ArrowUpRight size={15} /></a></footer>
  </main>
}

export default App
