const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "Access denied. Please log in to continue.");
        return res.redirect("/");
    }
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");

        if (!user) {
            req.flash("error", "User not found. Please log in again.");
            return res.redirect("/");
        }

        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            req.flash("error", "Session expired. Please log in again.");
        } else {
            req.flash("error", "Authentication failed. Please log in.");
        }
        console.error("Authentication error:", err.message);
        res.redirect("/");
    }
};
