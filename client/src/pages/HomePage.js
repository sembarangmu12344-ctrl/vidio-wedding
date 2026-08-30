import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-ornament top-left"></div>
        <div className="hero-ornament bottom-right"></div>
        
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="hero-title">
            Ciptakan Undangan Digital<br />
            Yang Tak Terlupakan
          </h1>
          <p className="hero-subtitle">
            Platform profesional untuk membuat undangan pernikahan digital<br />
            dengan video cinematik & animasi interaktif
          </p>
          <div className="hero-buttons">
            <Link to="/templates" className="btn btn-primary">
              Mulai Sekarang
            </Link>
            <Link to="/templates" className="btn btn-secondary">
              Lihat Template
            </Link>
          </div>
        </motion.div>

        {/* Animated butterflies */}
        <div className="butterfly butterfly-1">🦋</div>
        <div className="butterfly butterfly-2">🦋</div>
        <div className="butterfly butterfly-3">🦋</div>
      </motion.section>

      {/* Features Section */}
      <section className="features section">
        <h2 className="section-title">Fitur Unggulan</h2>
        <p className="section-subtitle">
          Semua yang Anda butuhkan untuk undangan digital yang sempurna
        </p>

        <div className="features-grid">
          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🎬</div>
            <h3>Video Intro Cinematik</h3>
            <p>Opening video yang stunning dengan animasi 3D dan transisi smooth ke undangan</p>
          </motion.div>

          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">✨</div>
            <h3>Editor Drag & Drop</h3>
            <p>Customize template dengan mudah, ubah teks, gambar, warna, dan elemen desain</p>
          </motion.div>

          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🎨</div>
            <h3>Template Ikonik</h3>
            <p>Pilihan template dengan desain elegan, modern, dan tradisional yang memukau</p>
          </motion.div>

          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🎵</div>
            <h3>Background Music</h3>
            <p>Tambahkan musik latar yang romantis dengan kontrol autoplay</p>
          </motion.div>

          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Tampilan sempurna di semua perangkat, mobile, tablet, dan desktop</p>
          </motion.div>

          <motion.div 
            className="feature-card card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">💌</div>
            <h3>RSVP & Ucapan</h3>
            <p>Terima konfirmasi kehadiran dan ucapan dari tamu undangan secara real-time</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Siap Membuat Undangan Digital Anda?</h2>
        <p>Mulai sekarang dan ciptakan momen yang berkesan</p>
        <Link to="/templates" className="btn btn-gold">
          Pilih Template
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Wedding Invitation Builder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
