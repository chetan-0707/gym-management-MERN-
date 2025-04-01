const Gym = require("../Modals/gym");
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.cookie_token;
        if (!token) {
            return res.status(401).json({
                error: 'Token is not valid'
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SecretKey);
        req.gym = await Gym.findById(decode.gym_id).select('-password');
        next();

    } catch (error) {
        res.status(401).json({ error: "Token is not valid" });
    }


}

module.exports = auth;