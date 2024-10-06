import mongoose from 'mongoose';

const InputDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    inputValue: { type: String, required: true }
});

// Create the model
const Input = mongoose.model('Input', InputDataSchema);

// Export the model
export default Input;
