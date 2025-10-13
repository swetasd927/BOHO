const express = require('express');
const router = express.Router();
const ownerModel = require("../models/ownermodel");
const upload = require("../config/multer-config"); 
const productModel = require("../models/productmodel"); 

if(process.env.NODE_ENV === "development"){
    router.post("/create", async(req,res)=>{
    let owners =  await ownerModel.find() ;
        if(owners.length >0){
        return res
            .status(504)
            .send("You don't have permission to create a new owner.");  
        }
        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
        });

        res.status(201).send(createdOwner);
    });
}

router.get("/admin", (req,res)=>{
    let success = req.flash("success");
    res.render("createproducts", { success });
});

router.get('/product/create',(req, res)=> {
    res.render('createproducts');
});

router.post('/product/create', upload.single("image"), async (req, res)=>{
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        
        let product = await productModel.create({
            image: req.file.buffer, 
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating product");
    }
});

module.exports = router;