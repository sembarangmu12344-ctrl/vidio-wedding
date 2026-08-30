# 💍 Template Javanese Elegant

Template undangan pernikahan digital dengan konsep **Pernikahan Tradisional Jawa** yang elegan dan modern.

## ✨ Fitur Template

### 🎬 Video Intro
- **File**: `/client/public/assets/video/javanese-intro.mp4`
- Animasi gunungan/wayang dengan ornamen Jawa
- Durasi: 10-15 detik
- Transisi smooth ke undangan digital
- Auto-play setelah tombol "Buka Undangan"

### 🎵 Background Music
- **File**: `/client/public/assets/music/javanese-gamelan.mp3`
- Musik gamelan tradisional Jawa
- Auto-loop
- Kontrol audio manual (on/off)

### 🎨 Desain & Ornamen

#### Palet Warna
- **Primary**: `#8B7355` (Coklat Jawa)
- **Gold**: `#C9A961` (Emas Tradisional)
- **Accent**: `#C9B8A8` (Krem)
- **Dark**: `#2C2420` (Coklat Tua)

#### Ornamen Tradisional
- ✨ Gunungan animasi CSS (shape wayang)
- ❀ Motif flora Jawa
- ❈ Ornamen batik pattern
- 🌸 Border ornamental

### 📱 Sections

1. **Opening** - Button "Buka Undangan" dengan ornamen
2. **Video Intro** - Animasi cinematik
3. **Cover** - Bismillah + Nama pengantin
4. **Ayat Quran** - QS. Ar-Rum: 21
5. **Mempelai** - Foto couple dengan frame emas
6. **Kisah Pertemuan** - Love story
7. **Waktu & Tempat** - Akad + Resepsi (2 cards)
8. **Galeri Foto** - 4 foto grid
9. **RSVP** - Form konfirmasi kehadiran
10. **Ucapan** - Guest book
11. **Footer** - Thank you message

### 📸 Foto Built-in

#### Foto Mempelai (2 foto)
- Frame: Rounded-top dengan border emas
- Ornamen: Bunga atas & bawah
- Source: Unsplash (placeholder)
  - Pria: Professional portrait
  - Wanita: Professional portrait

#### Galeri (4 foto)
- Layout: Grid 2x2 responsive
- Hover effect: Overlay dengan ornamen
- Source: Unsplash (prewedding style)

## 🎯 Yang Bisa Di-edit

Pengguna **HANYA bisa edit informasi teks**:

### ✏️ Tab "Info Mempelai"
- Nama mempelai pria & wanita (singkat & lengkap)
- Nama orang tua
- Tanggal pernikahan
- Hashtag
- Kisah pertemuan

### ✏️ Tab "Detail Acara"
- **Akad Nikah**:
  - Tanggal & waktu
  - Tempat & alamat
- **Resepsi**:
  - Tanggal & waktu
  - Tempat & alamat

### 🚫 Yang TIDAK Bisa Di-edit
- ❌ Video intro (built-in)
- ❌ Background music (built-in)
- ❌ Foto mempelai (built-in)
- ❌ Galeri foto (built-in)
- ❌ Warna template (fixed palette)
- ❌ Layout & ornamen (fixed design)

## 🎬 Video & Musik Assets

### Video Intro (`javanese-intro.mp4`)
**Konsep Video:**
- Animasi 3D gunungan yang berputar
- Ornamen batik yang muncul bertahap
- Text reveal: "The Wedding of [Nama]"
- Background: Gradient coklat Jawa
- Transisi smooth ke undangan

**Spesifikasi:**
- Format: MP4 (H.264)
- Resolution: 1080x1920 (portrait) atau 1920x1080 (landscape)
- Duration: 10-15 detik
- Size: Maksimal 10MB
- FPS: 30

### Background Music (`javanese-gamelan.mp3`)
**Konsep Musik:**
- Gamelan Jawa yang lembut
- Tempo slow & romantic
- Instrumen: Gong, Kendang, Saron, Gender
- Loop seamless

