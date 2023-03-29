const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).json({ auth: "1" });
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.headers.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ auth: "2" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
};
