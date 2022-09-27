const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String},
}, {
    timestamps: true,
})

const SessionModel = mongoose.model("Session", sessionSchema);

module.exports = SessionModel;