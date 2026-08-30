import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TemplateGallery.css';

const TemplateGallery = () => {
  const [filter, setFilter] = useState('all');

  const templates = [
    {
      id: 'javanese-elegant',
      name: 'Javanese Elegant',
      category: 'traditional',
      thumbnail: 'https://via.placeholder.com/400x600/8B7355/FFFFFF?text=Javanese+Elegant',
      description: 'Template elegan dengan ornamen Jawa klasik dan gerbang gunungan',
      features: ['Video 3D Intro', 'Animasi Kupu-kupu', 'Musik Gamelan']
    },
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      category: 'modern',
      thumbnail: 'https://via.placeholder.com/400x600/D4C5B9/333333?text=Modern+Minimalist',
      description: 'Desain minimalis modern dengan typography yang clean',
      features: ['Video Cinematic', 'Parallax Effect', 'Clean Layout']
    },
    {
      id: 'rustic-garden',
      name: 'Rustic Garden',
      category: 'nature',
      thumbnail: 'https://via.placeholder.com/400x600/A8B99C/FFFFFF?text=Rustic+Garden',
      description: 'Tema garden party dengan elemen natural dan floral',
      features: ['Video Floral', 'Animated Flowers', 'Natural Colors']
    },
    {
      id: 'luxury-gold',
      name: 'Luxury Gold',
      category: 'luxury',
      thumbnail: 'https://via.placeholder.com/400x600/C9A961/000000?text=Luxury+Gold',
      description: 'Kemewahan dengan aksen emas dan desain premium',
      features: ['Gold Animation', 'Premium Design', 'Elegant Typography']
    },
    {
      id: 'boho-chic',
      name: 'Boho Chic',
      category: 'modern',
      thumbnail: 'https://via.placeholder.com/400x600/E8C4A0/8B6F47?text=Boho+Chic',
      description: 'Bohemian style yang artistik dan free-spirited',
      features: ['Artistic Video', 'Watercolor Effect', 'Unique Layout']
    },
    {
      id: 'classic-royal',
      name: 'Classic Royal',
      category: 'luxury',
      thumbnail: 'https://via.placeholder.com/400x600/4A4A68/FFFFFF?text=Classic+Royal',
      description: 'Klasik royal dengan sentuhan kerajaan',
      features: ['Royal Video', 'Crown Elements', 'Elegant Frame']
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua Template' },
    { id: 'traditional', label: 'Tradisional' },
    { id: 'modern', label: 'Modern' },
    { id: 'nature', label: 'Natural' },
    { id: 'luxury', label: 'Mewah' }
  ];

  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(t => t.category === filter);

  return (
    <div className="template-gallery">
      {/* Header */}
      <div className="gallery-header">
        <Link to="/" className="back-button">← Kembali</Link>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="gallery-title">Pilih Template Favorit Anda</h1>
          <p className="gallery-subtitle">
            Koleksi template undangan digital yang elegan dan dapat dikustomisasi
          </p>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="gallery-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="templates-grid">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            className="template-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <div className="template-thumbnail">
              <img src={template.thumbnail} alt={template.name} />
              <div className="template-overlay">
                <Link to={`/editor/${template.id}`} className="btn btn-primary">
                  Gunakan Template
                </Link>
                <button className="btn btn-secondary">Preview</button>
              </div>
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <div className="template-features">
                {template.features.map((feature, i) => (
                  <span key={i} className="feature-tag">✨ {feature}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
