const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            console.log(decoded) // userdetails bcz payload is made up of user details
            req.body.userID = decoded.userID;
            req.body.username = decoded.user;
            next();
          });
    }else {
        res.status(401).json({
            message: "Token not found, Please login first"
        })
    }
}

module.exports = auth;