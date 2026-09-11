import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './JavaneseLuxuryLanding.css';

const JavaneseLuxuryLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    // Loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowGate(true), 500);
      setTimeout(() => setShowGate(false), 4500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="javanese-luxury-landing">
      {/* Golden Glow Cursor */}
      <div 
        className="golden-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Floating Jasmine Petals */}
      <div className="jasmine-petals">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 15}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="luxury-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="loading-monogram"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="55" fill="none" stroke="#D6B980" strokeWidth="2" opacity="0.3" />
                <circle cx="60" cy="60" r="45" fill="none" stroke="#B89653" strokeWidth="1" opacity="0.5" />
                <text x="60" y="75" fontSize="48" fill="#D6B980" textAnchor="middle" fontFamily="serif">A&A</text>
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="loading-text"
            >
              Javanese Elegant Signature Collection
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gate Opening Animation */}
      <AnimatePresence>
        {showGate && (
          <motion.div
            className="gate-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="gate-left"
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            >
              <div className="gate-ornament">
                <div className="gunungan-gate"></div>
              </div>
            </motion.div>
            <motion.div
              className="gate-right"
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            >
              <div className="gate-ornament">
                <div className="gunungan-gate"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        className="hero-luxury"
        ref={heroRef}
        style={{ opacity }}
      >
        {/* Subtle Batik Pattern */}
        <div className="batik-kawung-pattern"></div>
        
        <div className="hero-content-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1.2 }}
            className="hero-text-luxury"
          >
            <motion.p 
              className="hero-label-luxury"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.3 }}
            >
              The Wedding Of
            </motion.p>

            <motion.h1 
              className="hero-names-luxury"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 1 }}
            >
              <span className="name-gold">ANDHIKA</span>
              <span className="ampersand-luxury">&</span>
              <span className="name-gold">AISYAH</span>
            </motion.h1>

            <motion.div
              className="gold-divider"
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 6, duration: 1 }}
            />

            <motion.p
              className="hero-tagline-luxury"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.3 }}
            >
              A Timeless Celebration of Love and Tradition
            </motion.p>

            <motion.div
              className="hero-buttons-luxury"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6.7 }}
            >
              <Link to="/invitation/preview" className="btn-luxury btn-primary-luxury">
                <span>View Demo</span>
                <div className="btn-shine"></div>
              </Link>
              <Link to="/pricing" className="btn-luxury btn-secondary-luxury">
                <span>Order Now</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Premium Phone Mockup */}
          <motion.div
            className="phone-mockup-luxury"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 5.8, duration: 1.2 }}
            style={{ y }}
          >
            <div className="phone-frame">
              <div className="phone-screen">
                {/* Mini invitation preview */}
                <div className="mini-invitation-preview">
                  <div className="mini-ornament">❀</div>
                  <p className="mini-bismillah">بِسْمِ اللَّهِ</p>
                  <p className="mini-label">The Wedding of</p>
                  <h3 className="mini-name">Andhika</h3>
                  <div className="mini-amp">&</div>
                  <h3 className="mini-name">Aisyah</h3>
                  <p className="mini-date">21 . 05 . 2026</p>
                </div>
              </div>
              <div className="phone-shadow"></div>
            </div>
            {/* Floating animation */}
            <motion.div
              className="phone-glow"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator-luxury"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p>Scroll to Explore</p>
          <div className="scroll-line"></div>
        </motion.div>
      </motion.section>

      {/* Continue with other sections... */}
      <div className="content-wrapper-luxury">
        {/* We'll add more sections in the CSS file */}
      </div>
    </div>
  );
};

export default JavaneseLuxuryLanding;
