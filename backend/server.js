const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const PORT = process.env.PORT || 7000
const Input = require('./models/InputData.js');
const authRoutes = require('./controllers/authRouter.js')
dotenv.config()


app.use(express.json());
    
// database connection 
const mongodb=()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected Successfully')
    }catch(err){
        console.error("Unable to connect database ",err)
    }
}
mongodb();

// Use the auth routes
app.use('/api/auth', authRoutes);

// create data 

app.post('/api/input',(req,res)=>{
    const data=req.body;

    try{
        const input=new Input(data)
        input.save();
         res.status(201).json({ message: 'Input created successfully', success: true, data });
    }catch(err){
        console.error('Error in creating input:', err);
        res.status(500).json({ message: 'Failed to create input', success: false, error: err.message });
    
    }
})


// Fetch all inputs
app.get('/api/inputs', async (req, res) => {
    try {
        const inputs = await Input.find({});
        res.status(200).json({ message: 'Inputs retrieved successfully', success: true, data: inputs });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve inputs', success: false, error: err.message });
    }
});


// Update input by ID
app.put('/api/inputs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedInput = await Input.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedInput) {
            return res.status(404).json({ message: 'Input not found', success: false });
        }
        
        res.status(200).json({ message: 'Input updated successfully', success: true, data: updatedInput });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update input', success: false, error: err.message });
    }
});


// Delete input by ID
app.delete('/api/inputs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedInput = await Input.findByIdAndDelete(id);
        
        if (!deletedInput) {
            return res.status(404).json({ message: 'Input not found', success: false });
        }
        
        res.status(200).json({ message: 'Input deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete input', success: false, error: err.message });
    }
});




app.get('/',(req,res)=>{
    res.send("Hello World")
})



app.listen(PORT,()=>{
    console.log(`Server is running in http://localhost:${process.env.PORT}`)
})