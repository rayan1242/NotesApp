const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({
            message: "Authentication Failed, token is missing"
        });
    }

    jwt.verify(token, privateKey, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Invalid access token"
            });
        }

        if (decode) {
            req.body.user = decode.userId;
            next();
        } else {
            return res.status(401).send({
                message: "Invalid access token"
            });
        }
    });
}

module.exports = { auth };
