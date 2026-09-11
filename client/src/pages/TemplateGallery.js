import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TemplateGallery.css';

const templates = [
  {
    id: 'javanese-elegant',
    name: 'Javanese Elegant',
    icon: '🕌',
    desc: 'Template mewah bergaya Jawa klasik — ornamen batik, gunungan, animasi GSAP.',
    status: 'available',
    badge: '✨ Tersedia',
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    icon: '✨',
    desc: 'Desain bersih dan modern dengan tipografi elegan.',
    status: 'soon',
    badge: '🔜 Segera Hadir',
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    icon: '👑',
    desc: 'Mewah berlapis emas dengan sentuhan premium.',
    status: 'soon',
    badge: '🔜 Segera Hadir',
  },
  {
    id: 'floral-garden',
    name: 'Floral Garden',
    icon: '🌸',
    desc: 'Nuansa taman bunga yang romantis dan segar.',
    status: 'later',
    badge: '📅 Akan Datang',
  },
];

const TemplateGallery = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPackage = urlParams.get('package') || 'basic';

  const handleSelect = (tpl) => {
    if (tpl.status !== 'available') return;
    navigate(`/editor/${tpl.id}?package=${selectedPackage}`);
  };

  return (
    <div className="tg-root">
      {/* Header */}
      <div className="tg-header">
        <Link to="/" className="tg-back">← Kembali</Link>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="tg-title">Pilih Template Undangan</h1>
          <p className="tg-subtitle">Pilih template favoritmu, lalu sesuaikan isinya secara real-time</p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="tg-grid">
        {templates.map((tpl, i) => (
          <motion.div
            key={tpl.id}
            className={`tg-card ${tpl.status === 'available' ? 'tg-card-available' : 'tg-card-locked'}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onClick={() => handleSelect(tpl)}
          >
            <div className="tg-card-icon">{tpl.icon}</div>
            <div className="tg-badge">{tpl.badge}</div>
            <h2 className="tg-card-name">{tpl.name}</h2>
            <p className="tg-card-desc">{tpl.desc}</p>
            {tpl.status === 'available' ? (
              <button className="tg-btn-select">
                Gunakan Template →
              </button>
            ) : (
              <span className="tg-btn-locked">Belum tersedia</span>
            )}
          </motion.div>
        ))}
      </div>

      {selectedPackage && (
        <p className="tg-pkg-note">
          Paket terpilih: <strong className={`tg-pkg-${selectedPackage}`}>{selectedPackage.toUpperCase()}</strong>
        </p>
      )}
    </div>
  );
};

export default TemplateGallery;
