const jwt = require('jsonwebtoken');
const ownermodel = require('../models/ownermodel');

module.exports = async (req,res, next) => {
    if(!req.cookies.token){
        req.flash("You need to login first");
        return res.redirect("/");
    }
    try{
        let decoded = jwt.verify(req.cookies.token, this.process.env.JWT_KEY);
        let owner = await ownermodel
            .findOne({email: decoded.email})
            .select("-password");

            req.owner = owner;
            next();
    }
    catch(err){
        req.flash("error", "something went wrong");
        res.redirect("/ownerlogin");
    }
};