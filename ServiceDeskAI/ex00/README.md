# 🍎 ServiceDeskAI - Apple Style Edition

> Because even AI knows the printer's always broken.

A modern, intelligent service desk application with Apple-inspired design, built for reporting and managing office issues with smart features like geolocation, AI image recognition, and real-time chat.

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - JWT-based authentication with role management
- 📱 **Mobile-First Design** - Apple-style responsive UI optimized for all devices
- ♿ **WCAG AA Accessible** - Fully accessible interface for all users
- 📍 **Geolocation** - Automatic location detection for incident reporting
- 📸 **Media Upload** - Support for photos and videos
- 📊 **Ticket Management** - Complete lifecycle from creation to closure
- 📧 **Email Sharing** - Share reports via email

### Bonus Features ⭐
- 💬 **Real-time Chat** - Socket.io powered in-app messaging
- 🤖 **AI Image Recognition** - Automatic object detection in uploaded images
- 🌙 **Dark Mode** - Beautiful dark theme
- 📴 **Offline Mode** - PWA with offline capabilities
- 👨‍💼 **Admin Dashboard** - Complete system management panel
- 📷 **Profile Photos** - Upload via file or camera

## 🎭 User Roles

1. **Standard User** - Create tickets, upload media, track status
2. **Service Desk** - Manage tickets, update status, chat with users
3. **Admin** - Full system access, user/office management, analytics

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io for real-time features
- Multer for file uploads

### Frontend
- React 18
- Redux Toolkit for state management
- Tailwind CSS for styling
- Socket.io Client
- PWA capabilities
- Geolocation API

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ServiceDeskAI/ex00
```

2. **Start with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Default Admin Account
```
Email: admin@globant.com
Password: admin123
```

## 📁 Project Structure

```
ex00/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   ├── uploads/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔧 Development Mode

### Run Backend Only
```bash
cd backend
npm install
npm run dev
```

### Run Frontend Only
```bash
cd frontend
npm install
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
- `POST /api/tickets/:id/analyze-image` - AI image analysis

### Users (Admin)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Offices (Admin)
- `GET /api/offices` - Get all offices
- `POST /api/offices` - Create office
- `PUT /api/offices/:id` - Update office
- `DELETE /api/offices/:id` - Delete office

## 🎨 Design Philosophy

This project follows Apple's design principles:
- **Simplicity** - Clean, intuitive interfaces
- **Clarity** - Clear visual hierarchy
- **Depth** - Subtle shadows and layering
- **Continuity** - Smooth transitions and animations
- **Feedback** - Immediate visual responses

## 🌙 Dark Mode

Toggle dark mode from the user menu. The preference is saved and persists across sessions.

## 📴 Offline Mode (PWA)

The app works offline and can be installed on your device:
1. Visit the app in a browser
2. Click "Install" when prompted
3. Use it like a native app!

## 🤖 AI Features

The app uses image recognition to automatically:
- Detect objects in uploaded images
- Suggest ticket categories
- Add relevant tags
- Improve ticket routing

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Production Build

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🔒 Security

- JWT tokens with secure HTTP-only cookies
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints
- File upload restrictions

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators
- ARIA labels

## 📝 Environment Variables

Create `.env` files in backend and frontend directories:

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://mongo:27017/servicedeskai
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Docker Issues
```bash
# Clean Docker cache
docker-compose down -v
docker system prune -a

# Rebuild from scratch
docker-compose up --build --force-recreate
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

**Made with ❤️ for Globant Piscine**
