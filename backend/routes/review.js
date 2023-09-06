const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const reviewController = require('../controllers/reviewController');

router.post('/submitReview', [
    body('reviewText', 'invalid review').isString(),
    body('meal', 'invalid meal').isString(),
    body('date', 'invalid date').isString(), 
    body('user', 'invalid user').isString(), 
    body('userEmail', 'invalid email').isString()
],
    reviewController.handleReviewSubmit,
)

module.exports = router