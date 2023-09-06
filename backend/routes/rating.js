const express = require('express')
const app = express();
const {body} = require('express-validator')
const ratingController = require("../controllers/ratingController.js");
const ratings = require('../models/rating.js');

const router = express.Router();

router.post('/submitRating',
[
    body('meal', 'invalid meal').isString(),
    body('userRating', 'invalid rating'),
    body('date', 'invalid date').isString(),

],
    ratingController.handleRatingSubmit
)

router.get('/getRatings', async(req, res)=>{
    try {
        const ratingDate = req.query.date;
        console.log("i'm rating date"+ratingDate);
        const response = await ratings.find({date: ratingDate});
        const allratings = response;
        res.json(allratings);
    } catch (error) {
        console.log(error, "cannot fetch ratings");
    }
}
)   

module.exports = router