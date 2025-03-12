// Tool to manually verify a token directly in the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

dotenv.config();

// Check if token is provided
const token = process.argv[2];
if (!token) {
  console.error('Please provide a token as an argument: node verify-token-manually.js YOUR_TOKEN');
  process.exit(1);
}

// Connect to the database
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB.');
    
    try {
      // Find the user with the token
      const user = await User.findOne({ verificationToken: token });
      
      if (!user) {
        console.error('No user found with this token.');
        process.exit(1);
      }
      
      console.log(`Found user: ${user.email}`);
      
      // Check if token is expired
      if (user.verificationExpires && user.verificationExpires < new Date()) {
        console.error('Token is expired. Expiry date:', user.verificationExpires);
        process.exit(1);
      }
      
      // Verify the user
      user.verified = true;
      user.verificationToken = undefined;
      user.verificationExpires = undefined;
      
      await user.save();
      console.log(`User ${user.email} has been successfully verified.`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
