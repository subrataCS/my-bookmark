import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register function for login form
export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Form validation
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: 'This email is already used in another account' });
    }

    // Adding salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user to the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log('New user saved', user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login function
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // Form validation
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, userEmail.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const payload = { userId: userEmail._id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
