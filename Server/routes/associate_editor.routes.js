const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/jwt_verifier.middleware');
const {getAllRequestsAssociate, acceptOrRejectArticle, sendToDomains} = require('../controllers/associate_editor.controller');

// @DESC: Get all requests
// @METHOD: GET
// @PATH: /associate_editor/requests
router.get('/requests', verifyAccessToken, getAllRequestsAssociate);

// @DESC: Accept or reject the article
// @METHOD: POST
// @PATH: /associate_editor/requests/accept-reject
router.post('/request/accept-reject', verifyAccessToken, acceptOrRejectArticle);

// @DESC: Send article to domains
// @METHOD: POST
// @PATH: /associate_editor/requests/send-to-domains/:articleID
router.post('/request/send-to-domains/:articleID', verifyAccessToken, sendToDomains);

module.exports = router;