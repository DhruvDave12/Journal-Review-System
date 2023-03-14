const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {getAllPopulatedRequests, associateArticle, getAllAssociateEditors} = require('../controllers/editor.controller');

// @DESC: Get all article requests
// @METHOD: GET
// @PATH: /editor/article/requests
router.get('/article/requests', verifyAccessToken, getAllPopulatedRequests);

// @DESC: Associate this article to the associate editor
// @METHOD: POST
// @PATH: /editor/article/associate
router.post('/article/associate', verifyAccessToken, associateArticle);

// @DESC: Get a list of all associate editors available on the system
// @METHOD: GET
// @PATH: /editor/associate/editors
router.get('/associate/editors/:requestID', verifyAccessToken, getAllAssociateEditors);

module.exports = router;