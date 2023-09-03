const express = require('express')
const app = express();
const {body} = require('express-validator')
const ratingController = require("../controllers/ratingController.js");

const router = express.Router();

router.post('/submitRating',
[
    body('meal', 'invalid meal').isString(),
    body('userRating', 'invalid rating'),
    body('date', 'invalid date').isString(),

],
    ratingController.handleRatingSubmit
)

module.exports = router