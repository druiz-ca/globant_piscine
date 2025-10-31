const mongoose = require('mongoose');

const OfficeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an office name'],
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
      default: [0, 0],
    },
  },
  floors: {
    type: Number,
    default: 1,
  },
  workstations: [{
    name: String,
    floor: Number,
    capacity: Number,
  }],
  amenities: [String],
  contactEmail: String,
  contactPhone: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Create geospatial index
OfficeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Office', OfficeSchema);
