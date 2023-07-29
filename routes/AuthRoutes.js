const express = require('express');
const { 
    loginUser,
    registerUser,
    resetUser,
    updateProfilePic,
    getUserDetails,
    updateProfilePage 
} = require('../controllers/AuthController.js');

const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserDetails)
router.put('/reset', resetUser)
router.put('/updateProfilePic', updateProfilePic)
router.put('/updateProfilePage/:id', updateProfilePage)
module.exports = router