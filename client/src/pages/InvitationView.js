import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JavaneseIntro from '../components/JavaneseIntro';
import './InvitationView.css';
import './InvitationView-javanese.css';

const InvitationView = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [showInvitation, setShowInvitation] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showOpenButton, setShowOpenButton] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);
  const [showGSAPIntro, setShowGSAPIntro] = useState(false);
  const audioRef = useRef(null);

  // Sample data - nanti bisa fetch dari API
  const invitationData = {
    groom: 'Raden Mas Diky',
    groomShort: 'Diky',
    groomFull: 'Raden Mas Diky Pratama Putra',
    groomParents: 'Putra dari Bapak Ahmad Wijaya & Ibu Siti Nurhaliza',
    groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    
    bride: 'Raden Ayu Yuni',
    brideShort: 'Yuni',
    brideFull: 'Raden Ayu Yuni Anggraini Putri',
    brideParents: 'Putri dari Bapak Budi Santoso & Ibu Dewi Sartika',
    bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    
    date: '21 . 05 . 2026',
    hashtag: '#PilihansatutujuAn',
    videoIntroUrl: `${process.env.PUBLIC_URL}/assets/video/javanese-intro.mp4`,
    musicUrl: `${process.env.PUBLIC_URL}/assets/music/javanese-gamelan.mp3`,
    theme: 'javanese-elegant',
    
    akad: {
      name: 'Akad Nikah',
      date: 'Sabtu, 21 Mei 2026',
      time: '08.00 - 10.00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Malioboro No. 123, Yogyakarta'
    },
    
    resepsi: {
      name: 'Resepsi Pernikahan',
      date: 'Sabtu, 21 Mei 2026',
      time: '11.00 - 14.00 WIB',
      venue: 'Pendopo Agung Taman Sari',
      address: 'Jl. Taman Sari No. 456, Yogyakarta'
    },
    
    story: 'Pertemuan kami dimulai dari sebuah kebetulan indah di sebuah acara keluarga. Dari situ, kami menyadari bahwa jodoh memang sudah digariskan oleh Yang Maha Kuasa.',
    
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop'
    ]
  };

  const handleOpenInvitation = () => {
    setShowOpenButton(false);
    setHasOpened(true);
    setShowGSAPIntro(true); // Show GSAP intro
    
    // Play audio after intro starts
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setAudioPlaying(true);
        }).catch(error => {
          console.log('Audio autoplay prevented:', error);
        });
      }
    }, 2000);
  };

  const handleIntroComplete = () => {
    // Transisi dari GSAP intro ke undangan
    setShowGSAPIntro(false);
    setShowVideo(false);
    setShowInvitation(true);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <div className="invitation-view">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={invitationData.musicUrl} type="audio/mpeg" />
      </audio>

      {/* Audio Control Button */}
      {hasOpened && (
        <button className="audio-control" onClick={toggleAudio}>
          {audioPlaying ? '🔊' : '🔇'}
        </button>
      )}

      <AnimatePresence mode="wait">
        {/* Open Button Overlay */}
        {showOpenButton && (
          <motion.div
            className="open-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="open-content">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="ornament-top">🌸</div>
                <h2 className="open-title">The Wedding of</h2>
                <h1 className="couple-names">
                  {invitationData.groom} & {invitationData.bride}
                </h1>
                <p className="open-date">{invitationData.date}</p>
                <button className="btn-open" onClick={handleOpenInvitation}>
                  Buka Undangan
                </button>
                <div className="ornament-bottom">🌸</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* GSAP Javanese Intro */}
        {showGSAPIntro && (
          <JavaneseIntro 
            onComplete={handleIntroComplete}
            coupleNames={{
              groom: invitationData.groomShort,
              bride: invitationData.brideShort
            }}
          />
        )}

        {/* Main Invitation */}
        {showInvitation && (
          <motion.div
            className="invitation-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Cover Section - Javanese Style */}
            <section className="cover-section javanese-style">
              {/* Batik Pattern Background */}
              <div className="batik-overlay"></div>
              
              {/* Gunungan Ornament - CSS Only */}
              <div className="gunungan-shape">
                <div className="gunungan-layer layer-1"></div>
                <div className="gunungan-layer layer-2"></div>
                <div className="gunungan-layer layer-3"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="javanese-ornament ornament-topleft">❀</div>
              <div className="javanese-ornament ornament-topright">❀</div>
              <div className="javanese-ornament ornament-bottomleft">❀</div>
              <div className="javanese-ornament ornament-bottomright">❀</div>
              
              <motion.div
                className="cover-content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <div className="decorative-frame javanese-frame">
                  {/* Bismillah */}
                  <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
                  <p className="cover-subtitle">Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:</p>
                  
                  <div className="divider-ornament">❈</div>
                  
                  <h1 className="cover-groom">{invitationData.groomShort}</h1>
                  <div className="ampersand">&</div>
                  <h1 className="cover-bride">{invitationData.brideShort}</h1>
                  
                  <div className="divider-ornament">❈</div>
                  
                  <p className="cover-date">{invitationData.date}</p>
                  <p className="cover-hashtag">{invitationData.hashtag}</p>
                  
                  <div className="scroll-indicator">
                    <span>↓</span>
                    <p>Scroll untuk melihat undangan</p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Quran Verse */}
            <section className="quran-section section">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="quran-card"
              >
                <div className="quran-ornament">❈</div>
                <p className="quran-arabic">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا</p>
                <p className="quran-latin">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."</p>
                <p className="quran-source">- QS. Ar-Rum: 21 -</p>
                <div className="quran-ornament">❈</div>
              </motion.div>
            </section>

            {/* Couple Section - Javanese Style */}
            <section className="couple-section section javanese-couple">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Mempelai</h2>
                <p className="section-subtitle">Yang berbahagia</p>
                
                <div className="couple-grid">
                  {/* Groom */}
                  <motion.div 
                    className="couple-card javanese-card"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div className="javanese-photo-frame">
                      <div className="photo-ornament top">❀</div>
                      <div className="photo-ornament bottom">❀</div>
                      <div className="couple-photo">
                        <img src={invitationData.groomPhoto} alt="Mempelai Pria" />
                      </div>
                    </div>
                    <h3 className="couple-name">{invitationData.groomFull}</h3>
                    <p className="couple-parents">{invitationData.groomParents}</p>
                  </motion.div>

                  {/* Ampersand Divider */}
                  <div className="couple-divider">
                    <div className="divider-ornament">❈</div>
                    <div className="ampersand-large">&</div>
                    <div className="divider-ornament">❈</div>
                  </div>

                  {/* Bride */}
                  <motion.div 
                    className="couple-card javanese-card"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div className="javanese-photo-frame">
                      <div className="photo-ornament top">❀</div>
                      <div className="photo-ornament bottom">❀</div>
                      <div className="couple-photo">
                        <img src={invitationData.bridePhoto} alt="Mempelai Wanita" />
                      </div>
                    </div>
                    <h3 className="couple-name">{invitationData.brideFull}</h3>
                    <p className="couple-parents">{invitationData.brideParents}</p>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Love Story */}
            <section className="story-section section">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Kisah Kami</h2>
                <div className="story-card">
                  <div className="story-icon">💕</div>
                  <p className="story-text">{invitationData.story}</p>
                </div>
              </motion.div>
            </section>

            {/* Event Section - Javanese Style */}
            <section className="event-section section javanese-event">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Waktu & Tempat</h2>
                <p className="section-subtitle">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan</p>
                
                <div className="events-grid">
                  {/* Akad Nikah */}
                  <motion.div 
                    className="event-card javanese-event-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="event-icon">☪</div>
                    <h3 className="event-title">{invitationData.akad.name}</h3>
                    <div className="event-divider">❈</div>
                    <p className="event-date">{invitationData.akad.date}</p>
                    <p className="event-time">⏰ {invitationData.akad.time}</p>
                    <div className="event-location">
                      <p className="event-venue">📍 {invitationData.akad.venue}</p>
                      <p className="event-address">{invitationData.akad.address}</p>
                    </div>
                    <button className="btn-map">
                      <span>🗺️</span> Lihat Lokasi
                    </button>
                  </motion.div>

                  {/* Resepsi */}
                  <motion.div 
                    className="event-card javanese-event-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="event-icon">🎊</div>
                    <h3 className="event-title">{invitationData.resepsi.name}</h3>
                    <div className="event-divider">❈</div>
                    <p className="event-date">{invitationData.resepsi.date}</p>
                    <p className="event-time">⏰ {invitationData.resepsi.time}</p>
                    <div className="event-location">
                      <p className="event-venue">📍 {invitationData.resepsi.venue}</p>
                      <p className="event-address">{invitationData.resepsi.address}</p>
                    </div>
                    <button className="btn-map">
                      <span>🗺️</span> Lihat Lokasi
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section section">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Galeri Foto</h2>
                <div className="gallery-grid">
                  {invitationData.gallery.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="gallery-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <img src={photo} alt={`Gallery ${index + 1}`} />
                      <div className="gallery-overlay">
                        <span>❀</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* RSVP Section */}
            <section className="rsvp-section section">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="section-title">Konfirmasi Kehadiran</h2>
                <form className="rsvp-form">
                  <input type="text" placeholder="Nama Anda" />
                  <select>
                    <option value="">Jumlah Tamu</option>
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                  </select>
                  <select>
                    <option value="">Konfirmasi Kehadiran</option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                  <textarea placeholder="Ucapan & Doa"></textarea>
                  <button type="submit" className="btn btn-primary">Kirim</button>
                </form>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="invitation-footer">
              <p>Terima kasih atas doa dan kehadiran Anda</p>
              <p className="footer-names">{invitationData.groom} & {invitationData.bride}</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvitationView;
