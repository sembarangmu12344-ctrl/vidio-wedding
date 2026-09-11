import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './JavaneseElegantTemplate.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══ DEFAULTS ═════════════════════════════════════════════ */
const DEFAULTS = {
  groom: 'Diky', bride: 'Yuni',
  date: '21 . 05 . 2026', hashtag: '#DikyLovesYuni',
  groomFull: 'Raden Mas Diky Pratama Putra',
  brideFull: 'Raden Ayu Yuni Anggraini Putri',
  groomParents: 'Putra dari Bapak Ahmad Wijaya & Ibu Siti Nurhaliza',
  brideParents: 'Putri dari Bapak Budi Santoso & Ibu Dewi Sartika',
  romantic: '"Dua jiwa, satu takdir. Setiap detik bersamamu adalah anugerah yang tak ternilai."',
  story: 'Pertemuan kami dimulai dari sebuah kebetulan indah di sebuah acara keluarga. Dari situ, kami menyadari bahwa jodoh memang sudah digariskan oleh Yang Maha Kuasa.',
  akadDate: 'Sabtu, 21 Mei 2026', akadTime: '08.00 – 10.00 WIB',
  akadVenue: 'Kediaman Mempelai Wanita', akadAddress: 'Jl. Malioboro No. 123, Yogyakarta',
  akadMapUrl: '', akadGcalUrl: '',
  resepsiDate: 'Sabtu, 21 Mei 2026', resepsiTime: '11.00 – 14.00 WIB',
  resepsiVenue: 'Pendopo Agung Taman Sari', resepsiAddress: 'Jl. Taman Sari No. 456, Yogyakarta',
  resepsiMapUrl: '', resepsiGcalUrl: '',
  youtubeUrl: '',
  banks: [
    { bank: 'Bank BCA',  account: '1234567890',  holder: 'Raden Mas Diky Pratama Putra' },
    { bank: 'Bank BRI',  account: '0987654321',  holder: 'Raden Ayu Yuni Anggraini Putri' },
  ],
  bankName: 'Bank BCA', bankAccount: '1234567890', bankHolder: 'Raden Mas Diky Pratama Putra',
  photoSlider: [], photoGallery: [], backgroundMusic: null,
};

const G_DEFAULTS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop&auto=format',
];

/* ═══ BATIK ORNAMENT LAYER ══════════════════════════════════ */
/* Kawung motif as repeating SVG pattern */
const BatikLayer = () => (
  <div className="jv-batik-layer" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Kawung (concentric circles) */}
        <pattern id="kawung" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="12" fill="none" stroke="#C9A240" strokeWidth=".8"/>
          <circle cx="15" cy="15" r="7"  fill="none" stroke="#C9A240" strokeWidth=".5"/>
          <circle cx="45" cy="15" r="12" fill="none" stroke="#C9A240" strokeWidth=".8"/>
          <circle cx="45" cy="15" r="7"  fill="none" stroke="#C9A240" strokeWidth=".5"/>
          <circle cx="15" cy="45" r="12" fill="none" stroke="#C9A240" strokeWidth=".8"/>
          <circle cx="15" cy="45" r="7"  fill="none" stroke="#C9A240" strokeWidth=".5"/>
          <circle cx="45" cy="45" r="12" fill="none" stroke="#C9A240" strokeWidth=".8"/>
          <circle cx="45" cy="45" r="7"  fill="none" stroke="#C9A240" strokeWidth=".5"/>
          {/* Center diamond */}
          <path d="M30 18 L42 30 L30 42 L18 30 Z" fill="none" stroke="#C9A240" strokeWidth=".6"/>
          <circle cx="30" cy="30" r="3" fill="#C9A240" opacity=".4"/>
        </pattern>
        {/* Parang (diagonal stripe) as subtle accent */}
        <pattern id="parang" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40 L40 0 M-5 5 L5 -5 M35 45 L45 35" stroke="#C9A240" strokeWidth=".6" opacity=".6"/>
          <path d="M10 40 L40 10 M0 10 L10 0" stroke="#C9A240" strokeWidth=".4" opacity=".4"/>
        </pattern>
      </defs>
      {/* Kawung fills the whole cover */}
      <rect width="100%" height="100%" fill="url(#kawung)"/>
      {/* Parang accent stripes overlaid */}
      <rect width="100%" height="100%" fill="url(#parang)" opacity=".4"/>
    </svg>
  </div>
);

