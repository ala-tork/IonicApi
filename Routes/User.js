const express = require('express');
const router = express.Router();
const user = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const verifyToken = require('../Config/TokenConfig');
require('dotenv').config();

router.post('/register',async(req,res)=>{
    try {
        usr = new user(req.body)
        salt= bcrypt.genSaltSync(10);
        bcryptPassword = await bcrypt.hashSync(req.body.Password,salt);
        usr.Password = bcryptPassword;
        result = await usr.save();
        return res.status(200).send(result);     
    } catch (error) {
        return res.status(400).send(error);
    }
})

router.post('/login',async(req,res)=>{

    let jwtSecretKey = process.env.JWT_SECRET_KEY; 
    data=req.body;
    usr=await user.findOne({Email:data.Email})
    
    if(!usr){
        res.status(404).send("email or password invalid");
    }else{
        validPass= bcrypt.compareSync(data.Password, usr.Password)
        if(!validPass){
            res.status(401).send('email or password invalid');
        }else{
            payload={
                _id:usr._id,
                Email:usr.Email,
                First_name:usr.First_name,
                Last_name:usr.Last_name,
                time: Date(), 
            }
            token=jwt.sign(payload,jwtSecretKey);
            res.status(200).send({mytoken:token});
        }
    }
})


// router.post('/GetDataFromToken', async (req, res) => {

//     let jwtSecretKey = process.env.JWT_SECRET_KEY;  
//     const token = req.body.token;

//     jwt.verify(token, jwtSecretKey, (err, decoded) => {
//         if (err) {
//             console.error('Token verification failed:', err);
//             res.status(401).send('Token verification failed');
//         } else {
//             console.log('Decoded token:', decoded);
//             res.status(200).json({ decodedToken: decoded });
//         }
//     });
// });

router.post('/GetDataFromToken', async (req, res) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;  
    const token = req.body.token;

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            res.status(401).send('Token verification failed');
        } else {
            console.log('Decoded token:', decoded);
            res.status(200).json(decoded._id);
        }
    });
});

router.put('/updateProfile/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const newData = req.body;

        const updatedUser = await user.findByIdAndUpdate(userId, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/deleteProfile/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await user.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(deletedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/getUser/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        
        const foundUser = await user.findById(userId);

        if (!foundUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(foundUser);
    } catch (error) {
        return res.status(500).send(error);
    }
});




module.exports = router;