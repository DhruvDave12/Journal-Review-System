const SessionModel = require("../models/session.model");

module.exports.createSession = async (userId, userAgent) => {
    const session = await SessionModel.create({ user: userId, userAgent });
  
    return session.toJSON();
}