/* Individual floating batik petal (GSAP will animate these) */
const BatikParticles = () => {
  const particles = [
    { size: 48, x: '8%',  y: '12%', rot: 0   },
    { size: 36, x: '88%', y: '8%',  rot: 45  },
    { size: 56, x: '5%',  y: '72%', rot: 20  },
    { size: 40, x: '92%', y: '68%', rot: -30 },
    { size: 30, x: '50%', y: '6%',  rot: 60  },
    { size: 44, x: '25%', y: '88%', rot: -15 },
    { size: 32, x: '75%', y: '85%', rot: 30  },
    { size: 52, x: '15%', y: '42%', rot: -45 },
    { size: 28, x: '82%', y: '40%', rot: 75  },
    { size: 38, x: '42%', y: '92%', rot: -60 },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="jv-batik-particle"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          data-rot={p.rot}
          data-idx={i}
        >
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mini kawung motif */}
            <circle cx="30" cy="30" r="26" stroke="#C9A240" strokeWidth="1"/>
            <circle cx="30" cy="30" r="18" stroke="#C9A240" strokeWidth=".7" opacity=".7"/>
            <circle cx="30" cy="30" r="10" stroke="#C9A240" strokeWidth=".5" opacity=".5"/>
            <path d="M30 4 L56 30 L30 56 L4 30 Z" stroke="#C9A240" strokeWidth=".8" opacity=".6"/>
            <circle cx="30" cy="4"  r="2.5" fill="#C9A240"/>
            <circle cx="56" cy="30" r="2.5" fill="#C9A240"/>
            <circle cx="30" cy="56" r="2.5" fill="#C9A240"/>
            <circle cx="4"  cy="30" r="2.5" fill="#C9A240"/>
            {/* Inner petals */}
            <path d="M30 14 Q36 22 30 30 Q24 22 30 14Z" fill="#C9A240" opacity=".2"/>
            <path d="M46 30 Q38 36 30 30 Q38 24 46 30Z" fill="#C9A240" opacity=".2"/>
            <path d="M30 46 Q24 38 30 30 Q36 38 30 46Z" fill="#C9A240" opacity=".2"/>
            <path d="M14 30 Q22 24 30 30 Q22 36 14 30Z" fill="#C9A240" opacity=".2"/>
          </svg>
        </div>
      ))}
    </>
  );
};
const LandscapeBg = ({ v = 'dark' }) => (
  <div className={`jv-lbg jv-lbg--${v}`} aria-hidden="true">
    <div className="jv-lb jv-lb-sky" />
    <div className="jv-lb jv-lb-mtn" />
    <div className="jv-lb jv-lb-trees-far" />
    <div className="jv-lb jv-lb-gun-l" />
    <div className="jv-lb jv-lb-gun-r" />
    <div className="jv-lb jv-lb-trees-nr" />
    <div className="jv-lb jv-lb-flowers" />
    <div className="jv-lbg-overlay" />
  </div>
);

