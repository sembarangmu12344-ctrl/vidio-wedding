import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './EditorPage.css';
import './EditorPage-additions.css';

const EditorPage = () => {
  const { templateId } = useParams();
  
  const [editorData, setEditorData] = useState({
    // Info Mempelai
    groom: 'Raden Mas Diky',
    bride: 'Raden Ayu Yuni',
    date: '21 . 05 . 2026',
    hashtag: '#PilihansatutujuAn',
    groomFull: 'Raden Mas Diky Pratama Putra',
    brideFull: 'Raden Ayu Yuni Anggraini Putri',
    groomParents: 'Putra dari Bapak Ahmad Wijaya & Ibu Siti Nurhaliza',
    brideParents: 'Putri dari Bapak Budi Santoso & Ibu Dewi Sartika',
    story: 'Pertemuan kami dimulai dari sebuah kebetulan indah di sebuah acara keluarga. Dari situ, kami menyadari bahwa jodoh memang sudah digariskan oleh Yang Maha Kuasa.',
    
    // Akad Nikah
    akadDate: 'Sabtu, 21 Mei 2026',
    akadTime: '08.00 - 10.00 WIB',
    akadVenue: 'Kediaman Mempelai Wanita',
    akadAddress: 'Jl. Malioboro No. 123, Yogyakarta',
    
    // Resepsi
    resepsiDate: 'Sabtu, 21 Mei 2026',
    resepsiTime: '11.00 - 14.00 WIB',
    resepsiVenue: 'Pendopo Agung Taman Sari',
    resepsiAddress: 'Jl. Taman Sari No. 456, Yogyakarta',
    
    theme: templateId || 'javanese-elegant'
  });

  const [activeTab, setActiveTab] = useState('info');
  const [previewMode, setPreviewMode] = useState('desktop');

  const handleInputChange = (field, value) => {
    setEditorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving invitation data:', editorData);
    alert('Undangan berhasil disimpan!');
  };

  const handlePublish = () => {
    console.log('Publishing invitation:', editorData);
    alert('Undangan berhasil dipublikasikan!');
  };

  return (
    <div className="editor-page">
      {/* Header */}
      <header className="editor-header">
        <div className="header-left">
          <Link to="/templates" className="back-link">← Kembali</Link>
          <h2 className="editor-title">Edit Undangan Digital</h2>
        </div>
        <div className="header-right">
          <button className="btn-preview" onClick={handleSave}>
            💾 Simpan
          </button>
          <button className="btn-publish" onClick={handlePublish}>
            ✨ Publish
          </button>
        </div>
      </header>

      <div className="editor-container">
        {/* Sidebar - Editor Panel */}
        <aside className="editor-sidebar">
          <div className="editor-tabs">
            <button 
              className={`tab ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              📝 Info Mempelai
            </button>
            <button 
              className={`tab ${activeTab === 'event' ? 'active' : ''}`}
              onClick={() => setActiveTab('event')}
            >
              📅 Detail Acara
            </button>
            <button 
              className={`tab ${activeTab === 'media' ? 'active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              🎬 Video & Musik
            </button>
            <button 
              className={`tab ${activeTab === 'theme' ? 'active' : ''}`}
              onClick={() => setActiveTab('theme')}
            >
              🎨 Tema & Warna
            </button>
          </div>

          <div className="editor-content">
            {/* Info Mempelai Tab */}
            {activeTab === 'info' && (
              <div className="editor-section">
                <h3>Informasi Mempelai</h3>
                
                <div className="info-alert">
                  <p>ℹ️ <strong>Template Javanese Elegant</strong> sudah dilengkapi dengan foto, video intro, dan musik gamelan tradisional.</p>
                </div>

                <div className="form-group">
                  <label>Nama Mempelai Pria (Singkat)</label>
                  <input
                    type="text"
                    value={editorData.groom}
                    onChange={(e) => handleInputChange('groom', e.target.value)}
                    placeholder="Contoh: Diky"
                  />
                </div>

                <div className="form-group">
                  <label>Nama Lengkap Mempelai Pria</label>
                  <input
                    type="text"
                    value={editorData.groomFull}
                    onChange={(e) => handleInputChange('groomFull', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Orang Tua Mempelai Pria</label>
                  <input
                    type="text"
                    value={editorData.groomParents}
                    onChange={(e) => handleInputChange('groomParents', e.target.value)}
                  />
                </div>

                <div className="divider"></div>

                <div className="form-group">
                  <label>Nama Mempelai Wanita (Singkat)</label>
                  <input
                    type="text"
                    value={editorData.bride}
                    onChange={(e) => handleInputChange('bride', e.target.value)}
                    placeholder="Contoh: Yuni"
                  />
                </div>

                <div className="form-group">
                  <label>Nama Lengkap Mempelai Wanita</label>
                  <input
                    type="text"
                    value={editorData.brideFull}
                    onChange={(e) => handleInputChange('brideFull', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Orang Tua Mempelai Wanita</label>
                  <input
                    type="text"
                    value={editorData.brideParents}
                    onChange={(e) => handleInputChange('brideParents', e.target.value)}
                  />
                </div>

                <div className="divider"></div>

                <div className="form-group">
                  <label>Tanggal (Format: DD . MM . YYYY)</label>
                  <input
                    type="text"
                    value={editorData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Hashtag</label>
                  <input
                    type="text"
                    value={editorData.hashtag}
                    onChange={(e) => handleInputChange('hashtag', e.target.value)}
                    placeholder="#HashtagUnik"
                  />
                </div>

                <div className="form-group">
                  <label>Kisah Pertemuan Kami</label>
                  <textarea
                    value={editorData.story}
                    onChange={(e) => handleInputChange('story', e.target.value)}
                    rows="4"
                    placeholder="Ceritakan kisah pertemuan Anda..."
                  />
                </div>
              </div>
            )}

            {/* Detail Acara Tab */}
            {activeTab === 'event' && (
              <div className="editor-section">
                <h3>Detail Acara</h3>
                
                <h4 className="sub-heading">Akad Nikah</h4>
                <div className="form-group">
                  <label>Tanggal Akad</label>
                  <input
                    type="text"
                    value={editorData.akadDate}
                    onChange={(e) => handleInputChange('akadDate', e.target.value)}
                    placeholder="Contoh: Sabtu, 21 Mei 2026"
                  />
                </div>

                <div className="form-group">
                  <label>Waktu Akad</label>
                  <input
                    type="text"
                    value={editorData.akadTime}
                    onChange={(e) => handleInputChange('akadTime', e.target.value)}
                    placeholder="Contoh: 08.00 - 10.00 WIB"
                  />
                </div>

                <div className="form-group">
                  <label>Tempat Akad</label>
                  <input
                    type="text"
                    value={editorData.akadVenue}
                    onChange={(e) => handleInputChange('akadVenue', e.target.value)}
                    placeholder="Nama gedung atau tempat akad"
                  />
                </div>

                <div className="form-group">
                  <label>Alamat Akad</label>
                  <textarea
                    value={editorData.akadAddress}
                    onChange={(e) => handleInputChange('akadAddress', e.target.value)}
                    rows="3"
                    placeholder="Alamat lengkap tempat akad"
                  />
                </div>

                <div className="divider"></div>

                <h4 className="sub-heading">Resepsi Pernikahan</h4>
                <div className="form-group">
                  <label>Tanggal Resepsi</label>
                  <input
                    type="text"
                    value={editorData.resepsiDate}
                    onChange={(e) => handleInputChange('resepsiDate', e.target.value)}
                    placeholder="Contoh: Sabtu, 21 Mei 2026"
                  />
                </div>

                <div className="form-group">
                  <label>Waktu Resepsi</label>
                  <input
                    type="text"
                    value={editorData.resepsiTime}
                    onChange={(e) => handleInputChange('resepsiTime', e.target.value)}
                    placeholder="Contoh: 11.00 - 14.00 WIB"
                  />
                </div>

                <div className="form-group">
                  <label>Tempat Resepsi</label>
                  <input
                    type="text"
                    value={editorData.resepsiVenue}
                    onChange={(e) => handleInputChange('resepsiVenue', e.target.value)}
                    placeholder="Nama gedung atau tempat resepsi"
                  />
                </div>

                <div className="form-group">
                  <label>Alamat Resepsi</label>
                  <textarea
                    value={editorData.resepsiAddress}
                    onChange={(e) => handleInputChange('resepsiAddress', e.target.value)}
                    rows="3"
                    placeholder="Alamat lengkap tempat resepsi"
                  />
                </div>
              </div>
            )}

            {/* Video & Musik Tab - REMOVED, built-in di template */}
            {activeTab === 'media' && (
              <div className="editor-section">
                <h3>Media Template</h3>
                
                <div className="info-box success">
                  <p>✨ <strong>Template Javanese Elegant sudah dilengkapi dengan:</strong></p>
                  <ul>
                    <li>🎬 Video intro animasi gunungan wayang (15 detik)</li>
                    <li>🎵 Musik gamelan tradisional Jawa (auto-loop)</li>
                    <li>📸 Foto couple dengan frame tradisional</li>
                    <li>🖼️ Galeri 4 foto dengan ornamen batik</li>
                  </ul>
                </div>

                <div className="media-preview">
                  <div className="media-item">
                    <div className="media-icon">🎬</div>
                    <h4>Video Intro</h4>
                    <p>javanese-intro.mp4</p>
                    <small>Animasi gunungan dengan ornamen Jawa</small>
                  </div>

                  <div className="media-item">
                    <div className="media-icon">🎵</div>
                    <h4>Background Music</h4>
                    <p>javanese-gamelan.mp3</p>
                    <small>Musik gamelan yang lembut</small>
                  </div>

                  <div className="media-item">
                    <div className="media-icon">📸</div>
                    <h4>Foto Mempelai</h4>
                    <p>2 foto couple</p>
                    <small>Frame tradisional dengan ornamen emas</small>
                  </div>

                  <div className="media-item">
                    <div className="media-icon">🖼️</div>
                    <h4>Galeri</h4>
                    <p>4 foto prewedding</p>
                    <small>Layout grid dengan hover effect</small>
                  </div>
                </div>

                <div className="info-box">
                  <p>💡 <strong>Tips:</strong> Semua media sudah terintegrasi sempurna dengan desain template Javanese Elegant. Anda hanya perlu mengisi informasi teks dan detail acara.</p>
                </div>
              </div>
            )}

            {/* Tema & Warna Tab */}
            {activeTab === 'theme' && (
              <div className="editor-section">
                <h3>Tema & Warna</h3>
                
                <div className="info-box">
                  <p>🎨 <strong>Template Javanese Elegant</strong> menggunakan palet warna tradisional Jawa yang elegan.</p>
                </div>

                <div className="template-preview-box">
                  <img src="https://via.placeholder.com/350x500/8B7355/FFFFFF?text=Javanese+Elegant+Template" alt="Template Preview" />
                  <div className="template-info">
                    <h4>Javanese Elegant</h4>
                    <ul>
                      <li>✅ Video intro animasi gunungan</li>
                      <li>✅ Musik gamelan tradisional</li>
                      <li>✅ Ornamen batik & wayang</li>
                      <li>✅ Font tradisional Jawa</li>
                      <li>✅ Foto couple built-in</li>
                      <li>✅ Galeri foto 4 items</li>
                    </ul>
                  </div>
                </div>

                <div className="divider"></div>

                <h4 className="sub-heading">Warna Template</h4>
                <div className="color-palette">
                  <div className="color-item">
                    <div className="color-box" style={{background: '#8B7355'}}></div>
                    <p>Primary</p>
                    <small>#8B7355</small>
                  </div>
                  <div className="color-item">
                    <div className="color-box" style={{background: '#C9A961'}}></div>
                    <p>Gold</p>
                    <small>#C9A961</small>
                  </div>
                  <div className="color-item">
                    <div className="color-box" style={{background: '#C9B8A8'}}></div>
                    <p>Accent</p>
                    <small>#C9B8A8</small>
                  </div>
                  <div className="color-item">
                    <div className="color-box" style={{background: '#2C2420'}}></div>
                    <p>Dark</p>
                    <small>#2C2420</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main - Preview Panel */}
        <main className="editor-preview">
          <div className="preview-controls">
            <button 
              className={`preview-btn ${previewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setPreviewMode('desktop')}
            >
              🖥️ Desktop
            </button>
            <button 
              className={`preview-btn ${previewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setPreviewMode('mobile')}
            >
              📱 Mobile
            </button>
          </div>

          <div className={`preview-frame ${previewMode}`}>
            <motion.div 
              className="preview-content"
              key={JSON.stringify(editorData)}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mini Preview */}
              <div className="mini-cover">
                <div className="butterfly-mini">🦋</div>
                <div className="butterfly-mini" style={{top: '60%', right: '15%'}}>🦋</div>
                
                <div className="mini-content">
                  <p className="mini-label">The Wedding of</p>
                  <h1 className="mini-groom">{editorData.groom}</h1>
                  <div className="mini-amp">&</div>
                  <h1 className="mini-bride">{editorData.bride}</h1>
                  <p className="mini-date">{editorData.date}</p>
                  <p className="mini-hashtag">{editorData.hashtag}</p>
                </div>
              </div>

              <div className="preview-info">
                <p>👆 Preview akan update secara real-time</p>
                <Link to="/invitation/preview" className="btn-preview-full">
                  Lihat Preview Lengkap
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditorPage;
