const bycryt = require('bcrypt');
const user = require('../models/user');
const {body, validationResult} = require('express-validator');

const handleRegistration = async(req, res) => {
    const errors = validationResult(req);
    console.log(errors)

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        await user.create({
            fullname : req.body.fullname, 
            email : req.body.email, 
            password : await bycryt.hash(req.body.password, 10).then(hash => { return hash }),
        })
        res.json({success:true});
    } catch (error) {
        console.log(error); 
        res.json({success:false})
    }
}

module.exports = {handleRegistration}