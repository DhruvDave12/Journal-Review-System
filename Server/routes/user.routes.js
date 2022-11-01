const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');

const {getDetails, postDetails} = require('../controllers/user.controller');

router.get('/user/details', verifyAccessToken, getDetails);

router.post('/user/details', verifyAccessToken, postDetails);

module.exports = router;