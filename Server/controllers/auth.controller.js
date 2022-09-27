const {getGoogleOAuthTokens, getGoogleUser, findOrCreateUser} = require('../services/user.service');
const {createSession} = require('../services/session.services');
const {signJWT, verifyJWT} = require('../utils/jwt.utils');

const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
  
const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

module.exports.googleOAuthHandler = async (req, res) => {
    // get the code from the qs
    const { code } = req.query;
    // get the id and access token with the code
    const {id_token, access_token} = await getGoogleOAuthTokens(code);
    // get user with tokens
    const googleUser = await getGoogleUser(id_token, access_token);
    // upsert the user
    const user = await findOrCreateUser(googleUser);
    if(!user) return res.status(403).send("Something went wrong while creating a user");
    // create a session
    const session = await createSession(user);
    // create access and refresh tokens
    const accessToken = signJWT({...user.toJSON(), session: session._id}, {expiresIn: '1d'});
    const refreshToken = signJWT({...user.toJSON(), session: session._id}, {expiresIn: '1y'});
    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    // redirect back to the client
    // res.send({ accessToken, refreshToken });
    res.redirect("http://localhost:3000");
}