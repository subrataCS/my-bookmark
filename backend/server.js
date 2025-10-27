import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Input from './models/InputData.js';
import authRoutes from './routes/authRouter.js';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

// ✅ Connect to Database
const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected Successfully');
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
};
mongodb();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ Create input
app.post('/api/input', async (req, res) => {
  try {
    const input = new Input(req.body);
    const savedInput = await input.save();
    res.status(201).json({
      message: 'Input created successfully',
      success: true,
      data: savedInput,
    });
  } catch (err) {
    console.error('Error in creating input:', err);
    res.status(500).json({
      message: 'Failed to create input',
      success: false,
      error: err.message,
    });
  }
});

// ✅ Fetch all inputs
app.get('/api/inputs', async (req, res) => {
  try {
    const inputs = await Input.find({});
    res.status(200).json({
      message: 'Inputs retrieved successfully',
      success: true,
      data: inputs,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to retrieve inputs',
      success: false,
      error: err.message,
    });
  }
});

// ✅ Update input
app.put('/api/inputs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInput = await Input.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInput) {
      return res.status(404).json({ message: 'Input not found', success: false });
    }
    res.status(200).json({
      message: 'Input updated successfully',
      success: true,
      data: updatedInput,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update input',
      success: false,
      error: err.message,
    });
  }
});

// ✅ Delete input
app.delete('/api/inputs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedInput = await Input.findByIdAndDelete(id);
    if (!deletedInput) {
      return res.status(404).json({ message: 'Input not found', success: false });
    }
    res.status(200).json({
      message: 'Input deleted successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete input',
      success: false,
      error: err.message,
    });
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
