const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/productmodel');


router.get("/", (req,res)=>{
    let error = req.flash("error");
    res.render("auth", { error });
});

router.get("/shop", isLoggedIn, async(req,res)=>{
    try{
        let products = await productModel.find();
        let success = req.flash("success");
        res.render('shop', { products, success });
    } catch(err){
        console.error(err);
        res.render('shop', { products: [], success: "" });
    }
});

router.get("/logout", isLoggedIn, (req,res)=>{
    res.cookie("token", "")
    res.redirect("/");
});
module.exports = router;