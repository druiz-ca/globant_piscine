# 🛠️ ServiceDeskAI - Useful Commands

## 🚀 Quick Start

```bash
# Start everything with Docker
./start.sh

# Or manually
docker-compose up --build
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build --force-recreate

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend

# Execute command in running container
docker-compose exec backend npm run dev
docker-compose exec frontend npm start

# Seed database
docker-compose exec backend node src/seed.js

# Access MongoDB shell
docker-compose exec mongo mongosh servicedeskai
```

## 📦 NPM Commands

### Backend
```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Seed database (MongoDB must be running)
node src/seed.js
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 🗄️ MongoDB Commands

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/servicedeskai

# Show collections
show collections

# Find all users
db.users.find()

# Find all tickets
db.tickets.find()

# Find all offices
db.offices.find()

# Count documents
db.tickets.countDocuments()

# Drop database (careful!)
db.dropDatabase()

# Create index
db.tickets.createIndex({ location: "2dsphere" })
```

## 🧹 Clean Up Commands

```bash
# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Remove package-lock files
rm backend/package-lock.json frontend/package-lock.json

# Clear npm cache
npm cache clean --force

# Remove Docker containers and images
docker-compose down --rmi all

# Clean Docker system
docker system prune -a
```

## 🔍 Debugging Commands

```bash
# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :27017 # MongoDB

# Kill process on port
lsof -ti:3000 | xargs kill -9

# Check Docker container status
docker ps

# Check Docker container logs
docker logs <container_id>

# Enter Docker container shell
docker exec -it <container_id> /bin/sh

# Check environment variables in container
docker-compose exec backend env
docker-compose exec frontend env
```

## 📊 Database Management

```bash
# Export database
mongodump --db servicedeskai --out ./backup

# Import database
mongorestore --db servicedeskai ./backup/servicedeskai

# Export collection to JSON
mongoexport --db servicedeskai --collection tickets --out tickets.json

# Import collection from JSON
mongoimport --db servicedeskai --collection tickets --file tickets.json
```

## 🧪 Testing Commands

```bash
# Test backend API
curl http://localhost:5000/api/health

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/tickets

# Create a test user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","phone":"1234567890"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@globant.com","password":"admin123"}'
```

## 🔄 Git Commands

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Complete ServiceDeskAI implementation"

# Create .gitignore from template
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
build/
dist/
EOF

# Check status
git status

# View changes
git diff
```

## 📱 Mobile Testing

```bash
# Find local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Or on some systems
ip addr show | grep "inet " | grep -v 127.0.0.1

# Update frontend .env with your IP
echo "REACT_APP_API_URL=http://YOUR_IP:5000" > frontend/.env
echo "REACT_APP_SOCKET_URL=http://YOUR_IP:5000" >> frontend/.env
```

## 🔐 Security Commands

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Hash a password (in Node REPL)
node
const bcrypt = require('bcryptjs');
bcrypt.hash('password123', 10).then(hash => console.log(hash));
```

## 📈 Performance Commands

```bash
# Check Node.js memory usage
node --max-old-space-size=4096 src/server.js

# Profile frontend build
npm run build -- --profile

# Analyze bundle size
npx source-map-explorer 'build/static/js/*.js'
```

## 🎯 Quick Fixes

```bash
# Port 3000 already in use
lsof -ti:3000 | xargs kill -9 && npm start

# MongoDB connection refused
sudo systemctl start mongodb && npm run dev

# Docker containers won't start
docker-compose down -v && docker system prune -f && docker-compose up --build

# Frontend won't compile
rm -rf node_modules package-lock.json && npm install && npm start

# Permission denied
sudo chown -R $USER:$USER . && chmod -R 755 .
```

## 📝 Useful Aliases (Add to ~/.zshrc or ~/.bashrc)

```bash
# ServiceDeskAI aliases
alias sd-start="cd ~/Documents/globant_piscine/ServiceDeskAI/ex00 && docker-compose up"
alias sd-stop="cd ~/Documents/globant_piscine/ServiceDeskAI/ex00 && docker-compose down"
alias sd-logs="cd ~/Documents/globant_piscine/ServiceDeskAI/ex00 && docker-compose logs -f"
alias sd-seed="cd ~/Documents/globant_piscine/ServiceDeskAI/ex00 && docker-compose exec backend node src/seed.js"
alias sd-clean="cd ~/Documents/globant_piscine/ServiceDeskAI/ex00 && docker-compose down -v && docker system prune -f"
```

## 🌐 Browser Testing

```bash
# Open in default browser
open http://localhost:3000  # macOS
xdg-open http://localhost:3000  # Linux

# Test with different users (open multiple browsers)
google-chrome --new-window --incognito http://localhost:3000
firefox --private-window http://localhost:3000
```

## 💡 Pro Tips

```bash
# Watch backend logs for errors
docker-compose logs -f backend | grep -i error

# Monitor MongoDB queries
mongosh --eval "db.setProfilingLevel(2)"

# Check API response time
curl -w "@-" -o /dev/null -s http://localhost:5000/api/health <<'EOF'
    time_total:  %{time_total}s\n
EOF

# Restart only one service
docker-compose restart backend

# Scale service (multiple instances)
docker-compose up --scale backend=3
```

---

**Keep these commands handy! 🚀**
