const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const userRouter = Router();

userRouter.post("/register", async(req,res)=>{
    const {username, email, password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.status(500).json({
                    message: "Error while hashing the password"
                });
            }
            const user = new UserModel({username,email,password:hash});
            await user.save();
            res.status(201).json({
                message: "User registered successfully"
            });
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error while registering the user", error
        });
    }
});

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID: user._id, user:user.username }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "User logged in successfully", token
                    });
                }else{
                    res.status(401).json({
                        message: "Wrong Password"
                    });
                }
            });
        }else{
            res.status(404).json({
                message: "User not found, please register first"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while logging in the user", error
        });    
    }
})

module.exports = userRouter;