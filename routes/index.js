const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productmodel = require('../models/productmodel');
const usermodel = require("../models/usermodel");

router.get("/", (req,res)=>{
    let error = req.flash("error");
    res.render("auth", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async(req,res)=>{
    try{
        let products = await productmodel.find();
        let success = req.flash("success");
        res.render('shop', { products, success });
    } catch(err){
        console.error(err);
        res.render('shop', { products: [], success: "" });
    }
});

router.get("/cart", isLoggedIn, async(req,res)=>{
        try{
            let user = await usermodel.
            findOne({email: req.user.email}).
            populate("cart");
            const bill = (Number(user.price) + 20)-Number(user.discount);
            res.render('cart', { user, bill }); 
        }catch(err){
            console.error(err);
            res.redirect("/shop")
        }
});

router.get("/addtocart/:productsid", isLoggedIn, async(req,res)=>{
    let user = await usermodel.findOne({email: req.user.email});
    user.cart.push(req.params.productsid);
    await user.save();
    req.flash("success", "Added to cart")
    res.redirect("/shop")
})

router.get("/logout", isLoggedIn, (req,res)=>{
    res.cookie("token", "")
    res.redirect("/");
});
module.exports = router;