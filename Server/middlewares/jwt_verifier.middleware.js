const {verifyJWT} = require('../utils/jwt.utils');
module.exports.verifyAccessToken = (req,res,next) => { 
    const {accessToken} = req.cookies;

    if(!accessToken){
        return res.status(403).send("Access token is missing");
    }
    const {payload, expired} = verifyJWT(accessToken);
    if(!payload){
        return res.status(403).send("Invalid access token");
    }
    if(expired){
        return res.status(403).send("Access token expired");
    }
    req.payload = payload;
    next();
}
