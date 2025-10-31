const Office = require('../models/Office');

// @desc    Get all offices
// @route   GET /api/offices
// @access  Private
exports.getOffices = async (req, res) => {
  try {
    const offices = await Office.find({ isActive: true }).sort('name');

    res.status(200).json({
      success: true,
      count: offices.length,
      data: offices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single office
// @route   GET /api/offices/:id
// @access  Private
exports.getOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ success: false, message: 'Office not found' });
    }

    res.status(200).json({ success: true, data: office });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new office
// @route   POST /api/offices
// @access  Private (Admin only)
exports.createOffice = async (req, res) => {
  try {
    const office = await Office.create(req.body);

    res.status(201).json({ success: true, data: office });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update office
// @route   PUT /api/offices/:id
// @access  Private (Admin only)
exports.updateOffice = async (req, res) => {
  try {
    const office = await Office.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!office) {
      return res.status(404).json({ success: false, message: 'Office not found' });
    }

    res.status(200).json({ success: true, data: office });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete office
// @route   DELETE /api/offices/:id
// @access  Private (Admin only)
exports.deleteOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ success: false, message: 'Office not found' });
    }

    // Soft delete
    office.isActive = false;
    await office.save();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get offices near location
// @route   GET /api/offices/nearby/:lng/:lat/:distance
// @access  Private
exports.getNearbyOffices = async (req, res) => {
  try {
    const { lng, lat, distance } = req.params;

    const offices = await Office.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(distance) * 1000, // Convert km to meters
        },
      },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: offices.length,
      data: offices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
