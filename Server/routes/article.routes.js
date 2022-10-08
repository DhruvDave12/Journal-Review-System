const express = require('express');
const router = express.Router();

const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {createArticle} = require('../controllers/article.controllers');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});

// @DESC: Create Article
// @METHOD: POST
// @PATH: /article/create
router.post('/create', upload.single('pdfFile'), verifyAccessToken , createArticle);

module.exports = router;