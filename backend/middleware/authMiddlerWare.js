const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const User = require('../models/user');

const mid_auth = async (req, res, next) => {
    console.log('mid auth req recieved');
    
    try {
        const token = req.headers['x-access-token'];
        let user = jwt.verify(token, PRIVATE_KEY);
        let userx = await User.findById(user._id).select('-password');

        req.userData = userx;
        if(userx)
        {
            console.log(userx);
        }
        else {
            console.log('user is not defined')
        }
        console.log('authentication successful');
        next();
    } catch (error) {
        console.log('auth error', error, req.headers);
        res.status(401).json({msg: 'authentication failed', erorr: error}); 
    }
};

module.exports = {mid_auth};