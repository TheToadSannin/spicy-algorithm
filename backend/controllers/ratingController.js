const { validationResult } = require('express-validator');
const mongoose = require('mongoose')
const rating = require('../models/rating');
const rating_collection = mongoose.model('rating');

const handleRatingSubmit = async(req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const rating_data = await rating_collection.findOne({date: req.body.date, meal: req.body.meal});

        if(rating_data===null)
        {
            await rating.create({
                meal: req.body.meal, 
                avgRating: req.body.userRating,
                totalRating: 1, 
                date: req.body.date,
            })
            return res.json({msg: "rating created successfully",success:true});
        }
        else
        {
            const x = (rating_data.avgRating * rating_data.totalRating) + req.body.userRating;
            const newAvg = x/(rating_data.totalRating+1);
            console.log(x + " " + newAvg)
            const result = await rating.updateMany({
                date: req.body.date, 
                meal: req.body.meal
            },
                {
                    $set: {
                        avgRating: newAvg, 
                        totalRating: rating_data.totalRating + 1
                    },
                }
            )
            console.log('before')
            console.log(rating_data);
            console.log('after');
            console.log(result);
            return res.json({success:true, rating_data: result});
        }
    } catch (error) {
        console.log(error);
        return res.json({msg: "something went wrong", success:false});
    }
}

module.exports = {handleRatingSubmit};