import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './JavaneseIntro.css';

const JavaneseIntro = ({ onComplete, coupleNames }) => {
  const containerRef = useRef(null);
  const gununganRef = useRef(null);
  const ornament1Ref = useRef(null);
  const ornament2Ref = useRef(null);
  const ornament3Ref = useRef(null);
  const textRef = useRef(null);
  const namesRef = useRef(null);

  useEffect(() => {
    console.log('JavaneseIntro mounted');
    console.log('Refs:', {
      container: containerRef.current,
      gunungan: gununganRef.current,
      text: textRef.current,
      names: namesRef.current
    });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        console.log('GSAP animation complete');
        setTimeout(onComplete, 500);
      },
      onStart: () => {
        console.log('GSAP animation started');
      }
    });

    // Set initial states
    gsap.set([gununganRef.current, ornament1Ref.current, ornament2Ref.current, ornament3Ref.current, textRef.current, namesRef.current], {
      autoAlpha: 1
    });

    // Scene 1: Gunungan muncul dari kecil dengan rotate (2 detik)
    tl.from(gununganRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 2,
      ease: 'back.out(1.7)'
    }, 0.5);

    // Scene 2: Ornamen muncul bergantian
    tl.from(ornament1Ref.current, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)'
    }, '-=1.2');

    tl.from(ornament2Ref.current, {
      scale: 0,
      rotation: -360,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)'
    }, '-=0.6');

    tl.from(ornament3Ref.current, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)'
    }, '-=0.6');

    // Scene 3: Text "The Wedding of" fade in
    tl.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.4');

    // Scene 4: Nama mempelai muncul
    tl.from(namesRef.current.children, {
      y: 80,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

    // Scene 5: Pulse effect
    tl.to(gununganRef.current, {
      scale: 1.1,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '+=0.3');

    // Scene 6: Hold for 1 second
    tl.to({}, { duration: 1 });

    // Scene 7: Fade out
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: 'power2.in'
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="javanese-intro-container" ref={containerRef}>
      {/* Background pattern */}
      <div className="batik-bg"></div>

      {/* Main Gunungan */}
      <div className="gunungan-main" ref={gununganRef}>
        <svg viewBox="0 0 400 500" className="gunungan-svg">
          <defs>
            <linearGradient id="gunungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9A961" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B7355" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6B5D52" stopOpacity="1" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {/* Gunungan shape */}
          <path 
            d="M200 50 L350 450 Q200 400 50 450 Z" 
            fill="url(#gunungGrad)" 
            filter="url(#shadow)"
            stroke="#C9A961"
            strokeWidth="3"
          />
          
          {/* Inner layers */}
          <path 
            d="M200 100 L320 420 Q200 380 80 420 Z" 
            fill="rgba(201, 169, 97, 0.3)" 
            stroke="#C9A961"
            strokeWidth="2"
          />
          
          <path 
            d="M200 150 L290 390 Q200 360 110 390 Z" 
            fill="rgba(139, 115, 85, 0.4)" 
            stroke="#8B7355"
            strokeWidth="2"
          />

          {/* Ornamen dalam */}
          <circle cx="200" cy="250" r="50" fill="none" stroke="#C9A961" strokeWidth="2" opacity="0.5"/>
          <circle cx="200" cy="250" r="35" fill="none" stroke="#C9A961" strokeWidth="1.5" opacity="0.5"/>
          
          {/* Flora pattern */}
          <g opacity="0.6">
            <ellipse cx="150" cy="200" rx="15" ry="25" fill="#6B5D52" transform="rotate(-30 150 200)"/>
            <ellipse cx="250" cy="200" rx="15" ry="25" fill="#6B5D52" transform="rotate(30 250 200)"/>
            <ellipse cx="120" cy="300" rx="12" ry="22" fill="#6B5D52" transform="rotate(-45 120 300)"/>
            <ellipse cx="280" cy="300" rx="12" ry="22" fill="#6B5D52" transform="rotate(45 280 300)"/>
          </g>
        </svg>
      </div>

      {/* Ornamen bunga melayang */}
      <div className="floating-ornament ornament-1" ref={ornament1Ref}>
        <div className="flower-ornament">❀</div>
      </div>
      
      <div className="floating-ornament ornament-2" ref={ornament2Ref}>
        <div className="flower-ornament">❁</div>
      </div>
      
      <div className="floating-ornament ornament-3" ref={ornament3Ref}>
        <div className="flower-ornament">✿</div>
      </div>

      {/* Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}></div>
        ))}
      </div>

      {/* Text content */}
      <div className="intro-text-content">
        <div className="intro-label" ref={textRef}>
          <span className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
          <p>The Wedding of</p>
        </div>
        
        <div className="intro-names" ref={namesRef}>
          <h1 className="name-groom">{coupleNames.groom}</h1>
          <div className="ampersand-intro">&</div>
          <h1 className="name-bride">{coupleNames.bride}</h1>
        </div>
      </div>

      {/* Light rays */}
      <div className="light-rays">
        <div className="ray ray-1"></div>
        <div className="ray ray-2"></div>
        <div className="ray ray-3"></div>
      </div>
    </div>
  );
};

export default JavaneseIntro;
