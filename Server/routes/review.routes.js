const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {getRequests, acceptArticle, rejectArticle, getCurrentlyReviewing} = require('../controllers/review.controller');

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

// TODO -> GET A SINGLE REVIEW DONE BY THE USER
module.exports = router;