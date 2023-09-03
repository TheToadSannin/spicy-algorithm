const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');

const {validationResult} = require('express-validator');

var jwt = require('jsonwebtoken');

const user_collection = mongoose.model('user');
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const handleLogin = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.json({msg:errors.array()[0].msg, success:false});
    }

    const {email, password} = req.body;

    try {
        const user_data = await user_collection.findOne({email:email});

        if(user_data === null)
        {
            return res.json({msg:"invalid Email/Password", success:false});
        }

        const isValidPass = await bcrypt.compare(password, user_data.password).then(res => {return res});
        console.log(isValidPass + ' password');

        if(isValidPass){
            let token = jwt.sign({_id: user_data._id, email: user_data.email }, PRIVATE_KEY);
            user_data.token = token;

            await user_data.save({validModifiedOnly:true});
            user_data.password = '';

            return res.json({msg: 'login successful', success: true, user: user_data, token: token})
        }
        res.json({msg: 'invalid username/password', success: false})

    } catch (error) {
        console.log(error);
        return res.json({msg: 'something went wrong', success: 'false'});
    }
}

module.exports = {handleLogin};