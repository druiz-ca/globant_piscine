require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/database');

// Route files
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const officeRoutes = require('./routes/offices');
const userRoutes = require('./routes/users');

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'ServiceDeskAI API is running',
    timestamp: new Date().toISOString(),
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join ticket room
  socket.on('join-ticket', (ticketId) => {
    socket.join(`ticket-${ticketId}`);
    console.log(`User ${socket.id} joined ticket ${ticketId}`);
  });

  // Leave ticket room
  socket.on('leave-ticket', (ticketId) => {
    socket.leave(`ticket-${ticketId}`);
    console.log(`User ${socket.id} left ticket ${ticketId}`);
  });

  // Send message
  socket.on('send-message', (data) => {
    io.to(`ticket-${data.ticketId}`).emit('new-message', data);
  });

  // Ticket updated
  socket.on('ticket-updated', (data) => {
    io.emit('ticket-update', data);
  });

  // User typing
  socket.on('typing', (data) => {
    socket.to(`ticket-${data.ticketId}`).emit('user-typing', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
