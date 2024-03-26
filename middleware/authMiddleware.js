const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklistModel");
require("dotenv").config()


const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        if (token) {
            const blacklistedToken = await BlacklistModel.findOne({ token });
            if (blacklistedToken) {
                res.send({ "msg": "You have been logged out, Please login again!" });
            } else {
                const decoded = await jwt.verify(token, process.env.SECRET_KEY);
                if (decoded) {
                    // verified
                    next();
                } else {
                    res.send({ "msg": "You are not authorized" });
                }
            }
        } else {
            res.send({ "msg": "You are not authorized, Please Login! First" });
        }
    } catch (error) {
        res.send({ "msg": "Error occurred: " + error.message });
    }
};

module.exports = {
    auth
}
