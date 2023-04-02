const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
    if(req.path == '/login') {
        next();
        return;
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.secretKey, (err, user) => {
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;