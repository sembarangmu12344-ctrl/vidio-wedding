const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  // Informasi Mempelai
  groom: {
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    parents: { type: String },
    photo: { type: String }
  },
  bride: {
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    parents: { type: String },
    photo: { type: String }
  },

  // Event Details
  event: {
    date: { type: String, required: true },
    dateFormatted: { type: String },
    time: { type: String },
    venue: {
      name: { type: String },
      address: { type: String },
      mapsUrl: { type: String }
    }
  },

  // Media
  media: {
    videoIntro: { type: String },
    music: { type: String },
    gallery: [{ type: String }]
  },

  // Design
  design: {
    template: { type: String, required: true },
    primaryColor: { type: String, default: '#8B7355' },
    accentColor: { type: String, default: '#C9A961' }
  },

  // Additional Info
  hashtag: { type: String },
  story: { type: String },
  
  // RSVP & Wishes
  rsvp: [{
    name: String,
    guests: Number,
    attendance: { type: String, enum: ['hadir', 'tidak'] },
    message: String,
    createdAt: { type: Date, default: Date.now }
  }],

  // Metadata
  slug: { type: String, unique: true, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  views: { type: Number, default: 0 },
  
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
invitationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Invitation', invitationSchema);
