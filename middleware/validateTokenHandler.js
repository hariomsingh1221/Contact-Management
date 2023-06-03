const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if(!token || token === '') {
            res.status(401) ;
            throw new Error("User is not authorised");
        }
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("User is not authorised");
            }
            req.user = decoded.user;
            next();
        });
    }
})

module.exports = validateToken;