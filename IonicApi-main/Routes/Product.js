const express=require('express');
const router=express.Router();
const prod = require('../Models/Product');
const verifyToken = require('../Config/TokenConfig');
const _ = require('lodash');

const jwt = require('jsonwebtoken');

router.post('/AddProducts',verifyToken,async (req,res)=>{
        try{
            const data=req.body;
            const pr =new prod(data);
            result= await pr.save();
            
            res.status(200).send(result);
        }
        catch(error){
            res.status(400).send(error);
        }
})

router.get('/AllProduct',verifyToken,async (req,res)=>{
    try {
        const products = await prod.find({});
        return res.status(200).send(products);
    } catch (error) {
        return res.status(400).send("Internal server error");
    }
})

router.get('/:id',verifyToken,async(req,res)=>{
    try {
        prod_Id=req.params.id;
        data = await prod.findById(id);
        if(data != null)
        return res.status(200).send(data);
        else return res.status(404).send("product not found");
    } catch (error) {
        return res.status(500).send(error);
    }

})

router.delete('/DeleteProduct/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await prod.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }

        return res.status(200).send(deletedProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put('/UpdateProduct/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;
        const newData = req.body;

        const existingProduct = await prod.findById(productId);

        if (!existingProduct) {
            return res.status(404).send("Product not found");
        }
        const updatedProduct = _.merge(existingProduct, newData);

        const result = await updatedProduct.save();

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/ProductsByCategory/:category', verifyToken, async (req, res) => {
    try {
        const category = req.params.category;

        const products = await prod.find({ Category: category });

        if (products.length === 0) {
            return res.status(404).send("No products found for the specified category");
        }

        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/ProductsByUser/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const products = await prod.find({ user: userId });

        if (products.length === 0) {
            return res.status(404).send("No products found for the specified user");
        }

        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// router.get('/MyProducts', verifyToken, async (req, res) => {
//     try {
//         const userId = req.userId; 
//         const products = await prod.find({ user: userId });

//         if (products.length === 0) {
//             return res.status(404).send("No products found for the user");
//         }

//         return res.status(200).send(products);
//     } catch (error) {
//         console.error("Error in /ProductsByUser route:", error);
//         return res.status(500).send("Internal server error");
//     }
// });





module.exports = router;