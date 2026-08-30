# 💍 Wedding Invitation Builder

Platform pembuat undangan pernikahan digital yang elegan dengan video intro cinematik dan editor template interaktif.

## ✨ Fitur Utama

- 🎬 **Video Intro Cinematik** - Opening dengan animasi 3D dan transisi smooth
- ✏️ **Editor Drag & Drop** - Customize template dengan mudah
- 🎨 **Template Ikonik** - Pilihan desain tradisional & modern
- 🎵 **Background Music** - Musik latar dengan kontrol autoplay
- 📱 **Responsive Design** - Sempurna di semua perangkat
- 💌 **RSVP & Ucapan** - Konfirmasi kehadiran real-time
- 🦋 **Animasi Interaktif** - Elemen animasi yang memukau

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 atau lebih baru)
- MongoDB (optional, untuk database)
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd wedding-invitation-builder
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
```

4. **Start development server**
```bash
npm run dev
```

Server akan berjalan di:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Struktur Project

```
wedding-invitation-builder/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── pages/         # Halaman-halaman
│       │   ├── HomePage.js
│       │   ├── TemplateGallery.js
│       │   ├── EditorPage.js
│       │   └── InvitationView.js
│       ├── App.js
│       └── index.js
├── server/                # Express Backend
│   ├── models/           # MongoDB Models
│   ├── routes/           # API Routes
│   └── index.js
└── README.md
```

## 🎨 Tech Stack

### Frontend
- React.js 18
- Framer Motion (Animasi)
- GSAP (Animasi Advanced)
- React Router DOM
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (File Upload)
- Cloudinary (Optional - Cloud Storage)

## 📖 Cara Menggunakan

### 1. Pilih Template
- Kunjungi halaman utama
- Klik "Lihat Template"
- Pilih template favorit Anda

### 2. Edit Undangan
- Masukkan informasi mempelai
- Upload foto dan video intro
- Atur detail acara
- Pilih musik dan tema warna

### 3. Preview & Publish
- Lihat preview real-time
- Test di mode desktop & mobile
- Publish dan bagikan link

## 🎬 Format Media

### Video Intro
- Format: MP4, MOV, WebM
- Maksimal: 50MB
- Durasi: 5-15 detik
- Resolusi: 1080p (recommended)

### Background Music
- Format: MP3, WAV
- Maksimal: 10MB
- Format stereo recommended

### Foto
- Format: JPG, PNG, WebP
- Maksimal: 5MB per foto
- Resolusi: 1200x1600 (portrait)

## 🛠️ Development

### Run Frontend Only
```bash
cd client
npm start
```

### Run Backend Only
```bash
npm run server
```

### Run Tests
```bash
npm test
```

### Build for Production
```bash
cd client
npm run build
```

## 🌐 API Endpoints

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates/:id/use` - Increment usage count

### Invitations
- `GET /api/invitations` - Get all invitations
- `GET /api/invitations/:slug` - Get invitation by slug
- `POST /api/invitations` - Create new invitation
- `PUT /api/invitations/:slug` - Update invitation
- `POST /api/invitations/:slug/rsvp` - Submit RSVP

### Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files

## 🎯 Roadmap

- [ ] Authentication & User accounts
- [ ] Payment integration
- [ ] Custom domain support
- [ ] Email invitation sender
- [ ] Guest list management
- [ ] Analytics dashboard
- [ ] More template variations
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💬 Support

Jika ada pertanyaan atau butuh bantuan:
- Create an issue di GitHub
- Email: support@weddingbuilder.com

## 🎉 Credits

Dibuat dengan ❤️ untuk membantu pasangan menciptakan undangan digital yang memorable.

---

**Happy Wedding! 💑**
