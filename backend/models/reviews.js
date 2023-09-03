const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName:{
        type: String, 
        required: true,
    }, 
    review:{
        type: String, 
        require: true,
    },
    meal:{
        type: String, 
        required: true,
    }, 
    date:{
        type: String, 
        required: true,
    }   
})

module.exports = mongoose.model('reviews', reviewSchema);