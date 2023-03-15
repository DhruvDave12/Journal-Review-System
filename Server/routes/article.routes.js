const express = require('express');
const router = express.Router();

const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {createArticle,getAllArticles,getAnArticle} = require('../controllers/article.controllers');

const multer = require('multer');
const {storage} = require('../cloudinary/index.js');
const upload = multer({storage});

// @DESC: Create Article
// @METHOD: POST
// @PATH: /article/create
router.post('/create', upload.single('pdfFile'), verifyAccessToken , createArticle);

// TODO -> CREATE A ROUTE TO FETCH ALL ARTICLES
router.get("/get-all",verifyAccessToken,getAllArticles);
// TODO -> CREATE A ROUTE TO FETCH A SINGLE ARTICLE
router.get("/get-single/:id",verifyAccessToken,getAnArticle);

module.exports = router;