#!/bin/bash
# Quick start script for ServiceDeskAI

echo "🍎 ServiceDeskAI - Quick Start"
echo "==============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env file..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env file..."
    cp frontend/.env.example frontend/.env
fi

echo "✅ Environment files ready"
echo ""

# Start Docker Compose
echo "🚀 Starting services with Docker Compose..."
echo ""
docker-compose up --build

# Note: After services start, you can seed the database with:
# docker-compose exec backend node src/seed.js
