// routes/auth.js
const express = require('express');
const { RegisterUser, LoginUser } = require('../controllers/Login&Reg.js'); 
const router = express.Router();

// Registration endpoint
router.post('/register', RegisterUser);

// Login endpoint
router.post('/login', LoginUser);


module.exports = router;
