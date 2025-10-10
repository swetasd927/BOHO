const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req,res) =>{
     try{
        let {email, password, fullname} = req.body;

        let user = await  usermodel.findOne({email: email})
        if(user) return res.status(401).send("You already have an account, please login.")

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async(err, hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await usermodel.create({
                    email,
                    password: hash,
                    fullname,
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user created successfully");
                }
            });
        });   
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
};

module.exports.loginUser = async (req, res) =>{
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
            res.redirect("/shop");
        }else{
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    })
};