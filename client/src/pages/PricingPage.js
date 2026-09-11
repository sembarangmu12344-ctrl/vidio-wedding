import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PricingPage.css';

const PricingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      originalPrice: 'Rp300.000',
      price: 'Rp100.000',
      discount: 'DISKON',
      color: '#8B7355',
      features: [
        { name: 'Jumlah Undangan', value: 'Unlimited', included: true },
        { name: 'Jumlah Acara', value: '1', included: true },
        { name: 'Peta Lokasi', value: true, included: true },
        { name: 'Foto Slider', value: '2 Foto', included: true },
        { name: 'Foto Galeri', value: '4 Foto', included: true },
        { name: 'Pilihan Desain', value: '4 Pilihan', included: true },
        { name: 'Video', value: false, included: false },
        { name: 'Countdown', value: false, included: false },
        { name: 'Buku Tamu', value: false, included: false },
        { name: 'Nama Tamu Undangan', value: false, included: false },
        { name: 'Amplop Digital', value: false, included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      originalPrice: 'Rp400.000',
      price: 'Rp200.000',
      discount: 'DISKON',
      color: '#C9A961',
      popular: true,
      features: [
        { name: 'Jumlah Undangan', value: 'Unlimited', included: true },
        { name: 'Jumlah Acara', value: '2', included: true },
        { name: 'Peta Lokasi', value: true, included: true },
        { name: 'Foto Slider', value: '4 Foto', included: true },
        { name: 'Foto Galeri', value: '4 Foto', included: true },
        { name: 'Pilihan Desain', value: '6 Pilihan', included: true },
        { name: 'Video', value: true, included: true },
        { name: 'Countdown', value: true, included: true },
        { name: 'Buku Tamu', value: true, included: true },
        { name: 'Nama Tamu Undangan', value: false, included: false },
        { name: 'Amplop Digital', value: false, included: false }
      ]
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      originalPrice: 'Rp600.000',
      price: 'Rp350.000',
      discount: 'DISKON',
      color: '#4A4A68',
      features: [
        { name: 'Jumlah Undangan', value: 'Unlimited', included: true },
        { name: 'Jumlah Acara', value: '3', included: true },
        { name: 'Peta Lokasi', value: true, included: true },
        { name: 'Foto Slider', value: '6 Foto', included: true },
        { name: 'Foto Galeri', value: '8 Foto', included: true },
        { name: 'Pilihan Desain', value: '8 Pilihan', included: true },
        { name: 'Video', value: true, included: true },
        { name: 'Countdown', value: true, included: true },
        { name: 'Buku Tamu', value: true, included: true },
        { name: 'Nama Tamu Undangan', value: true, included: true },
        { name: 'Amplop Digital', value: true, included: true }
      ]
    }
  ];

  return (
    <div className="pricing-page">
      {/* Header */}
      <div className="pricing-header">
        <Link to="/" className="back-button">← Kembali</Link>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="pricing-title">Pilih Paket Undangan Digital</h1>
          <p className="pricing-subtitle">
            Harga spesial dengan fitur lengkap untuk hari istimewa Anda
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-container">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className={`pricing-card ${pkg.popular ? 'popular' : ''} ${selectedPackage === pkg.id ? 'selected' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="popular-badge">
                ⭐ Paling Populer
              </div>
            )}

            <div className="pricing-header-card">
              <h2 className="package-name">{pkg.name}</h2>
              <div className="price-section">
                <div className="original-price">{pkg.originalPrice}</div>
                <div className="discount-badge">{pkg.discount}</div>
              </div>
              <div className="current-price">{pkg.price}</div>
            </div>

            <div className="features-list">
              {pkg.features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`feature-item ${feature.included ? 'included' : 'excluded'}`}
                >
                  <div className="feature-icon">
                    {feature.included ? (
                      <span className="check-icon">✓</span>
                    ) : (
                      <span className="cross-icon">✗</span>
                    )}
                  </div>
                  <div className="feature-content">
                    <span className="feature-name">{feature.name}</span>
                    {typeof feature.value === 'string' && (
                      <span className="feature-value">{feature.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to={`/templates?package=${pkg.id}`}
              className="btn-select-package"
              style={{ backgroundColor: pkg.color }}
            >
              Pilih Paket {pkg.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <motion.div 
        className="whatsapp-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="cta-content">
          <div className="cta-icon">💬</div>
          <div className="cta-text">
            <h3>Butuh Bantuan?</h3>
            <p>Chat kami via WhatsApp untuk konsultasi gratis</p>
          </div>
        </div>
        <a 
          href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20paket%20undangan%20digital" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <span className="wa-icon">📱</span>
          Chat WhatsApp
        </a>
      </motion.div>

      {/* Footer */}
      <div className="pricing-footer">
        <p>© 2024 WeddingInvitation.id — Profesional & Terpercaya</p>
      </div>
    </div>
  );
};

export default PricingPage;
