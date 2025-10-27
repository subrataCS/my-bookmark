import express from 'express';
import { RegisterUser, LoginUser } from '../controllers/Login&Reg.js';
import { verifyToken } from '../middleware/verifyToken.js'; 

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user,
  });
});

export default router;
