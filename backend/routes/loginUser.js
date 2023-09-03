const express = require('express');
const app = express();
const {body} = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController')
const authMiddlerWare = require('../middleware/authMiddlerWare');

router.post('/loginUser', 
[
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password')
],
    authController.handleLogin
);

router.get("/isAuth", authMiddlerWare.mid_auth, (req, res) => {
    res.json({ userData: req.userData });
});

module.exports = router;