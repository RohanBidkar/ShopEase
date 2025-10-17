const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: "AirPods Pro",
    description: "Premium wireless earbuds with active noise cancellation and spatial audio",
    price: 16999,
    originalPrice: 20999,
    rating: 5,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop&crop=center",
    stock: 50
  },
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design and advanced camera system",
    price: 82999,
    rating: 5,
    category: "Phone",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    stock: 30
  },
  {
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with M3 chip for incredible performance and battery life",
    price: 107999,
    rating: 4,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center",
    stock: 20
  },
  {
    name: "Apple Watch Ultra",
    description: "Rugged smartwatch designed for adventure with precision GPS",
    price: 66499,
    rating: 4,
    category: "Watch",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop&crop=center",
    stock: 25
  },
  {
    name: "iPad Pro 12.9",
    description: "Professional tablet with M2 chip and Liquid Retina XDR display",
    price: 91499,
    originalPrice: 99999,
    rating: 5,
    category: "Tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center",
    stock: 15
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();