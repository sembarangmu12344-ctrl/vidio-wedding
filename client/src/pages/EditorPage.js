import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import JavaneseElegantTemplate from '../components/JavaneseElegantTemplate';
import './EditorPage.css';

/* ─────────────────────────────────────────────────────────
   DEFAULT DATA
───────────────────────────────────────────────────────── */
const DEFAULT_DATA = {
  groom: 'Raden Mas Diky',
  bride: 'Raden Ayu Yuni',
  date: '21 . 05 . 2026',
  hashtag: '#PilihansatutujuAn',
  groomFull: 'Raden Mas Diky Pratama Putra',
  brideFull: 'Raden Ayu Yuni Anggraini Putri',
  groomParents: 'Putra dari Bapak Ahmad Wijaya & Ibu Siti Nurhaliza',
  brideParents: 'Putri dari Bapak Budi Santoso & Ibu Dewi Sartika',
  romantic: '"Dua jiwa, satu takdir. Setiap detik bersamamu adalah anugerah yang tak ternilai."',
  story: 'Pertemuan kami dimulai dari sebuah kebetulan indah di sebuah acara keluarga. Dari situ, kami menyadari bahwa jodoh memang sudah digariskan oleh Yang Maha Kuasa.',
  akadDate: 'Sabtu, 21 Mei 2026',
  akadTime: '08.00 - 10.00 WIB',
  akadVenue: 'Kediaman Mempelai Wanita',
  akadAddress: 'Jl. Malioboro No. 123, Yogyakarta',
  akadMapUrl: '',
  resepsiDate: 'Sabtu, 21 Mei 2026',
  resepsiTime: '11.00 - 14.00 WIB',
  resepsiVenue: 'Pendopo Agung Taman Sari',
  resepsiAddress: 'Jl. Taman Sari No. 456, Yogyakarta',
  resepsiMapUrl: '',
  youtubeUrl: '',
  banks: [
    { bank: 'Bank BCA',  account: '1234567890',  holder: 'Raden Mas Diky Pratama Putra' },
    { bank: 'Bank BRI',  account: '0987654321',  holder: 'Raden Ayu Yuni Anggraini Putri' },
  ],
  bankName: 'Bank BCA',
  bankAccount: '1234567890',
  bankHolder: 'Raden Mas Diky Pratama Putra',
  photoSlider: [],
  photoGallery: [],
  backgroundMusic: null,
  theme: 'javanese-elegant',
  package: 'premium',
};

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
const loadSaved = () => {
  try {
    const s = localStorage.getItem('invitationData');
    return s ? { ...DEFAULT_DATA, ...JSON.parse(s) } : { ...DEFAULT_DATA };
  } catch {
    return { ...DEFAULT_DATA };
  }
};

