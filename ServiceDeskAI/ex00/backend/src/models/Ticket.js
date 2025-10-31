const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  category: {
    type: String,
    enum: ['hardware', 'software', 'facility', 'network', 'other'],
    default: 'other',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in-progress', 'resolved', 'closed'],
    default: 'open',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
    required: true,
  },
  workstation: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: undefined,
    },
  },
  media: [{
    type: {
      type: String,
      enum: ['image', 'video'],
    },
    url: String,
    filename: String,
    uploadedAt: Date,
  }],
  aiAnalysis: {
    detectedObjects: [String],
    suggestedCategory: String,
    tags: [String],
    confidence: Number,
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isInternal: {
      type: Boolean,
      default: false,
    },
  }],
  timeline: [{
    action: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    details: String,
  }],
  resolvedAt: Date,
  closedAt: Date,
}, {
  timestamps: true,
});

// Create geospatial index (sparse allows null values)
TicketSchema.index({ location: '2dsphere' }, { sparse: true });

// Add timeline entry before saving
TicketSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timeline.push({
      action: 'created',
      user: this.user,
      details: 'Ticket created',
    });
  }
  next();
});

module.exports = mongoose.model('Ticket', TicketSchema);
