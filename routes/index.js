const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", (req,res)=>{
    let error = req.flash("error");
    res.render("auth", { error });
});

router.get("/shop", isLoggedIn, (req,res)=>{
    res.render('shop', {products: []});
});

router.get("/logout", isLoggedIn, (req,res)=>{
    res.cookie("token", "")
    res.redirect("/");
});
module.exports = router;