const animateLandscape = (el, parallaxTrigger) => {
  const q = gsap.utils.selector(el);
  const tw = [
    gsap.to(q('.jv-lb-sky'),       { scale: 1.08, duration: 28, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.to(q('.jv-lb-trees-far'), { x: 22,       duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.to(q('.jv-lb-gun-l'),     { x: -14,      duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.to(q('.jv-lb-gun-r'),     { x:  14,      duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.to(q('.jv-lb-flowers'),   { x: -18,      duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.to(q('.jv-lb-trees-nr'),  { x:  10,      duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true }),
  ];
  if (parallaxTrigger) {
    const st = { trigger: parallaxTrigger, start: 'top top', end: 'bottom top', scrub: 1.5 };
    tw.push(
      gsap.to(q('.jv-lb-sky'),       { yPercent: 12, ease: 'none', scrollTrigger: st }),
      gsap.to(q('.jv-lb-trees-far'), { yPercent: 28, ease: 'none', scrollTrigger: st }),
      gsap.to(q('.jv-lb-trees-nr'),  { yPercent: 38, ease: 'none', scrollTrigger: st }),
      gsap.to(q('.jv-lb-flowers'),   { yPercent: 45, ease: 'none', scrollTrigger: st }),
    );
  }
  return () => tw.forEach(t => t.kill());
};

/* ═══ COUNTDOWN ════════════════════════════════════════════ */
const Countdown = ({ iso }) => {
  const calc = useCallback(() => {
    const d = new Date(iso) - Date.now();
    if (d <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return { d: Math.floor(d/86400000), h: Math.floor(d%86400000/3600000), m: Math.floor(d%3600000/60000), s: Math.floor(d%60000/1000) };
  }, [iso]);
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, [calc]);
  return (
    <div className="jv-countdown">
      {[['Hari',t.d],['Jam',t.h],['Menit',t.m],['Detik',t.s]].map(([l,v]) => (
        <div key={l} className="jv-cd-unit">
          <span className="jv-cd-num">{String(v).padStart(2,'0')}</span>
          <span className="jv-cd-label">{l}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══ PORTRAIT GALLERY SCROLL ══════════════════════════════ */
const GalleryScroll = ({ photos }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const isDrag   = useRef(false);
  const startX   = useRef(0);
  const scrollX  = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(() => {
      const cardW   = track.querySelector('.jv-gcard')?.offsetWidth || 170;
      const halfLen = photos.length * (cardW + 14);
      tweenRef.current = gsap.to(track, {
        x: `-=${halfLen}`, duration: photos.length * 5.5,
        ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % halfLen) },
      });
    });
    return () => { cancelAnimationFrame(raf); tweenRef.current?.kill(); };
  }, [photos]);

  const pause = () => tweenRef.current?.pause();
  const onDown = e => { isDrag.current = true; startX.current = e.type==='touchstart'?e.touches[0].clientX:e.clientX; scrollX.current = gsap.getProperty(trackRef.current,'x'); tweenRef.current?.pause(); };
  const onMove = e => { if(!isDrag.current)return; const cx=e.type==='touchmove'?e.touches[0].clientX:e.clientX; gsap.set(trackRef.current,{x:scrollX.current+(cx-startX.current)}); };
  const onUp   = () => { isDrag.current=false; tweenRef.current?.resume(); };

  return (
    <div className="jv-gallery-scroll" onMouseEnter={pause} onMouseLeave={onUp}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}>
      <div className="jv-gs-fade jv-gs-fade--l" aria-hidden="true"/>
      <div className="jv-gs-fade jv-gs-fade--r" aria-hidden="true"/>
      <div className="jv-gs-track" ref={trackRef}>
        {[...photos,...photos].map((src,i) => (
          <div key={i} className="jv-gcard">
            <div className="jv-gcard-inner">
              <img src={src} alt={`Momen ${(i%photos.length)+1}`} draggable="false"
                onError={e=>{e.target.src=G_DEFAULTS[i%G_DEFAULTS.length];}}/>
              <div className="jv-gcard-ov" aria-hidden="true"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ RSVP FORM ════════════════════════════════════════════ */
const RSVPForm = ({ groom, bride }) => {
  const [form, setForm] = useState({ name:'', guests:'', attend:'', wish:'' });
  const [done, setDone]   = useState(false);
  const upd = k => e => setForm(f => ({...f,[k]:e.target.value}));

  if (done) return (
    <div className="jv-rsvp-done jv-reveal">
      <span className="jv-rsvp-flower">🌸</span>
      <h3 className="jv-script">Terima Kasih, {form.name}!</h3>
      <p>{form.attend==='hadir'
        ? `Kami sangat bahagia Anda bisa hadir bersama kami di hari istimewa ${groom} & ${bride}. Sampai jumpa! 🤍`
        : 'Doa dan ucapan Anda sangat berarti bagi kami. Terima kasih telah meluangkan waktu.'}</p>
    </div>
  );
  return (
    <form className="jv-rsvp-form jv-reveal" onSubmit={e=>{e.preventDefault();if(form.name&&form.attend)setDone(true);}}>
      <div className="jv-rsvp-field">
        <label>Nama Lengkap</label>
        <input placeholder="Tulis nama Anda…" value={form.name} onChange={upd('name')} required/>
      </div>
      <div className="jv-rsvp-row">
        <div className="jv-rsvp-field">
          <label>Jumlah Tamu</label>
          <select value={form.guests} onChange={upd('guests')}>
            <option value="">— pilih —</option>
            {[1,2,3,4,5].map(n=><option key={n} value={n}>{n} orang</option>)}
          </select>
        </div>
        <div className="jv-rsvp-field">
          <label>Kehadiran</label>
          <select value={form.attend} onChange={upd('attend')} required>
            <option value="">— pilih —</option>
            <option value="hadir">✓ Hadir</option>
            <option value="tidak">✗ Tidak Hadir</option>
          </select>
        </div>
      </div>
      <div className="jv-rsvp-field">
        <label>Ucapan & Doa</label>
        <textarea placeholder="Tulis ucapan atau doa untuk kami…" rows={4} value={form.wish} onChange={upd('wish')}/>
      </div>
      <button type="submit" className="jv-rsvp-btn">
        <span className="jv-rsvp-btn-deco">✦</span>
        Kirim Konfirmasi
        <span className="jv-rsvp-btn-deco">✦</span>
      </button>
    </form>
  );
};

/* ═══ E-ANGPAO — multi-rekening, elegant ═══════════════════ */
const AngpaoCard = ({ bank, account, holder, logo, index }) => {
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(account).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Bank logo colors map
  const bankColors = {
    'BCA':      { bg: '#005a9e', text: '#fff', accent: '#f7a800' },
    'BRI':      { bg: '#003d7a', text: '#fff', accent: '#f0a500' },
    'BNI':      { bg: '#e8821a', text: '#fff', accent: '#fff' },
    'Mandiri':  { bg: '#003087', text: '#fff', accent: '#f9a800' },
    'BSI':      { bg: '#166534', text: '#fff', accent: '#86efac' },
    'DANA':     { bg: '#0085ff', text: '#fff', accent: '#fff' },
    'GoPay':    { bg: '#00AED6', text: '#fff', accent: '#fff' },
    'OVO':      { bg: '#4c3494', text: '#fff', accent: '#efce4a' },
    'default':  { bg: '#4A1010', text: '#fff', accent: '#C9A240' },
  };

  const key = Object.keys(bankColors).find(k => bank.toLowerCase().includes(k.toLowerCase())) || 'default';
  const colors = bankColors[key];

  return (
    <div
      className={`jv-acard ${flipped ? 'jv-acard--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      style={{ '--bank-bg': colors.bg, '--bank-text': colors.text, '--bank-accent': colors.accent }}
      role="button"
      tabIndex={0}
      aria-label={`Rekening ${bank}`}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
    >
      {/* FRONT */}
      <div className="jv-acard-face jv-acard-front">
        <div className="jv-acard-chip" aria-hidden="true">
          <svg viewBox="0 0 40 30" fill="none">
            <rect x="0" y="0" width="40" height="30" rx="4" fill="#C9A240" opacity=".9"/>
            <rect x="4" y="6" width="32" height="18" rx="2" fill="none" stroke="#fff" strokeWidth=".8" opacity=".5"/>
            <line x1="0" y1="10" x2="40" y2="10" stroke="#fff" strokeWidth=".7" opacity=".3"/>
            <line x1="0" y1="20" x2="40" y2="20" stroke="#fff" strokeWidth=".7" opacity=".3"/>
            <line x1="14" y1="0" x2="14" y2="30" stroke="#fff" strokeWidth=".7" opacity=".3"/>
            <line x1="26" y1="0" x2="26" y2="30" stroke="#fff" strokeWidth=".7" opacity=".3"/>
          </svg>
        </div>
        <p className="jv-acard-bankname">{bank}</p>
        <p className="jv-acard-num">
          {account.replace(/(.{4})/g, '$1 ').trim()}
        </p>
        <p className="jv-acard-holder">{holder}</p>
        <p className="jv-acard-tap">Ketuk untuk salin ↩</p>
      </div>

      {/* BACK */}
      <div className="jv-acard-face jv-acard-back">
        <div className="jv-acard-stripe" aria-hidden="true"/>
        <div className="jv-acard-copy-area">
          <p className="jv-acard-back-label">Nomor Rekening</p>
          <p className="jv-acard-back-num">{account}</p>
          <p className="jv-acard-back-bank">{bank} · a/n {holder}</p>
          <button className="jv-acard-copy-btn" onClick={copy}>
            {copied
              ? <><span className="jv-copy-check">✓</span> Tersalin!</>
              : <><span className="jv-copy-icon">⧉</span> Salin Nomor</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

const EAngpao = ({ banks = [] }) => {
  const list = banks.length ? banks : [
    { bank: 'Bank BCA',  account: '1234567890',  holder: 'Raden Mas Diky Pratama Putra' },
    { bank: 'Bank BRI',  account: '0987654321',  holder: 'Raden Ayu Yuni Anggraini Putri' },
  ];

  return (
    <div className="jv-angpao-wrap jv-reveal">
      <div className="jv-angpao-intro">
        <p className="jv-angpao-verse">
          "Sedekah tidaklah mengurangi harta."<br/>
          <span>— HR. Muslim —</span>
        </p>
      </div>
      <div className="jv-angpao-cards">
        {list.map((b, i) => (
          <AngpaoCard key={i} index={i} bank={b.bank} account={b.account} holder={b.holder} />
        ))}
      </div>
      <p className="jv-angpao-note">
        🤍 Doa restu Anda adalah hadiah paling indah bagi kami.<br/>
        Namun jika Anda berkenan memberikan tanda kasih, kami menerimanya dengan tulus dan penuh syukur.
      </p>
    </div>
  );
};

/* ═══ SMALL HELPERS ═════════════════════════════════════════ */
const Eyebrow = ({c,light}) => <p className={`jv-eyebrow${light?' jv-eyebrow--light':''}`}>{c}</p>;
const GoldLine = ({sm,xs}) => <span className={`jv-gold-line${sm?' jv-gold-sm':xs?' jv-gold-xs':''}`}/>;
const Gem = () => <span className="jv-gem" aria-hidden="true">❈</span>;

/* Aksara Jawa decorative text — placed as ambient ornament */
const AksaraJawa = ({ text = 'ꦲꦤꦕꦫꦏ', className = '' }) => (
  <span className={`jv-aksara ${className}`} aria-hidden="true">{text}</span>
);

const CornerSvg = ({ flip }) => (
  <svg viewBox="0 0 72 72" fill="none" style={{
    transform: flip==='h'?'scaleX(-1)':flip==='v'?'scaleY(-1)':flip==='hv'?'scale(-1)':'none',
    width:'100%',height:'100%'}}>
    <path d="M4 4 C28 4,68 4,68 68" stroke="#C9A240" strokeWidth="1.5" fill="none"/>
    <path d="M4 4 C4 28,4 68,68 68" stroke="#C9A240" strokeWidth="0.8" fill="none" opacity=".35"/>
    <circle cx="4"  cy="4"  r="3.5" fill="#C9A240"/>
    <circle cx="36" cy="4"  r="1.5" fill="#C9A240" opacity=".5"/>
    <circle cx="4"  cy="36" r="1.5" fill="#C9A240" opacity=".5"/>
  </svg>
);

const InnerFrame = () => (
  <div className="jv-inner-frame" aria-hidden="true">
    <i className="jv-if jv-if-tl"/><i className="jv-if jv-if-tr"/>
    <i className="jv-if jv-if-bl"/><i className="jv-if jv-if-br"/>
  </div>
);

const Corners = () => (
  <>
    <div className="jv-corner jv-corner-tl"><CornerSvg/></div>
    <div className="jv-corner jv-corner-tr"><CornerSvg flip="h"/></div>
    <div className="jv-corner jv-corner-bl"><CornerSvg flip="v"/></div>
    <div className="jv-corner jv-corner-br"><CornerSvg flip="hv"/></div>
  </>
);

/* Build Google Calendar URL from event details */
const gcalUrl = (title, date, venue, address) => {
  // date format expected: "Sabtu, 21 Mei 2026"
  const months = {Januari:'01',Februari:'02',Maret:'03',April:'04',Mei:'05',Juni:'06',
    Juli:'07',Agustus:'08',September:'09',Oktober:'10',November:'11',Desember:'12'};
  try {
    const parts = date.replace(/\w+,\s*/,'').trim().split(' ');
    const d = parts[0].padStart(2,'0');
    const m = months[parts[1]] || '01';
    const y = parts[2];
    const iso = `${y}${m}${d}`;
    const details = encodeURIComponent(`${venue}\n${address}`);
    const loc = encodeURIComponent(`${venue}, ${address}`);
    const t = encodeURIComponent(title);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=${iso}/${iso}&details=${details}&location=${loc}`;
  } catch { return '#'; }
};

/* ═══ MAIN TEMPLATE ═════════════════════════════════════════ */
const JavaneseElegantTemplate = ({ data={}, guestName='', isPreview=false }) => {
  const wrapRef  = useRef(null);
  const coverRef = useRef(null);
  const audioRef = useRef(null);
  const [opened,      setOpened]      = useState(false);
  const [audioPlaying,setAudioPlaying] = useState(false);

  const d = { ...DEFAULTS, ...data };

  const groomPhoto = d.photoSlider?.[0]?.preview || d.photoSlider?.[0]
    || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format';
  const bridePhoto = d.photoSlider?.[1]?.preview || d.photoSlider?.[1]
    || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&auto=format';
  const couplePhoto = d.photoSlider?.[2]?.preview || d.photoSlider?.[2]
    || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop&auto=format';
  const gallery = d.photoGallery?.length ? d.photoGallery.map(p=>p?.preview||p) : G_DEFAULTS;

  /* YT embed */
  const ytEmbed = (() => {
    if (!d.youtubeUrl) return '';
    const m = d.youtubeUrl.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
    return m ? `https://www.youtube.com/embed/${m[1]}?rel=0&showinfo=0` : '';
  })();

  /* ── GSAP ── */
  useEffect(() => {
    if (!opened && !isPreview) return;
    if (!wrapRef.current) return;

    const raf = requestAnimationFrame(() => {
      /* Landscape ambient drift — runs in both preview & public */
      wrapRef.current.querySelectorAll('.jv-lbg').forEach(el => animateLandscape(el));

      /* Gold shimmer — runs in both */
      gsap.to(wrapRef.current.querySelectorAll('.jv-gold-line'), {
        backgroundPosition: '200% center', duration: 4, ease: 'none', repeat: -1,
      });

      /* ── Everything below is PUBLIC VIEW ONLY (no ScrollTrigger in preview) ── */
      if (isPreview) return;

      /* Cover parallax */
      if (coverRef.current) {
        const lbg = coverRef.current.querySelector('.jv-lbg');
        if (lbg) animateLandscape(lbg, coverRef.current);
      }

      /* Cover entrance */
      if (coverRef.current) {
        const tl = gsap.timeline({ delay: 0.4 });
        tl.from(coverRef.current.querySelectorAll('.jv-corner'),
            { scale: 0, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.7)' })
          .from(coverRef.current.querySelector('.jv-cover-tag'),
            { y: -30, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
          .from(coverRef.current.querySelectorAll('.jv-cover-name-groom,.jv-cover-name-bride'),
            { y: 50, opacity: 0, stagger: 0.25, duration: 1.1, ease: 'power3.out' }, '-=0.5')
          .from(coverRef.current.querySelector('.jv-cover-amp'),
            { scale: 0, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, '-=0.9')
          .from(coverRef.current.querySelectorAll('.jv-cover-date,.jv-cover-hashtag'),
            { y: 20, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.4');

        /* Batik particles */
        const particles = coverRef.current.querySelectorAll('.jv-batik-particle');
        particles.forEach((p, i) => {
          const rot   = parseFloat(p.dataset.rot) || 0;
          const delay = 0.8 + i * 0.15;
          gsap.fromTo(p,
            { opacity: 0, scale: 0.3, rotation: rot - 90 },
            { opacity: .22 + (i % 3) * .04, scale: 1, rotation: rot,
              duration: 1.6, delay, ease: 'back.out(1.4)' }
          );
          gsap.to(p, {
            y: -20 - (i % 4) * 8,
            rotation: rot + (i % 2 === 0 ? 18 : -18),
            duration: 5 + (i % 5),
            ease: 'sine.inOut', repeat: -1, yoyo: true, delay: delay + 0.5,
          });
          gsap.to(p, {
            opacity: .1, duration: 3 + (i % 3),
            ease: 'sine.inOut', repeat: -1, yoyo: true, delay: delay + 1,
          });
        });

        /* Batik layer slow drift */
        const batikL = coverRef.current.querySelector('.jv-batik-layer');
        if (batikL) {
          gsap.to(batikL, {
            rotation: 2.5, scale: 1.04, duration: 32,
            ease: 'sine.inOut', repeat: -1, yoyo: true,
            transformOrigin: 'center center',
          });
        }
      }

      /* Scroll-triggered reveals — public only, scroller = window */
      wrapRef.current.querySelectorAll('.jv-reveal').forEach(el => {
        gsap.set(el, { opacity: 0, y: 50 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });

      /* Arch frames */
      const ag = wrapRef.current.querySelector('.jv-arch-groom');
      const ab = wrapRef.current.querySelector('.jv-arch-bride');
      if (ag && ab) {
        gsap.set(ag, { x: -80, opacity: 0 }); gsap.set(ab, { x: 80, opacity: 0 });
        const st = { trigger: wrapRef.current.querySelector('.jv-couple-section'), start: 'top 82%', toggleActions: 'play none none none' };
        gsap.to(ag, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: st });
        gsap.to(ab, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
      }

      /* Couple photo parallax */
      const cp = wrapRef.current.querySelector('.jv-couple-photo-img');
      if (cp) gsap.to(cp, { scale: 1.06, ease: 'none',
        scrollTrigger: { trigger: cp.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 1 } });

      /* Event cards */
      const evCards = wrapRef.current.querySelectorAll('.jv-event-card');
      if (evCards.length) {
        gsap.set(evCards, { y: 60, opacity: 0 });
        gsap.to(evCards, { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: wrapRef.current.querySelector('.jv-events-section'), start: 'top 82%', toggleActions: 'play none none none' } });
      }

      /* Quran card */
      const qc = wrapRef.current.querySelector('.jv-quran-card');
      if (qc) {
        gsap.set(qc, { scale: 0.92, opacity: 0 });
        gsap.to(qc, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: qc, start: 'top 86%', toggleActions: 'play none none none' } });
      }
    });

    return () => { cancelAnimationFrame(raf); ScrollTrigger.getAll().forEach(t => t.kill()); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isPreview]);

  const handleOpen = () => {
    const ov = wrapRef.current?.querySelector('.jv-overlay');
    if (ov) gsap.to(ov,{opacity:0,scale:1.04,duration:1,ease:'power2.inOut',onComplete:()=>{setOpened(true);setTimeout(()=>{audioRef.current?.play().then(()=>setAudioPlaying(true)).catch(()=>{});},800);}});
    else setOpened(true);
  };
  const toggleAudio = () => { if(!audioRef.current)return; audioPlaying?audioRef.current.pause():audioRef.current.play().catch(()=>{}); setAudioPlaying(p=>!p); };

  return (
    <div className="jv-wrap" ref={wrapRef}>

      {/* Music */}
      <audio ref={audioRef} loop preload="none">
        <source src={d.backgroundMusic?.preview||`${process.env.PUBLIC_URL}/assets/music/javanese-gamelan.mp3`} type="audio/mpeg"/>
      </audio>

      {/* Audio btn */}
      {!isPreview && opened && (
        <button className="jv-audio-btn" onClick={toggleAudio} aria-label="musik">
          {audioPlaying ? '⏸' : '▶'}
        </button>
      )}

      {/* ╔══════════════════════════════════════════╗
          ║          OPEN OVERLAY                   ║
          ╚══════════════════════════════════════════╝ */}
      {!isPreview && !opened && (
        <div className="jv-overlay">
          <LandscapeBg v="dark"/>
          <Corners/>
          <div className="jv-overlay-box">
            <p className="jv-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            {guestName && (
              <div className="jv-guest-wrap">
                <span className="jv-to-txt">Kepada Yth.</span>
                <span className="jv-guest-name jv-script">{guestName}</span>
              </div>
            )}
            <p className="jv-ol-tag">The Wedding of</p>
            <div className="jv-ol-names">
              <span className="jv-script jv-ol-name">{d.groom}</span>
              <span className="jv-script jv-ol-amp">&</span>
              <span className="jv-script jv-ol-name">{d.bride}</span>
            </div>
            <p className="jv-ol-date">{d.date}</p>
            <GoldLine/>
            <button className="jv-open-btn" onClick={handleOpen}>
              <span>✦</span> Buka Undangan <span>✦</span>
            </button>
          </div>
        </div>
      )}

      {/* ╔══════════════════════════════════════════╗
          ║          INVITATION BODY                ║
          ╚══════════════════════════════════════════╝ */}
      {(opened || isPreview) && (
        <div className="jv-body">

          {/* ── S1. OPENING / COVER ── */}
          <section className="jv-cover" ref={coverRef}>
            <LandscapeBg v="dark"/>
            {/* Batik pattern & floating particles */}
            <BatikLayer/>
            <BatikParticles/>
            <Corners/>
            <div className="jv-cover-inner">
              <AksaraJawa text="ꦲꦤꦕꦫꦏꦢꦠꦱꦮꦭꦪ" className="jv-aksara-cover"/>
              <p className="jv-cover-tag">The Wedding of</p>
              <div className="jv-cover-couple">
                <span className="jv-script jv-cover-name-groom">{d.groom}</span>
                <span className="jv-script jv-cover-amp">&</span>
                <span className="jv-script jv-cover-name-bride">{d.bride}</span>
              </div>
              <GoldLine sm/>
              <p className="jv-cover-date">{d.date}</p>
              <p className="jv-cover-hashtag">{d.hashtag}</p>
            </div>
            <div className="jv-cover-scroll">
              <svg className="jv-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6"/></svg>
              <span>Scroll</span>
            </div>
          </section>

          {/* ── S2. DATE + GOOGLE CALENDAR ── */}
          <section className="jv-section jv-date-section">
            <Eyebrow c="Catat Tanggalnya" />
            <GoldLine/>
            <div className="jv-date-card jv-reveal">
              <InnerFrame/>
              <div className="jv-date-display">
                <span className="jv-script jv-date-day">{d.groom} & {d.bride}</span>
                <p className="jv-date-full">{d.akadDate}</p>
              </div>
              <Countdown iso="2026-05-21T08:00:00"/>
              <div className="jv-date-gcal-row">
                <a className="jv-gcal-btn" href={gcalUrl(`Akad Nikah ${d.groom} & ${d.bride}`, d.akadDate, d.akadVenue, d.akadAddress)} target="_blank" rel="noopener noreferrer">
                  <svg className="jv-gcal-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  Akad — Simpan ke Kalender
                </a>
                <a className="jv-gcal-btn" href={gcalUrl(`Resepsi ${d.groom} & ${d.bride}`, d.resepsiDate, d.resepsiVenue, d.resepsiAddress)} target="_blank" rel="noopener noreferrer">
                  <svg className="jv-gcal-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  Resepsi — Simpan ke Kalender
                </a>
              </div>
            </div>
          </section>

          {/* ── S3. KATA-KATA ROMANTIS ── */}
          <section className="jv-section jv-romantic-section">
            <LandscapeBg v="dim"/>
            <div className="jv-romantic-inner jv-reveal">
              <AksaraJawa text="ꦢꦮꦶꦗꦪ" className="jv-aksara-section"/>
              <Gem/>
              <p className="jv-bismillah-sm">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
              <blockquote className="jv-romantic-quote jv-script">
                {d.romantic}
              </blockquote>
              <GoldLine sm/>
              <p className="jv-quran-latin">
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
              </p>
              <p className="jv-quran-src">— QS. Ar-Rum: 21 —</p>
              <Gem/>
            </div>
          </section>

          {/* ── S4. FRAME MEMPELAI (ARCH) ── */}
          <section className="jv-couple-section">
            <LandscapeBg v="dim"/>
            <div className="jv-couple-inner">
              <Eyebrow c="Mempelai Yang Berbahagia" light/>
              <GoldLine sm/>
              <div className="jv-arch-row">
                {/* Groom */}
                <div className="jv-arch-card jv-arch-groom">
                  <div className="jv-arch-frame">
                    <img src={groomPhoto} alt={d.groomFull} onError={e=>{e.target.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format';}}/>
                    <div className="jv-arch-shimmer"/>
                  </div>
                  <div className="jv-arch-info">
                    <h3 className="jv-script jv-arch-name">{d.groomFull}</h3>
                    <GoldLine xs/>
                    <p className="jv-arch-role">Precious Son of</p>
                    <p className="jv-arch-parents">{d.groomParents}</p>
                  </div>
                </div>
                {/* Separator */}
                <div className="jv-arch-sep">
                  <div className="jv-sep-line"/><span className="jv-script jv-sep-amp">&</span><div className="jv-sep-line"/>
                </div>
                {/* Bride */}
                <div className="jv-arch-card jv-arch-bride">
                  <div className="jv-arch-frame">
                    <img src={bridePhoto} alt={d.brideFull} onError={e=>{e.target.src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&auto=format';}}/>
                    <div className="jv-arch-shimmer"/>
                  </div>
                  <div className="jv-arch-info">
                    <h3 className="jv-script jv-arch-name">{d.brideFull}</h3>
                    <GoldLine xs/>
                    <p className="jv-arch-role">Lovely Daughter of</p>
                    <p className="jv-arch-parents">{d.brideParents}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── S5. FOTO MEMPELAI ESTETIK (full-bleed + parallax) ── */}
          <section className="jv-section jv-couple-photo-section">
            <div className="jv-couple-photo-wrap jv-reveal">
              <img src={couplePhoto} className="jv-couple-photo-img" alt="Foto bersama mempelai"
                onError={e=>{e.target.src='https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop&auto=format';}}/>
              <div className="jv-couple-photo-overlay"/>
              <div className="jv-couple-photo-text">
                <p className="jv-script jv-cpt-names">{d.groom} & {d.bride}</p>
                <p className="jv-cpt-date">{d.date}</p>
              </div>
            </div>
          </section>

          {/* ── S6. KISAH CINTA ── */}
          <section className="jv-section jv-story-section">
            <Eyebrow c="Kisah Cinta Kami"/>
            <GoldLine/>
            <blockquote className="jv-story-quote jv-reveal">
              <span className="jv-qmark">"</span>
              {d.story}
              <span className="jv-qmark jv-qmark--close">"</span>
            </blockquote>
          </section>

          {/* ── S7. GALLERY SCROLL ── */}
          <section className="jv-section jv-gallery-section">
            <Eyebrow c="Momen Berharga"/>
            <GoldLine/>
            <GalleryScroll photos={gallery}/>
          </section>

          {/* ── S8. VIDEO YOUTUBE ── */}
          {(ytEmbed || !isPreview) && (
            <section className="jv-section jv-video-section">
              <Eyebrow c="Video Pernikahan"/>
              <GoldLine/>
              {ytEmbed ? (
                <div className="jv-yt-wrap jv-reveal">
                  <iframe
                    src={ytEmbed}
                    title="Video Pernikahan"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="jv-yt-placeholder jv-reveal">
                  <span>▶</span>
                  <p>Masukkan link YouTube di editor untuk menampilkan video</p>
                </div>
              )}
            </section>
          )}

          {/* ── S9. LOKASI + GOOGLE MAPS ── */}
          <section className="jv-section jv-events-section">
            <Eyebrow c="Waktu & Tempat"/>
            <GoldLine/>
            <p className="jv-section-sub jv-reveal">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami
            </p>
            <div className="jv-events-grid">
              {/* Akad */}
              <div className="jv-event-card">
                <InnerFrame/>
                <span className="jv-event-badge">Akad Nikah</span>
                <div className="jv-event-icon">
                  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#C9A240" strokeWidth="1.2"/><path d="M24 8C15 13 15 35 24 40C33 35 33 13 24 8Z" stroke="#C9A240" strokeWidth="1" fill="none"/><circle cx="24" cy="24" r="3.5" fill="#C9A240" opacity=".5"/></svg>
                </div>
                <GoldLine xs/>
                <p className="jv-event-date">{d.akadDate}</p>
                <p className="jv-event-time">{d.akadTime}</p>
                <span className="jv-event-sep">✦</span>
                <p className="jv-event-venue">{d.akadVenue}</p>
                <p className="jv-event-addr">{d.akadAddress}</p>
                {d.akadMapUrl?.includes('<iframe') && (
                  <div className="jv-map" dangerouslySetInnerHTML={{__html:d.akadMapUrl}}/>
                )}
                <a className="jv-gcal-btn jv-gcal-sm" href={gcalUrl(`Akad Nikah ${d.groom} & ${d.bride}`,d.akadDate,d.akadVenue,d.akadAddress)} target="_blank" rel="noopener noreferrer">
                  📅 Simpan ke Kalender
                </a>
              </div>
              {/* Resepsi */}
              <div className="jv-event-card">
                <InnerFrame/>
                <span className="jv-event-badge">Resepsi Pernikahan</span>
                <div className="jv-event-icon">
                  <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#C9A240" strokeWidth="1.2"/><path d="M12 28 Q24 14 36 28" stroke="#C9A240" strokeWidth="1.2" fill="none"/><circle cx="24" cy="19" r="4" stroke="#C9A240" strokeWidth="1" fill="none"/></svg>
                </div>
                <GoldLine xs/>
                <p className="jv-event-date">{d.resepsiDate}</p>
                <p className="jv-event-time">{d.resepsiTime}</p>
                <span className="jv-event-sep">✦</span>
                <p className="jv-event-venue">{d.resepsiVenue}</p>
                <p className="jv-event-addr">{d.resepsiAddress}</p>
                {d.resepsiMapUrl?.includes('<iframe') && (
                  <div className="jv-map" dangerouslySetInnerHTML={{__html:d.resepsiMapUrl}}/>
                )}
                <a className="jv-gcal-btn jv-gcal-sm" href={gcalUrl(`Resepsi ${d.groom} & ${d.bride}`,d.resepsiDate,d.resepsiVenue,d.resepsiAddress)} target="_blank" rel="noopener noreferrer">
                  📅 Simpan ke Kalender
                </a>
              </div>
            </div>
          </section>

          {/* ── S10. RSVP ── */}
          <section className="jv-section jv-rsvp-section">
            <LandscapeBg v="dim"/>
            <div className="jv-rsvp-inner">
              <Eyebrow c="Konfirmasi Kehadiran" light/>
              <GoldLine/>
              <p className="jv-rsvp-sub jv-reveal">
                Kehadiran Anda adalah kebahagiaan terbesar bagi kami.<br/>
                Mohon konfirmasi kehadiran Anda sebelum <strong>{d.akadDate}</strong>.
              </p>
              <RSVPForm groom={d.groom} bride={d.bride}/>
            </div>
          </section>

          {/* ── S11. E-ANGPAO ── */}
          <section className="jv-section jv-angpao-section">
            <Eyebrow c="E-Angpao & Hadiah"/>
            <GoldLine/>
            <p className="jv-section-sub jv-reveal">
              Kehadiran dan doa Anda adalah karunia terbesar bagi kami.
              Namun jika Anda ingin memberikan tanda kasih, kami menerimanya dengan penuh syukur dan ketulusan.
            </p>
            <EAngpao banks={d.banks}/>
          </section>

          {/* ── S12. APOLOGY / PENUTUP PERMOHONAN MAAF ── */}
          <section className="jv-section jv-apology-section">
            <LandscapeBg v="dim"/>
            <div className="jv-apology-inner jv-reveal">
              <Gem/>
              <Eyebrow c="Permohonan Maaf" light/>
              <GoldLine sm/>
              <p className="jv-apology-text">
                Kami menyadari bahwa dalam penyampaian undangan ini mungkin terdapat kekurangan dan
                ketidaksempurnaan. Oleh karena itu, dengan kerendahan hati kami memohon maaf yang
                sebesar-besarnya apabila terdapat kesalahan dalam penulisan nama, gelar, maupun
                penyebutan. Semoga Allah SWT meridhoi setiap langkah perjalanan kami.
              </p>
              <GoldLine sm/>
              <p className="jv-apology-sign jv-script">
                {d.groom} & {d.bride}
              </p>
              <Gem/>
            </div>
          </section>

          {/* ── S13. UCAPAN TERIMA KASIH / FOOTER ── */}
          <footer className="jv-footer">
            <LandscapeBg v="dark"/>
            <div className="jv-footer-inner">
              <AksaraJawa text="ꦱꦸꦏꦸꦂꦲꦩꦠꦸꦂ" className="jv-aksara-footer"/>
              <Gem/>
              <GoldLine sm/>
              <p className="jv-footer-thanks">
                Terima kasih atas doa, kasih sayang, dan kehadiran<br/>
                Bapak / Ibu / Saudara / i di hari istimewa kami
              </p>
              <h2 className="jv-script jv-footer-names">{d.groom} & {d.bride}</h2>
              <GoldLine sm/>
              <p className="jv-footer-verse">
                "Dan Dia lah yang menyatukan hati mereka (orang-orang yang beriman).
                Walaupun kamu membelanjakan semua kekayaan yang berada di bumi, niscaya kamu tidak dapat
                menyatukan hati mereka."
              </p>
              <p className="jv-footer-verse-src">— QS. Al-Anfal: 63 —</p>
              <GoldLine sm/>
              <p className="jv-footer-tag">{d.hashtag}</p>
              <Gem/>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
};

export default JavaneseElegantTemplate;
