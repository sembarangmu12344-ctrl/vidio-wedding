import React from 'react';
import './TemplateMockup.css';

const TemplateMockup = ({ templateId, templateName }) => {
  const mockups = {
    'javanese-elegant': {
      colors: {
        primary: '#8B7355',
        secondary: '#C9A961',
        accent: '#C9B8A8',
        dark: '#2C2420'
      },
      elements: (
        <>
          {/* Background Pattern */}
          <div className="mockup-bg" style={{
            background: 'linear-gradient(135deg, #C9B8A8 0%, #A89585 100%)'
          }}>
            <div className="batik-pattern"></div>
          </div>

          {/* Gunungan Shape */}
          <svg className="gunungan-mockup" viewBox="0 0 200 250" style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            opacity: 0.15
          }}>
            <defs>
              <linearGradient id="mockupGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A961" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B7355" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path 
              d="M100 25 L175 225 Q100 200 25 225 Z" 
              fill="url(#mockupGrad1)" 
              stroke="#C9A961"
              strokeWidth="2"
            />
          </svg>

          {/* Content */}
          <div className="mockup-content">
            <div className="mockup-ornament">❀</div>
            <div className="mockup-bismillah">بِسْمِ اللَّهِ</div>
            <div className="mockup-label">The Wedding of</div>
            <div className="mockup-name">Diky</div>
            <div className="mockup-amp">&</div>
            <div className="mockup-name">Yuni</div>
            <div className="mockup-date">21 . 05 . 2026</div>
            <div className="mockup-ornament">❀</div>
          </div>

          {/* Floating Elements */}
          <div className="mockup-float mockup-float-1">🦋</div>
          <div className="mockup-float mockup-float-2">🌸</div>
          <div className="mockup-float mockup-float-3">✿</div>
        </>
      )
    },

    'modern-minimalist': {
      colors: {
        primary: '#D4C5B9',
        secondary: '#333333',
        accent: '#999999',
        light: '#F5F5F5'
      },
      elements: (
        <>
          {/* Clean Background */}
          <div className="mockup-bg" style={{
            background: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)'
          }}>
            <div className="minimal-lines">
              <div className="line-h" style={{top: '20%', width: '40%'}}></div>
              <div className="line-h" style={{top: '80%', width: '40%', right: 0}}></div>
              <div className="line-v" style={{left: '15%', height: '30%'}}></div>
              <div className="line-v" style={{right: '15%', height: '30%', bottom: '10%'}}></div>
            </div>
          </div>

          {/* Content */}
          <div className="mockup-content">
            <div className="mockup-label" style={{
              fontSize: '14px',
              letterSpacing: '3px',
              color: '#999'
            }}>WEDDING INVITATION</div>
            
            <div className="mockup-name-modern">
              <span>DIKY</span>
              <span style={{fontSize: '32px', margin: '0 15px', color: '#D4C5B9'}}>&</span>
              <span>YUNI</span>
            </div>
            
            <div className="mockup-date" style={{
              fontSize: '16px',
              color: '#333',
              fontWeight: '300',
              letterSpacing: '2px'
            }}>MAY 21, 2026</div>

            <div className="mockup-divider"></div>
            
            <div className="mockup-quote" style={{
              fontSize: '12px',
              color: '#999',
              fontStyle: 'italic',
              maxWidth: '200px',
              margin: '15px auto 0'
            }}>
              "Two souls, one heart"
            </div>
          </div>
        </>
      )
    },

    'luxury-gold': {
      colors: {
        primary: '#C9A961',
        secondary: '#000000',
        accent: '#8B7B5B',
        dark: '#1A1A1A'
      },
      elements: (
        <>
          {/* Luxury Background */}
          <div className="mockup-bg" style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)'
          }}>
            <div className="luxury-pattern"></div>
          </div>

          {/* Gold Frame */}
          <div className="gold-frame">
            <svg width="100%" height="100%" style={{position: 'absolute'}}>
              <rect x="15" y="15" width="calc(100% - 30px)" height="calc(100% - 30px)" 
                fill="none" stroke="#C9A961" strokeWidth="2" opacity="0.6" />
              <rect x="20" y="20" width="calc(100% - 40px)" height="calc(100% - 40px)" 
                fill="none" stroke="#C9A961" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Crown Icon */}
          <div style={{
            position: 'absolute',
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '32px',
            filter: 'drop-shadow(0 0 10px rgba(201, 169, 97, 0.6))'
          }}>👑</div>

          {/* Content */}
          <div className="mockup-content">
            <div className="mockup-label" style={{
              fontSize: '12px',
              letterSpacing: '4px',
              color: '#C9A961',
              marginBottom: '15px'
            }}>LUXURY WEDDING</div>
            
            <div className="mockup-name" style={{
              fontSize: '36px',
              color: '#C9A961',
              fontFamily: 'serif',
              textShadow: '0 0 20px rgba(201, 169, 97, 0.4)'
            }}>Diky</div>
            
            <div className="mockup-amp" style={{
              fontSize: '28px',
              color: '#C9A961',
              margin: '10px 0'
            }}>&</div>
            
            <div className="mockup-name" style={{
              fontSize: '36px',
              color: '#C9A961',
              fontFamily: 'serif',
              textShadow: '0 0 20px rgba(201, 169, 97, 0.4)'
            }}>Yuni</div>
            
            <div className="mockup-ornament" style={{
              color: '#C9A961',
              margin: '15px 0'
            }}>❈</div>
            
            <div className="mockup-date" style={{
              fontSize: '14px',
              color: '#C9A961',
              letterSpacing: '2px'
            }}>21 MAY 2026</div>
          </div>

          {/* Sparkles */}
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">✨</div>
          <div className="sparkle sparkle-3">✨</div>
        </>
      )
    },

    'floral-garden': {
      colors: {
        primary: '#A8B99C',
        secondary: '#7D9B76',
        accent: '#C8D5B9',
        light: '#F0F4EC'
      },
      elements: (
        <>
          {/* Garden Background */}
          <div className="mockup-bg" style={{
            background: 'linear-gradient(135deg, #F0F4EC 0%, #E8F0E0 100%)'
          }}>
            <div className="floral-pattern">
              <div className="leaf leaf-1">🍃</div>
              <div className="leaf leaf-2">🌿</div>
              <div className="leaf leaf-3">🍃</div>
              <div className="leaf leaf-4">🌿</div>
            </div>
          </div>

          {/* Floral Frame */}
          <div className="floral-frame-top">
            <span>🌸</span>
            <span>🌺</span>
            <span>🌸</span>
          </div>
          <div className="floral-frame-bottom">
            <span>🌷</span>
            <span>🌻</span>
            <span>🌷</span>
          </div>

          {/* Content */}
          <div className="mockup-content">
            <div className="mockup-label" style={{
              fontSize: '14px',
              color: '#7D9B76',
              letterSpacing: '2px'
            }}>Garden Wedding</div>
            
            <div className="mockup-flower-icon" style={{
              fontSize: '28px',
              margin: '10px 0'
            }}>🌿</div>
            
            <div className="mockup-name" style={{
              fontSize: '32px',
              color: '#5A7A5C',
              fontFamily: 'serif'
            }}>Diky</div>
            
            <div className="mockup-amp" style={{
              fontSize: '24px',
              color: '#A8B99C',
              margin: '8px 0'
            }}>&</div>
            
            <div className="mockup-name" style={{
              fontSize: '32px',
              color: '#5A7A5C',
              fontFamily: 'serif'
            }}>Yuni</div>
            
            <div className="mockup-flower-icon" style={{
              fontSize: '28px',
              margin: '10px 0'
            }}>🌸</div>
            
            <div className="mockup-date" style={{
              fontSize: '14px',
              color: '#7D9B76',
              letterSpacing: '1px'
            }}>May 21, 2026</div>
          </div>

          {/* Butterflies */}
          <div className="butterfly-garden butterfly-1">🦋</div>
          <div className="butterfly-garden butterfly-2">🦋</div>
        </>
      )
    }
  };

  const currentMockup = mockups[templateId] || mockups['javanese-elegant'];

  return (
    <div className="template-mockup">
      {currentMockup.elements}
    </div>
  );
};

export default TemplateMockup;
