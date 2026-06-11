import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import User from '../src/models/User.js';

await connectDB();
await User.deleteOne({ email: 'admin@example.com' });
await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'Password123!', role: 'admin', targetRole: 'Software Engineer' });
console.log('Seeded admin@example.com / Password123!');
await mongoose.disconnect();
