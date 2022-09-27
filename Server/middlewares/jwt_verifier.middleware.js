const {verifyJWT} = require('../utils/jwt.utils');
module.exports.verifyAccessToken = (req,res,next) => { 
    // console.log("COOKIE: ", req.cookies);
    const {accessToken} = req.cookies;

    if(!accessToken){
        return res.status(403).send("Access token is missing");
    }
    // const accessToken = req.cookie.accessToken;
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

