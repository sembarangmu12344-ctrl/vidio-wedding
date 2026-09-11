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
    // Add small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      console.log('🎬 JavaneseIntro GSAP animation starting');

      // Ensure all refs exist
      if (!gununganRef.current || !textRef.current || !namesRef.current) {
        console.error('❌ Some refs are not ready');
        return;
      }

      // GSAP Master Timeline - Cinematic Opening
      const masterTL = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          console.log('✅ GSAP animation complete - transitioning to main invitation');
          if (onComplete) {
            setTimeout(onComplete, 300);
          }
        }
      });

      // === INITIAL STATE ===
      gsap.set(containerRef.current, { 
        opacity: 1, 
        visibility: 'visible',
        scale: 1 
      });
      
      gsap.set(gununganRef.current, { 
        opacity: 0, 
        scale: 0.3, 
        rotation: -15,
        y: 50 
      });
      
      gsap.set([ornament1Ref.current, ornament2Ref.current, ornament3Ref.current], { 
        opacity: 0, 
        scale: 0,
        rotation: -45 
      });
      
      gsap.set(textRef.current, { 
        opacity: 0, 
        y: 100,
        scale: 0.8 
      });
      
      gsap.set(namesRef.current.children, { 
        opacity: 0, 
        y: 120,
        scale: 0.9 
      });

      // === SCENE 1: Gunungan Grand Entrance (2.5s) ===
      masterTL.to(gununganRef.current, {
        scale: 1,
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 2.5,
        ease: 'expo.out'
      }, 0.3);

      // Gunungan subtle breathing effect
      masterTL.to(gununganRef.current, {
        scale: 1.02,
        duration: 1.5,
        yoyo: true,
        repeat: 2,
        ease: 'sine.inOut'
      }, 1.5);

      // === SCENE 2: Ornamen Cascade (Staggered) ===
      masterTL.to(ornament1Ref.current, {
        scale: 1,
        rotation: 360,
        opacity: 0.8,
        duration: 1.2,
        ease: 'back.out(2.5)'
      }, 1.5);

      masterTL.to(ornament2Ref.current, {
        scale: 1,
        rotation: -360,
        opacity: 0.8,
        duration: 1.2,
        ease: 'back.out(2.5)'
      }, 1.8);

      masterTL.to(ornament3Ref.current, {
        scale: 1,
        rotation: 360,
        opacity: 0.8,
        duration: 1.2,
        ease: 'back.out(2.5)'
      }, 2.1);

      // Ornamen floating animation
      masterTL.to([ornament1Ref.current, ornament2Ref.current, ornament3Ref.current], {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.3
      }, 2.5);

      // === SCENE 3: Sacred Text Reveal ===
      masterTL.to(textRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out'
      }, 2.8);

      // Text glow effect
      masterTL.to(textRef.current, {
        filter: 'drop-shadow(0 0 20px rgba(201, 169, 97, 0.8))',
        duration: 0.8,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      }, 3.5);

      // === SCENE 4: Couple Names Grand Reveal (Staggered) ===
      masterTL.to(namesRef.current.children, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.4,
        duration: 1.8,
        ease: 'elastic.out(1, 0.6)'
      }, 3.5);

      // Names shine effect
      masterTL.to(namesRef.current.children, {
        textShadow: '0 0 30px rgba(201, 169, 97, 1), 0 0 60px rgba(201, 169, 97, 0.5)',
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
        stagger: 0.2
      }, 5);

      // === SCENE 5: Hold & Breathe (2s) ===
      masterTL.to({}, { duration: 2 });

      // === SCENE 6: Majestic Exit - Gunungan splits open ===
      
      // Gunungan scale up & fade
      masterTL.to(gununganRef.current, {
        scale: 1.3,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        ease: 'power3.in'
      });

      // Ornamen scatter away
      masterTL.to(ornament1Ref.current, {
        x: -200,
        y: -150,
        rotation: 720,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.in'
      }, '-=1.2');

      masterTL.to(ornament2Ref.current, {
        x: 200,
        y: -150,
        rotation: -720,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.in'
      }, '-=1.2');

      masterTL.to(ornament3Ref.current, {
        y: 200,
        rotation: 540,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.in'
      }, '-=1.2');

      // Text ascends to heaven
      masterTL.to([textRef.current, namesRef.current], {
        y: -200,
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: 'power3.in'
      }, '-=1.2');

      // === SCENE 7: Gate Opening Effect - Split dari tengah ===
      masterTL.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        duration: 1,
        ease: 'power4.inOut'
      }, '-=0.5');

      // Final fade
      masterTL.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');

      console.log('📊 Total animation duration:', masterTL.duration(), 'seconds');

      return () => {
        masterTL.kill();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
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
