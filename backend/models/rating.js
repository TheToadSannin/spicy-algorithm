const mongoose = require('mongoose');

const {Schema } = mongoose;

const ratingSchema = new Schema({  

    meal:{
        type:String, 
        require:true
    },
    avgRating:{
        type: Number,
        required: true,
    },
    totalRating:{
        type: Number, 
        required: true,
    },
    date:{
        type: String, 
        required: true,
    },
},
{
    collection: "ratings"
}
);

module.exports = mongoose.model('rating', ratingSchema);