# 🚀 ServiceDeskAI - Installation Guide

## Quick Start (Recommended)

1. **Clone the repository**
```bash
cd /home/druiz-ca/Documents/globant_piscine/ServiceDeskAI/ex00
```

2. **Create environment files**
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend  
cp frontend/.env.example frontend/.env
```

3. **Start with Docker Compose**
```bash
docker-compose up --build
```

4. **Wait for services to start** (this may take a few minutes)
   - Backend will be available at: http://localhost:5000
   - Frontend will be available at: http://localhost:3000
   - MongoDB will be available at: localhost:27017

5. **Seed the database with sample offices** (optional)
```bash
docker-compose exec backend node src/seed.js
```

6. **Access the application**
   - Open your browser to: http://localhost:3000
   - Login with: `admin@globant.com` / `admin123`

## Manual Setup (Without Docker)

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git installed

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start MongoDB** (if not running)
```bash
# On Linux
sudo systemctl start mongodb

# On macOS
brew services start mongodb-community
```

5. **Run the backend**
```bash
npm run dev
```

### Frontend Setup

1. **Open new terminal and navigate to frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Start the frontend**
```bash
npm start
```

## 🧪 Testing the Application

### Create a Test User
1. Go to http://localhost:3000/register
2. Fill in the registration form
3. You'll be redirected to the dashboard

### Create a Test Ticket
1. Click "New Ticket" button
2. Fill in the form with:
   - Title: "Broken printer"
   - Description: "The printer on floor 2 is not working"
   - Category: Hardware
   - Priority: High
   - Office: Select any office
3. Click "Create Ticket"

### Test Real-time Chat
1. Open the ticket you created
2. Send a message in the chat
3. Open the same ticket in another browser (incognito mode)
4. Messages will appear in real-time

## 🎨 Features to Test

### ✅ Mandatory Features
- [x] User authentication (login/register)
- [x] Three user roles (user, service-desk, admin)
- [x] Create tickets with media upload
- [x] Geolocation capture
- [x] View ticket history
- [x] Profile management
- [x] Mobile-first responsive design

### ⭐ Bonus Features  
- [x] Real-time chat with Socket.io
- [x] Dark mode toggle
- [x] PWA offline capabilities
- [x] Admin panel
- [x] AI image analysis endpoint
- [x] Profile photo upload

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Remove volumes and rebuild
docker-compose down -v
docker-compose up --build --force-recreate
```

### Frontend Won't Start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Mobile Testing

### Test on Real Device
1. Find your computer's local IP address:
```bash
# Linux/macOS
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Update frontend .env:
```bash
REACT_APP_API_URL=http://YOUR_IP:5000
REACT_APP_SOCKET_URL=http://YOUR_IP:5000
```

3. Access from mobile browser: `http://YOUR_IP:3000`

### Install as PWA
1. Open the app on mobile Chrome/Safari
2. Click "Add to Home Screen" when prompted
3. App will install like a native app

## 🎯 User Roles and Permissions

### Standard User
- Create tickets
- View own tickets
- Upload media
- Chat on own tickets
- Edit profile

### Service Desk
- View all tickets
- Update ticket status
- Assign tickets
- Chat on all tickets
- Close tickets

### Admin
- All service desk permissions
- Create users
- Create offices
- View statistics
- Manage system settings

## 🔑 Default Credentials

After initial setup, you can login with:

**Admin Account:**
- Email: `admin@globant.com`
- Password: `admin123`

**Test the following workflows:**
1. Login as admin
2. Create a service desk user
3. Create a standard user
4. Logout and login as standard user
5. Create a ticket
6. Logout and login as service desk
7. Assign and update the ticket

## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user
- PUT `/auth/updatedetails` - Update user details
- PUT `/auth/updatepassword` - Update password

### Ticket Endpoints
- GET `/tickets` - Get all tickets
- POST `/tickets` - Create ticket
- GET `/tickets/:id` - Get ticket details
- PUT `/tickets/:id` - Update ticket
- DELETE `/tickets/:id` - Delete ticket (admin only)
- POST `/tickets/:id/messages` - Add message
- POST `/tickets/:id/analyze-image` - AI image analysis
- GET `/tickets/stats` - Get statistics (admin/service-desk)

### Office Endpoints
- GET `/offices` - Get all offices
- POST `/offices` - Create office (admin only)
- GET `/offices/:id` - Get office details
- PUT `/offices/:id` - Update office (admin only)
- DELETE `/offices/:id` - Delete office (admin only)

### User Endpoints (Admin Only)
- GET `/users` - Get all users
- POST `/users` - Create user
- GET `/users/:id` - Get user details
- PUT `/users/:id` - Update user
- DELETE `/users/:id` - Delete user
- PUT `/users/photo` - Upload profile photo

## 🌐 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

## 💡 Tips

1. **Use Chrome DevTools** to test responsive design
2. **Enable location services** for geolocation features
3. **Test dark mode** by clicking the moon icon
4. **Open in incognito** to test multiple user sessions
5. **Check browser console** for any errors

## 📞 Support

For issues or questions:
1. Check this guide
2. Review the main README.md
3. Check Docker logs: `docker-compose logs`
4. Ask your peers in the Piscine!

---

**Happy Testing! 🎉**
