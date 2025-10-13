const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req,res) =>{
     try{
        let {email, password, fullname} = req.body;

        let user = await usermodel.findOne({ email: email });
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async(err, hash)=>{
                if(err){
                    req.flash("error", err.message);
                    return res.redirect("/");
                }else{
                    let user = await usermodel.create({
                    email,
                    password: hash,
                    fullname,
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash("success", `Welcome to Scatch, ${fullname}! Your account has been created successfully.`);
                    res.redirect("/shop");
                }
            });
        });   
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/");
    }
};

module.exports.loginUser = async (req, res) =>{
    try{
        let {email, password} = req.body;

    let user = await usermodel.findOne({email: email});
    if(!user){
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");
    }
        
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success", `Welcome back, ${user.fullname}!`);
            res.redirect("/shop");
        }else{
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    });
    
    }catch(err){
    req.flash("error", err.message);
    res.redirect("/");
    }
};
module.exports.logout = (req, res) => {
    res.clearCookie("token"); // deletes the cookie properly
    req.flash("success", "You have been logged out successfully!");
    res.redirect("/");
};

    
