const express = require('express');
const router = express.Router();
const {googleOAuthHandler} = require('../controllers/auth.controller');

router.get('/sessions/oauth/google', googleOAuthHandler);

module.exports = router;