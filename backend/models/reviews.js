const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review:{
        type: String, 
        require: true,
    },
    meal: {
        type:String, 
        require: true,
    },
    date:{
        type: String, 
        required: true,
    },
    user:{
        type: String, 
        required: true,
    }, 
    userEmail:{
        type: String, 
        required: true,
    }, 
})

module.exports = mongoose.model('reviews', reviewSchema);