const jwt = require("jsonwebtoken");

const videoPassword = (req, res, next) => {
    const token = req.headers('auth-token2');
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.videoPasswordVerified) {
            return res.status(403).json({ message: 'Video password not verified' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = videoPassword;