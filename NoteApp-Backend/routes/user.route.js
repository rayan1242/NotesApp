const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.send("router working");
})

userRouter.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,saltRounds, async (err,hash)=>{
        if(err) return res.status(500).send(err);

        try{
            let user = new UserModel({name,email,password:hash});
            await user.save();

            const token = jwt.sign({userId:user._id},privateKey);
            
            return res.status(201).send({message:"user crearted",token});
        }
        catch(error){
            return res.status(500).send(error);
        }

     })
})

userRouter.post('/login',async (req,res)=>{
    const  {email,password} = req.body;

    let option = {
        expiresIn:"50m"
    }

    try{
        const data = await UserModel.find({email});
        if(data){
            console.log(data[0])
            let token=jwt.sign({userId:data[0]._id},privateKey,option)
            console.log(token)
            bcrypt.compare(password,data[0].password, function(err,result){
                if(err)  {
                    console.log(err);
                    return res.status(500).send(err);   
                }
                if(result){
                    console.log(result);
                    return res.status(200).send({message:"User Loggin successful",token})
                }
                else{
                    console.log(err);
                    return res.status(500).send({message:"Incorrect Password"});
                }
            })
        }else{
            return res.status(500).send({message:"User does not exsist"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

module.exports={
    userRouter
}
