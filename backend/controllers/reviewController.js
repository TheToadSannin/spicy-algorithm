const mongoose = require('mongoose');
const reviews = require('../models/reviews.js')
const {validationResult} = require('express-validator');

const handleReviewSubmit = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        await reviews.create({
            review: req.body.reviewText, 
            meal: req.body.meal, 
            date: req.body.date,
            user: req.body.user, 
            userEmail: req.body.userEmail
        })
        return res.json({msg: 'review submitted', success: true});
    } catch (error) {
        console.log(error);
        return res.json({msg: error, success: false});
    }
}

module.exports = {handleReviewSubmit};