const express = require('express');

const router = express.Router();

const {getMe,getUsers,registerUser,loginUser } = require('../../controllers/userController');
const {protect} = require('../../middleware/authMiddeware') 

router.get('/',registerUser);
router.post('/login',loginUser)
router.get('/me', protect,getMe)





module.exports = router;