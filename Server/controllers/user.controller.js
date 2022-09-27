const User = require('../models/user.model');

module.exports.getDetails = async (req,res) => {
    try {
        console.log("PAYLOAD: ", req.payload);
        const user = await User.findById(req.payload._id);
        if(!user){
            return res.status(404).send("User not found");
        }
        res.status(200).json({success: true, user: user});
    } catch (error) {
        res.status(500).send(error);
    }
}
