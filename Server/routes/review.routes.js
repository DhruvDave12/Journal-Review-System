const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {getRequests, acceptArticle, rejectArticle, getCurrentlyReviewing, postPageWiseReview, postAuthorQuestionAnswers, handleFinalSubmission,getAllReviews, getReview} = require('../controllers/review.controller');


// @desc Get all review requests
// @method GET
// @path /review/requests
router.get('/requests', verifyAccessToken, getRequests);

// @desc Accept or reject the request
// @method POST
// @path /review/requests/accept/:articleID
router.post('/requests/accept/:articleID', verifyAccessToken, acceptArticle);

// @desc Reject the request
// @method POST
// @path /review/requests/reject/:articleID
router.post('/requests/reject/:articleID', verifyAccessToken, rejectArticle);

// @desc GET all currently reviewing articles
// @method GET
// @path /review/currently-reviewing
router.get('/currently-reviewing', verifyAccessToken, getCurrentlyReviewing);
// TODO -> GET A LIST OF ALL REVIEWS DONE BY THE USER

router.get('/all-reviews', verifyAccessToken, getAllReviews);



// TODO -> GET A SINGLE REVIEW DONE BY THE USER
router.get('/get-review/:id', verifyAccessToken, getReview);
// @desc Page wise review storage
// @method POST
// @path /review/page-review/:articleID
router.post('/page-review/:articleID', verifyAccessToken, postPageWiseReview);

// @desc Submit author questions and answer api
// @method POST
// @path /review/author-question-answers/:articleID
router.post('/author-question-answers/:articleID', verifyAccessToken, postAuthorQuestionAnswers);

// @desc Submit final review
// @method POST
// @path /review/final-review/:articleID
router.post('/final-review/:articleID', verifyAccessToken, handleFinalSubmission);


module.exports = router;