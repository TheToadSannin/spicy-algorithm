const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator')
const registerController = require("../controllers/registerController");

router.post("/createUser",
[
    body('fullname', 'Invalid Name').isString(),
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password')
],
    registerController.handleRegistration
)

module.exports = router;