**Spesifikasi:**
- Format: MP3
- Bitrate: 128kbps
- Duration: 2-3 menit (akan di-loop)
- Size: Maksimal 5MB

## 📂 Struktur File

```
client/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── gunungan-bg.svg        # Ornamen gunungan
│       │   └── batik-pattern.svg       # Pattern batik
│       ├── video/
│       │   └── javanese-intro.mp4     # ⚠️ PERLU FILE ASLI
│       └── music/
│           └── javanese-gamelan.mp3   # ⚠️ PERLU FILE ASLI
└── src/
    └── pages/
        ├── InvitationView.js          # Main invitation component
        ├── InvitationView.css         # Base styles
        └── InvitationView-javanese.css # Javanese specific styles
```

## 🎨 Contoh Implementasi

### Default Data
```javascript
{
  groom: 'Raden Mas Diky',
  groomFull: 'Raden Mas Diky Pratama Putra',
  groomParents: 'Putra dari Bapak Ahmad Wijaya & Ibu Siti Nurhaliza',
  
  bride: 'Raden Ayu Yuni',
  brideFull: 'Raden Ayu Yuni Anggraini Putri',
  brideParents: 'Putri dari Bapak Budi Santoso & Ibu Dewi Sartika',
  
  date: '21 . 05 . 2026',
  hashtag: '#PilihansatutujuAn',
  
  story: 'Pertemuan kami dimulai dari sebuah kebetulan indah...',
  
  akad: {
    date: 'Sabtu, 21 Mei 2026',
    time: '08.00 - 10.00 WIB',
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Malioboro No. 123, Yogyakarta'
  },
  
  resepsi: {
    date: 'Sabtu, 21 Mei 2026',
    time: '11.00 - 14.00 WIB',
    venue: 'Pendopo Agung Taman Sari',
    address: 'Jl. Taman Sari No. 456, Yogyakarta'
  }
}
```

## 🚀 Cara Menggunakan

1. **Akses Template**
   ```
   http://localhost:3000/templates
   ```

2. **Pilih "Javanese Elegant"**

3. **Edit di Editor**
   ```
   http://localhost:3000/editor/javanese-elegant
   ```

4. **Preview Hasil**
   ```
   http://localhost:3000/invitation/preview
   ```

## 🎯 Next Steps (Untuk Developer)

### Video Intro Real
Tambahkan file video asli di:
```
client/public/assets/video/javanese-intro.mp4
```

Atau gunakan tools seperti:
- After Effects - animasi 3D
- Blender - 3D modeling gunungan
- Canva Pro - video template

### Background Music Real
Tambahkan file musik gamelan di:
```
client/public/assets/music/javanese-gamelan.mp3
```

Sumber musik:
- Free: YouTube Audio Library, Pixabay
- Premium: AudioJungle, Epidemic Sound
- Recording: Rekam gamelan live

### Foto Custom
Ganti URL Unsplash dengan foto couple asli:
```javascript
groomPhoto: 'path/to/groom-photo.jpg',
bridePhoto: 'path/to/bride-photo.jpg',
gallery: ['photo1.jpg', 'photo2.jpg', ...]
```

## 📝 Catatan Penting

⚠️ **File Placeholder:**
- Video dan musik saat ini adalah placeholder
- Perlu diganti dengan file multimedia asli
- File SVG ornamen sudah berfungsi

✅ **Yang Sudah Siap:**
- Struktur HTML lengkap
- CSS styling sempurna
- Animasi interaktif
- Responsive design
- Editor interface

## 📱 Preview URL

- **Homepage**: http://localhost:3000
- **Template Gallery**: http://localhost:3000/templates
- **Editor**: http://localhost:3000/editor/javanese-elegant
- **Invitation**: http://localhost:3000/invitation/preview

---

**Created with ❤️ for Traditional Javanese Wedding**
