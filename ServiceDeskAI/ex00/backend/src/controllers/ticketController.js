const Ticket = require('../models/Ticket');
const axios = require('axios');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
exports.getTickets = async (req, res) => {
  try {
    let query = {};

    // Filter by user role
    if (req.user.role === 'user') {
      query.user = req.user.id;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    const tickets = await Ticket.find(query)
      .populate('user', 'name email profilePhoto')
      .populate('assignedTo', 'name email')
      .populate('office', 'name address')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email profilePhoto phone')
      .populate('assignedTo', 'name email phone')
      .populate('office')
      .populate('messages.user', 'name email profilePhoto')
      .populate('timeline.user', 'name email');

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Check if user owns ticket or is service desk/admin
    if (
      ticket.user._id.toString() !== req.user.id &&
      req.user.role !== 'service-desk' &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Handle media files
    if (req.files && req.files.length > 0) {
      req.body.media = req.files.map(file => ({
        type: file.mimetype.startsWith('image') ? 'image' : 'video',
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        uploadedAt: new Date(),
      }));
    }

    const ticket = await Ticket.create(req.body);

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('user', 'name email profilePhoto')
      .populate('office', 'name address');

    res.status(201).json({ success: true, data: populatedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
exports.updateTicket = async (req, res) => {
  try {
    console.log('🔄 Updating ticket:', req.params.id);
    console.log('📝 Request body:', req.body);
    console.log('👤 User:', req.user);
    
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      console.log('❌ Ticket not found');
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    console.log('✅ Ticket found:', ticket._id);

    // Check authorization
    if (
      ticket.user.toString() !== req.user.id &&
      req.user.role !== 'service-desk' &&
      req.user.role !== 'admin'
    ) {
      console.log('❌ Not authorized');
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Add timeline entry for status changes
    if (req.body.status && req.body.status !== ticket.status) {
      if (!ticket.timeline) {
        ticket.timeline = [];
      }
      
      ticket.timeline.push({
        action: 'status_changed',
        user: req.user.id,
        details: `Status changed from ${ticket.status} to ${req.body.status}`,
        timestamp: new Date()
      });

      if (req.body.status === 'resolved') {
        ticket.resolvedAt = new Date();
      }
      if (req.body.status === 'closed') {
        ticket.closedAt = new Date();
      }
    }

    // Add timeline entry for assignment
    if (req.body.assignedTo && req.body.assignedTo !== ticket.assignedTo) {
      if (!ticket.timeline) {
        ticket.timeline = [];
      }
      
      ticket.timeline.push({
        action: 'assigned',
        user: req.user.id,
        details: `Ticket assigned to user`,
        timestamp: new Date()
      });
    }

    // Update fields
    Object.assign(ticket, req.body);
    
    // Mark timeline as modified
    ticket.markModified('timeline');
    
    await ticket.save();

    ticket = await Ticket.findById(ticket._id)
      .populate('user', 'name email profilePhoto')
      .populate('assignedTo', 'name email')
      .populate('office', 'name address');

    console.log('✅ Ticket updated successfully');
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    console.error('❌ Error updating ticket:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private (Admin only)
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    await ticket.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add message to ticket
// @route   POST /api/tickets/:id/messages
// @access  Private
exports.addMessage = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    ticket.messages.push({
      user: req.user.id,
      message: req.body.message,
      isInternal: req.body.isInternal || false,
    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate('messages.user', 'name email profilePhoto');

    res.status(200).json({ success: true, data: updatedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Analyze ticket image with AI
// @route   POST /api/tickets/:id/analyze-image
// @access  Private
exports.analyzeImage = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (!ticket.media || ticket.media.length === 0) {
      return res.status(400).json({ success: false, message: 'No images to analyze' });
    }

    // Mock AI analysis - In production, use Google Cloud Vision or similar
    const mockAnalysis = {
      detectedObjects: ['computer', 'monitor', 'keyboard', 'mouse'],
      suggestedCategory: 'hardware',
      tags: ['workstation', 'equipment', 'office'],
      confidence: 0.85,
    };

    // Try to call stable-diffusion API if available
    try {
      const imageUrl = ticket.media[0].url;
      const response = await axios.post(
        'http://stable-diffusion.42malaga.com:7860/interrogator/analyze',
        { image_url: imageUrl },
        { timeout: 5000 }
      );
      
      if (response.data) {
        mockAnalysis.detectedObjects = response.data.objects || mockAnalysis.detectedObjects;
        mockAnalysis.tags = response.data.tags || mockAnalysis.tags;
      }
    } catch (apiError) {
      console.log('Using mock AI analysis');
    }

    ticket.aiAnalysis = mockAnalysis;
    await ticket.save();

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ticket statistics
// @route   GET /api/tickets/stats
// @access  Private (Admin/Service-desk)
exports.getStatistics = async (req, res) => {
  try {
    const stats = await Ticket.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const categoryStats = await Ticket.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: { $in: ['open', 'assigned', 'in-progress'] } });

    res.status(200).json({
      success: true,
      data: {
        total: totalTickets,
        open: openTickets,
        byStatus: stats,
        byCategory: categoryStats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
