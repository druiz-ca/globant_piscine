const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create default admin user if doesn't exist
    const User = require('../models/User');
    const adminExists = await User.findOne({ email: 'admin@globant.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@globant.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1234567890',
      });
      console.log('✅ Default admin user created');
    }

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
