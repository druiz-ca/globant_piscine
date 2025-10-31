import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  socket = null;

  connect() {
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  joinTicket(ticketId) {
    if (this.socket) {
      this.socket.emit('join-ticket', ticketId);
    }
  }

  leaveTicket(ticketId) {
    if (this.socket) {
      this.socket.emit('leave-ticket', ticketId);
    }
  }

  sendMessage(data) {
    if (this.socket) {
      this.socket.emit('send-message', data);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  onTicketUpdate(callback) {
    if (this.socket) {
      this.socket.on('ticket-update', callback);
    }
  }

  typing(data) {
    if (this.socket) {
      this.socket.emit('typing', data);
    }
  }

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('user-typing', callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
