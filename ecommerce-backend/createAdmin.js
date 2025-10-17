const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopease.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Admin user created successfully:');
    console.log('Email: admin@shopease.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin:', error);
    }
    process.exit(1);
  }
};

createAdmin();