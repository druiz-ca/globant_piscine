const express = require('express');
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addMessage,
  analyzeImage,
  getStatistics,
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/stats', protect, authorize('service-desk', 'admin'), getStatistics);

router
  .route('/')
  .get(protect, getTickets)
  .post(protect, upload.array('media', 5), createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, authorize('admin'), deleteTicket);

router.post('/:id/messages', protect, addMessage);
router.post('/:id/analyze-image', protect, analyzeImage);

module.exports = router;
