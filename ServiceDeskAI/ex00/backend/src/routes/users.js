const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadPhoto,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.put('/photo', protect, upload.single('photo'), uploadPhoto);

router
  .route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
