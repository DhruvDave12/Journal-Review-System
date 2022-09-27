const jwt = require('jsonwebtoken');

module.exports.signJWT = (payload, expireIn) => {
    const {expiresIn} = expireIn;
    console.log(payload);

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
}

module.exports.verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {algorithm: "RS256"});
        return {payload: decoded, expired: false};
    } catch (err) {
        return {payload: null, expired: err.message.include('jwt expired')};
    }
}