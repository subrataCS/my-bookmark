import express from 'express'; 
import { RegisterUser, LoginUser } from '../controllers/Login&Reg.js'; 

const router = express.Router(); 

// Registration endpoint
router.post('/register', RegisterUser);

// Login endpoint
router.post('/login', LoginUser);

export default router;
