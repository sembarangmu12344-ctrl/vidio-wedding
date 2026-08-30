const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['traditional', 'modern', 'nature', 'luxury'],
    required: true 
  },
  thumbnail: { type: String, required: true },
  description: { type: String },
  features: [{ type: String }],
  
  // Default Design
  defaultColors: {
    primary: { type: String, default: '#8B7355' },
    secondary: { type: String, default: '#D4C5B9' },
    accent: { type: String, default: '#C9A961' }
  },

  // Assets
  assets: {
    videoIntro: { type: String },
    defaultMusic: { type: String },
    ornaments: [{ type: String }]
  },

  // Statistics
  usageCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema);
