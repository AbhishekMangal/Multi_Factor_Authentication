const jwt = require("jsonwebtoken");

const fetchUser = async(req, res, next)=>
{
    
    const token = req.header('auth-token');
    
    if(!token)
    {
        res.json("Access Denied");
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using a valid token")
        console.error("Internal Server Error");
    }
}
module.exports = fetchUser;