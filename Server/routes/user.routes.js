const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');

const {getDetails} = require('../controllers/user.controller');

router.get('/user/details', verifyAccessToken, getDetails);

module.exports = router;