const convertMapUrl = (url) => {
  if (!url) return '';
  if (url.includes('<iframe')) return url;
  let embedUrl = '';
  try {
    if (url.includes('?q=')) {
      const coords = url.split('?q=')[1].split('&')[0];
      const [lat, lng] = coords.split(',');
      embedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
    } else if (url.includes('@')) {
      const coords = url.split('@')[1].split(',');
      embedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15812!2d${coords[1]}!3d${coords[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
    } else if (url.includes('google.com/maps/embed')) {
      embedUrl = url;
    } else {
      embedUrl = url;
    }
    if (embedUrl) {
      return `<iframe src="${embedUrl}" width="100%" height="260" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
  } catch {/* ignore */}
  return url;
};

const readFileAsDataURL = (file) =>
  new Promise((res) => {
    const r = new FileReader();
    r.onloadend = () => res({ file, preview: r.result, name: file.name });
    r.readAsDataURL(file);
  });

const showToast = (msg, type = 'success') => {
  const el = document.createElement('div');
  el.className = `ep-toast ep-toast-${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('ep-toast-show'));
  setTimeout(() => {
    el.classList.remove('ep-toast-show');
    setTimeout(() => el.remove(), 350);
  }, 2400);
};

/* ─────────────────────────────────────────────────────────
   EDITOR PAGE
───────────────────────────────────────────────────────── */
const EditorPage = () => {
  useParams(); // templateId reserved for future multi-template routing

  const [data, setData] = useState(() => loadSaved());
  const [activeTab, setActiveTab] = useState('info');
  const [saving, setSaving] = useState(false);
  const [device, setDevice] = useState('android'); // 'android' | 'iphone'

  /* raw map URL inputs — keep separate so user can type freely */
  const [akadMapInput, setAkadMapInput] = useState('');
  const [resepsiMapInput, setResepsiMapInput] = useState('');

  const set = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  /* ── Map URL ── */
  const applyMap = (field, raw, setRaw) => {
    const iframe = convertMapUrl(raw);
    set(field, iframe);
    setRaw('');
  };

  /* ── Single file upload ── */
  const handleFile = async (field, file) => {
    if (!file) return;
    const result = await readFileAsDataURL(file);
    set(field, result);
  };

  /* ── Photo array upload ── */
  const handlePhotos = async (field, files, max) => {
    const arr = Array.from(files).slice(0, max);
    const results = await Promise.all(arr.map(readFileAsDataURL));
    set(field, results);
  };

  const removePhoto = (field, idx) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }));
  };

  /* ── Save ── */
  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('invitationData', JSON.stringify(data));
    setTimeout(() => {
      setSaving(false);
      showToast('✅ Undangan berhasil disimpan!');
    }, 600);
  };

  /* ── Publish / Preview ── */
  const handlePublish = () => {
    localStorage.setItem('invitationData', JSON.stringify(data));
    window.open('/invitation/preview', '_blank');
  };

  /* ── Guest link copy ── */
  const copyGuestLink = (guestName) => {
    if (!guestName.trim()) { showToast('Isi nama tamu terlebih dulu', 'error'); return; }
    const slug = encodeURIComponent(guestName.trim());
    const url = `${window.location.origin}/invitation/preview?to=${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast(`📋 Link untuk "${guestName}" disalin!`);
    });
  };

  const tabs = [
    { id: 'info',   label: '📝 Mempelai' },
    { id: 'event',  label: '📅 Acara' },
    { id: 'media',  label: '🖼️ Foto & Media' },
    { id: 'guest',  label: '💌 Tamu Undangan' },
  ];

  return (
    <div className="ep-root">
      {/* ═══ HEADER ═══ */}
      <header className="ep-header">
        <div className="ep-header-left">
          <Link to="/templates" className="ep-back">← Kembali</Link>
          <span className="ep-title">✦ Javanese Elegant Editor</span>
        </div>
        <div className="ep-header-right">
          <button className="ep-btn ep-btn-save" onClick={handleSave} disabled={saving}>
            {saving ? '⏳ Menyimpan…' : '💾 Simpan'}
          </button>
          <button className="ep-btn ep-btn-publish" onClick={handlePublish}>
            👁 Preview
          </button>
        </div>
      </header>

      {/* ═══ BODY — split panel ═══ */}
      <div className="ep-body">

        {/* ── LEFT: FORM PANEL ── */}
        <aside className="ep-panel-form">
          {/* Tabs */}
          <div className="ep-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`ep-tab ${activeTab === t.id ? 'ep-tab-active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="ep-form-scroll">
            {/* ══ TAB: INFO MEMPELAI ══ */}
            {activeTab === 'info' && (
              <div className="ep-section">
                <div className="ep-section-heading">Mempelai Pria</div>

                <Field label="Nama Singkat Pria">
                  <input value={data.groom} onChange={(e) => set('groom', e.target.value)} placeholder="Contoh: Diky" />
                </Field>
                <Field label="Nama Lengkap Pria">
                  <input value={data.groomFull} onChange={(e) => set('groomFull', e.target.value)} />
                </Field>
                <Field label="Orang Tua Pria">
                  <input value={data.groomParents} onChange={(e) => set('groomParents', e.target.value)} />
                </Field>

                <div className="ep-divider" />
                <div className="ep-section-heading">Mempelai Wanita</div>

                <Field label="Nama Singkat Wanita">
                  <input value={data.bride} onChange={(e) => set('bride', e.target.value)} placeholder="Contoh: Yuni" />
                </Field>
                <Field label="Nama Lengkap Wanita">
                  <input value={data.brideFull} onChange={(e) => set('brideFull', e.target.value)} />
                </Field>
                <Field label="Orang Tua Wanita">
                  <input value={data.brideParents} onChange={(e) => set('brideParents', e.target.value)} />
                </Field>

                <div className="ep-divider" />
                <div className="ep-section-heading">Detail Cover</div>

                <Field label="Tanggal (DD . MM . YYYY)">
                  <input value={data.date} onChange={(e) => set('date', e.target.value)} />
                </Field>
                <Field label="Hashtag">
                  <input value={data.hashtag} onChange={(e) => set('hashtag', e.target.value)} placeholder="#HashtagKalian" />
                </Field>
                <Field label="Kisah Pertemuan">
                  <textarea rows={4} value={data.story} onChange={(e) => set('story', e.target.value)} placeholder="Ceritakan kisah cinta kalian…" />
                </Field>

                <div className="ep-divider" />
                <div className="ep-section-heading">Kata-kata Romantis</div>
                <Field label="Quote / Kutipan Romantis">
                  <textarea rows={3} value={data.romantic || ''} onChange={(e) => set('romantic', e.target.value)} placeholder='"Dua jiwa, satu takdir…"' />
                </Field>
              </div>
            )}

            {/* ══ TAB: ACARA ══ */}
            {activeTab === 'event' && (
              <div className="ep-section">
                <div className="ep-section-heading">Akad Nikah</div>

                <Field label="Tanggal Akad">
                  <input value={data.akadDate} onChange={(e) => set('akadDate', e.target.value)} placeholder="Sabtu, 21 Mei 2026" />
                </Field>
                <Field label="Waktu Akad">
                  <input value={data.akadTime} onChange={(e) => set('akadTime', e.target.value)} placeholder="08.00 - 10.00 WIB" />
                </Field>
                <Field label="Tempat Akad">
                  <input value={data.akadVenue} onChange={(e) => set('akadVenue', e.target.value)} />
                </Field>
                <Field label="Alamat Akad">
                  <textarea rows={2} value={data.akadAddress} onChange={(e) => set('akadAddress', e.target.value)} />
                </Field>
                <Field label="📍 Google Maps URL (Akad)">
                  <div className="ep-map-row">
                    <input
                      value={akadMapInput}
                      onChange={(e) => setAkadMapInput(e.target.value)}
                      placeholder="Paste URL Google Maps…"
                    />
                    <button className="ep-btn-map" onClick={() => applyMap('akadMapUrl', akadMapInput, setAkadMapInput)}>
                      Terapkan
                    </button>
                  </div>
                  {data.akadMapUrl && data.akadMapUrl.includes('<iframe') && (
                    <MapConfirm onRemove={() => set('akadMapUrl', '')} />
                  )}
                </Field>

                <div className="ep-divider" />
                <div className="ep-section-heading">Resepsi Pernikahan</div>

                <Field label="Tanggal Resepsi">
                  <input value={data.resepsiDate} onChange={(e) => set('resepsiDate', e.target.value)} placeholder="Sabtu, 21 Mei 2026" />
                </Field>
                <Field label="Waktu Resepsi">
                  <input value={data.resepsiTime} onChange={(e) => set('resepsiTime', e.target.value)} placeholder="11.00 - 14.00 WIB" />
                </Field>
                <Field label="Tempat Resepsi">
                  <input value={data.resepsiVenue} onChange={(e) => set('resepsiVenue', e.target.value)} />
                </Field>
                <Field label="Alamat Resepsi">
                  <textarea rows={2} value={data.resepsiAddress} onChange={(e) => set('resepsiAddress', e.target.value)} />
                </Field>
                <Field label="📍 Google Maps URL (Resepsi)">
                  <div className="ep-map-row">
                    <input
                      value={resepsiMapInput}
                      onChange={(e) => setResepsiMapInput(e.target.value)}
                      placeholder="Paste URL Google Maps…"
                    />
                    <button className="ep-btn-map" onClick={() => applyMap('resepsiMapUrl', resepsiMapInput, setResepsiMapInput)}>
                      Terapkan
                    </button>
                  </div>
                  {data.resepsiMapUrl && data.resepsiMapUrl.includes('<iframe') && (
                    <MapConfirm onRemove={() => set('resepsiMapUrl', '')} />
                  )}
                </Field>
              </div>
            )}

            {/* ══ TAB: FOTO & MEDIA ══ */}
            {activeTab === 'media' && (
              <div className="ep-section">
                {/* Foto Mempelai Pria (slider[0]) */}
                <div className="ep-section-heading">📸 Foto Mempelai Pria</div>
                <PhotoUpload
                  label="Upload foto mempelai pria (tampil di kartu kiri)"
                  preview={data.photoSlider[0]?.preview}
                  accept="image/*"
                  onUpload={(file) =>
                    readFileAsDataURL(file).then((res) => {
                      const next = [...data.photoSlider];
                      next[0] = res;
                      set('photoSlider', next);
                    })
                  }
                  onRemove={() => {
                    const next = [...data.photoSlider];
                    next[0] = null;
                    set('photoSlider', next.filter(Boolean));
                  }}
                />

                <div className="ep-divider" />

                {/* Foto Mempelai Wanita (slider[1]) */}
                <div className="ep-section-heading">📸 Foto Mempelai Wanita</div>
                <PhotoUpload
                  label="Upload foto mempelai wanita (tampil di kartu kanan)"
                  preview={data.photoSlider[1]?.preview}
                  accept="image/*"
                  onUpload={(file) =>
                    readFileAsDataURL(file).then((res) => {
                      const next = [...data.photoSlider];
                      next[1] = res;
                      set('photoSlider', next);
                    })
                  }
                  onRemove={() => {
                    const next = [...data.photoSlider];
                    next[1] = null;
                    set('photoSlider', next.filter(Boolean));
                  }}
                />

                <div className="ep-divider" />

                {/* Galeri Foto */}
                <div className="ep-section-heading">🖼️ Galeri Foto (maks. 6)</div>
                <p className="ep-field-hint">Foto tampil di section galeri undangan</p>
                <div className="ep-gallery-upload">
                  <label className="ep-upload-btn">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => handlePhotos('photoGallery', e.target.files, 6)}
                    />
                    📤 Pilih Foto Galeri
                  </label>
                  <span className="ep-upload-count">{data.photoGallery.length}/6</span>
                </div>
                {data.photoGallery.length > 0 && (
                  <div className="ep-photo-grid">
                    {data.photoGallery.map((p, i) => (
                      <div key={i} className="ep-photo-thumb">
                        <img src={p.preview || p} alt={`gallery ${i}`} />
                        <button className="ep-photo-remove" onClick={() => removePhoto('photoGallery', i)}>×</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="ep-divider" />

                {/* Background Music */}
                <div className="ep-section-heading">🎵 Musik Latar</div>
                <PhotoUpload
                  label={data.backgroundMusic ? data.backgroundMusic.name : 'Upload musik MP3 (opsional)'}
                  isAudio
                  preview={data.backgroundMusic?.preview}
                  accept="audio/mpeg,audio/mp3,audio/*"
                  onUpload={(file) => handleFile('backgroundMusic', file)}
                  onRemove={() => set('backgroundMusic', null)}
                />

                <div className="ep-divider" />

                {/* YouTube */}
                <div className="ep-section-heading">🎬 Video YouTube</div>
                <Field label="Link YouTube (contoh: https://youtu.be/xxxxx)">
                  <input
                    value={data.youtubeUrl || ''}
                    onChange={(e) => set('youtubeUrl', e.target.value)}
                    placeholder="https://youtu.be/..."
                  />
                </Field>

                <div className="ep-divider" />

                {/* E-Angpao */}
                <div className="ep-section-heading">🧧 E-Angpao / Rekening</div>
                <BankManager
                  banks={data.banks || []}
                  onChange={(banks) => set('banks', banks)}
                />
              </div>
            )}

            {/* ══ TAB: TAMU UNDANGAN ══ */}
            {activeTab === 'guest' && (
              <GuestTab onCopy={copyGuestLink} coupleName={`${data.groom} & ${data.bride}`} />
            )}
          </div>

          {/* Bottom save bar */}
          <div className="ep-form-footer">
            <button className="ep-btn ep-btn-save ep-btn-full" onClick={handleSave} disabled={saving}>
              {saving ? '⏳ Menyimpan…' : '💾 Simpan Design'}
            </button>
          </div>
        </aside>

        {/* ── RIGHT: LIVE PREVIEW ── */}
        <main className="ep-panel-preview">
          <div className="ep-preview-bar">
            <span className="ep-preview-label">✦ Live Preview</span>
            <div className="ep-device-toggle">
              <button
                className={`ep-device-btn ${device === 'android' ? 'ep-device-active' : ''}`}
                onClick={() => setDevice('android')}
                title="Android"
              >
                <AndroidIcon /> Android
              </button>
              <button
                className={`ep-device-btn ${device === 'iphone' ? 'ep-device-active' : ''}`}
                onClick={() => setDevice('iphone')}
                title="iPhone"
              >
                <IphoneIcon /> iPhone
              </button>
            </div>
            <button className="ep-btn ep-btn-publish ep-btn-sm" onClick={handlePublish}>
              🔗 Fullscreen
            </button>
          </div>

          <div className="ep-preview-frame">
            <div className={`ep-device-shell ep-device-shell--${device}`}>
              {/* Device frame SVG */}
              {device === 'android' ? <AndroidFrame /> : <IphoneFrame />}
              {/* Screen content */}
              <div className="ep-device-screen">
                <div className="ep-device-scaler">
                  <JavaneseElegantTemplate
                    data={data}
                    isPreview={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="ep-field">
    <label className="ep-field-label">{label}</label>
    {children}
  </div>
);

const MapConfirm = ({ onRemove }) => (
  <div className="ep-map-confirm">
    <span>✅ Peta berhasil dimuat</span>
    <button onClick={onRemove}>🗑 Hapus</button>
  </div>
);

const PhotoUpload = ({ label, preview, accept, onUpload, onRemove, isAudio = false }) => {
  const id = React.useId();
  return (
    <div className="ep-photo-upload">
      {preview ? (
        <div className="ep-photo-preview-wrap">
          {isAudio ? (
            <audio src={preview} controls className="ep-audio-preview" />
          ) : (
            <img src={preview} alt="preview" className="ep-photo-preview-img" />
          )}
          <button className="ep-photo-remove-main" onClick={onRemove}>🗑 Hapus</button>
        </div>
      ) : (
        <label htmlFor={id} className="ep-upload-btn">
          📤 {label}
          <input id={id} type="file" accept={accept} style={{ display: 'none' }}
            onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
        </label>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   GUEST TAB
───────────────────────────────────────────────────────── */
const GuestTab = ({ onCopy, coupleName }) => {
  const [guestName, setGuestName] = useState('');
  const [guestList, setGuestList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('guestList') || '[]'); } catch { return []; }
  });
  const [newGuest, setNewGuest] = useState('');

  const addGuest = () => {
    if (!newGuest.trim()) return;
    const updated = [...guestList, { name: newGuest.trim(), id: Date.now() }];
    setGuestList(updated);
    localStorage.setItem('guestList', JSON.stringify(updated));
    setNewGuest('');
  };

  const removeGuest = (id) => {
    const updated = guestList.filter((g) => g.id !== id);
    setGuestList(updated);
    localStorage.setItem('guestList', JSON.stringify(updated));
  };

  return (
    <div className="ep-section">
      <div className="ep-section-heading">💌 Kirim Undangan Personal</div>
      <p className="ep-field-hint">
        Setiap tamu akan mendapat link undangan yang menampilkan nama mereka di halaman cover.
      </p>

      {/* Quick single link */}
      <div className="ep-guest-quick">
        <Field label="Nama Tamu (untuk cek cepat)">
          <div className="ep-map-row">
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Bapak & Ibu Santoso"
              onKeyDown={(e) => e.key === 'Enter' && onCopy(guestName)}
            />
            <button className="ep-btn-map" onClick={() => onCopy(guestName)}>
              Copy Link
            </button>
          </div>
        </Field>
        {guestName && (
          <p className="ep-link-preview">
            🔗 …/invitation/preview?to={encodeURIComponent(guestName)}
          </p>
        )}
      </div>

      <div className="ep-divider" />

      {/* Guest list manager */}
      <div className="ep-section-heading">📋 Daftar Tamu</div>
      <div className="ep-map-row" style={{ marginBottom: '0.75rem' }}>
        <input
          value={newGuest}
          onChange={(e) => setNewGuest(e.target.value)}
          placeholder="Tambah nama tamu…"
          onKeyDown={(e) => e.key === 'Enter' && addGuest()}
        />
        <button className="ep-btn-map" onClick={addGuest}>Tambah</button>
      </div>

      {guestList.length === 0 && (
        <p className="ep-field-hint ep-empty">Belum ada tamu ditambahkan.</p>
      )}

      <ul className="ep-guest-list">
        {guestList.map((g) => (
          <li key={g.id} className="ep-guest-item">
            <span className="ep-guest-name">👤 {g.name}</span>
            <div className="ep-guest-actions">
              <button className="ep-guest-copy" onClick={() => onCopy(g.name)}>
                📋 Copy Link
              </button>
              <button className="ep-guest-remove" onClick={() => removeGuest(g.id)}>
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      {guestList.length > 0 && (
        <p className="ep-field-hint" style={{ marginTop: '1rem' }}>
          Total {guestList.length} tamu terdaftar. Klik "Copy Link" untuk menyalin link personal masing-masing tamu.
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   BANK MANAGER — dynamic multi-bank entries
───────────────────────────────────────────────────────────── */
const BankManager = ({ banks, onChange }) => {
  const addBank = () => onChange([...banks, { bank: '', account: '', holder: '' }]);
  const removeBank = (i) => onChange(banks.filter((_, idx) => idx !== i));
  const update = (i, field, val) => {
    const next = banks.map((b, idx) => idx === i ? { ...b, [field]: val } : b);
    onChange(next);
  };

  return (
    <div className="ep-bank-manager">
      {banks.map((b, i) => (
        <div key={i} className="ep-bank-entry">
          <div className="ep-bank-entry-header">
            <span className="ep-bank-entry-num">Rekening {i + 1}</span>
            <button className="ep-bank-remove" onClick={() => removeBank(i)} aria-label="Hapus rekening">✕</button>
          </div>
          <Field label="Nama Bank">
            <input value={b.bank} onChange={e => update(i, 'bank', e.target.value)} placeholder="Bank BCA / BRI / Mandiri / GoPay…" />
          </Field>
          <Field label="Nomor Rekening">
            <input value={b.account} onChange={e => update(i, 'account', e.target.value)} placeholder="1234567890" />
          </Field>
          <Field label="Atas Nama">
            <input value={b.holder} onChange={e => update(i, 'holder', e.target.value)} placeholder="Nama pemilik rekening" />
          </Field>
        </div>
      ))}
      {banks.length < 5 && (
        <button className="ep-bank-add" onClick={addBank}>
          + Tambah Rekening
        </button>
      )}
      {banks.length === 0 && (
        <p className="ep-field-hint ep-empty">Belum ada rekening. Klik "+ Tambah Rekening".</p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   DEVICE ICONS (toggle bar)
───────────────────────────────────────────────────────── */
const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M17.523 15.341A5.97 5.97 0 0 0 18 13a5.97 5.97 0 0 0-.477-2.341l1.847-1.066a.5.5 0 0 0-.5-.866L17.02 9.79A5.992 5.992 0 0 0 13 8V6h1a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2h1v2a5.992 5.992 0 0 0-4.02 1.79L5.13 8.727a.5.5 0 0 0-.5.866l1.847 1.066A5.97 5.97 0 0 0 6 13a5.97 5.97 0 0 0 .477 2.341L4.63 16.407a.5.5 0 0 0 .5.866l1.85-1.068A5.99 5.99 0 0 0 12 19a5.99 5.99 0 0 0 5.02-2.795l1.85 1.068a.5.5 0 0 0 .5-.866l-1.847-1.066ZM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>
);

const IphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-5 20a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H7V4h10v13Z"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   ANDROID FRAME SVG
   Pixel-style Android with flat top, thin bezels, pill notch
───────────────────────────────────────────────────────── */
const AndroidFrame = () => (
  <svg className="ep-frame-svg" viewBox="0 0 320 640" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <rect x="1" y="1" width="318" height="638" rx="36" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="2"/>
    {/* Screen area bg */}
    <rect x="10" y="10" width="300" height="620" rx="28" fill="#0d0d0d"/>
    {/* Punch-hole camera */}
    <circle cx="160" cy="30" r="7" fill="#1a1a1a"/>
    <circle cx="160" cy="30" r="4.5" fill="#0a0a0a"/>
    <circle cx="160" cy="30" r="2" fill="#111" opacity=".7"/>
    {/* Volume buttons left */}
    <rect x="-2" y="140" width="4" height="40" rx="2" fill="#2a2a2a"/>
    <rect x="-2" y="195" width="4" height="40" rx="2" fill="#2a2a2a"/>
    {/* Power button right */}
    <rect x="318" y="160" width="4" height="55" rx="2" fill="#2a2a2a"/>
    {/* Bottom chin */}
    <circle cx="160" cy="628" r="5" fill="#2a2a2a" opacity=".5"/>
    {/* Speaker grille bottom */}
    {[148,153,158,163,168,173].map(x => (
      <rect key={x} x={x} y="622" width="2" height="5" rx="1" fill="#333"/>
    ))}
    {/* Front camera ring glow */}
    <circle cx="160" cy="30" r="7" fill="none" stroke="#333" strokeWidth=".5"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   IPHONE FRAME SVG
   Dynamic Island style, titanium-look edges
───────────────────────────────────────────────────────── */
const IphoneFrame = () => (
  <svg className="ep-frame-svg" viewBox="0 0 320 640" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body with titanium gradient look */}
    <rect x="1" y="1" width="318" height="638" rx="44" fill="#1c1c1e" stroke="url(#titanium)" strokeWidth="2"/>
    <defs>
      <linearGradient id="titanium" x1="0" y1="0" x2="320" y2="640" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#4a4a4f"/>
        <stop offset="30%"  stopColor="#8a8a8e"/>
        <stop offset="60%"  stopColor="#3a3a3c"/>
        <stop offset="100%" stopColor="#6a6a6e"/>
      </linearGradient>
    </defs>
    {/* Screen */}
    <rect x="8" y="8" width="304" height="624" rx="38" fill="#000"/>
    {/* Dynamic Island */}
    <rect x="112" y="14" width="96" height="28" rx="14" fill="#1c1c1e"/>
    {/* Camera inside island */}
    <circle cx="175" cy="28" r="8" fill="#0a0a0a"/>
    <circle cx="175" cy="28" r="5" fill="#111"/>
    <circle cx="175" cy="28" r="2.5" fill="#0d0d0d"/>
    <circle cx="173" cy="26" r="1" fill="#333" opacity=".6"/>
    {/* Side buttons left — mute + volume */}
    <rect x="-2" y="120" width="4" height="28" rx="2" fill="#2a2a2a"/>
    <rect x="-2" y="165" width="4" height="42" rx="2" fill="#2a2a2a"/>
    <rect x="-2" y="215" width="4" height="42" rx="2" fill="#2a2a2a"/>
    {/* Power button right */}
    <rect x="318" y="160" width="4" height="65" rx="2" fill="#2a2a2a"/>
    {/* Bottom speaker */}
    {[138,143,148,153,158,163,168,173,178,183].map(x => (
      <rect key={x} x={x} y="624" width="2" height="5" rx="1" fill="#333"/>
    ))}
    {/* Lightning / USB-C port */}
    <rect x="148" y="628" width="24" height="6" rx="3" fill="#0d0d0d"/>
    {/* Bottom mic holes */}
    <circle cx="135" cy="631" r="2" fill="#222"/>
    <circle cx="185" cy="631" r="2" fill="#222"/>
  </svg>
);

export default EditorPage;
