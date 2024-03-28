const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModel")
const { BlacklistModel } = require("../models/blacklistModel")
require("dotenv").config()


const userRouter = express.Router()

// User Authentication routes 

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request or error occurred
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Bad request or error occurred
 * /users/logout:
 *   get:
 *     summary: Log out the user
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '400':
 *         description: Bad request or error occurred
 */

// * /users/logout:
//  *   get:
//  *     summary: Log out the user
//  *     security:
//  *   
//  *     responses:
//  *       '200':
//  *         description: User logged out successfully
//  *       '400':
//  *         description: Bad request or error occurred
//  */






// Register route

userRouter.post("/register", async(req,res)=>{
    const {username, email, password} = req.body
    try {
        if( !username || !email || !password){
            return res.status(201).send({"message":"All Fields are mandatory"})
        }
        else {
            const isPresent = await UserModel.findOne({email})
            if(isPresent){
                return res.status(201).send({"message":"User is already present"})
            }
            else {
                bcrypt.hash(password,5,(err,hash)=>{
                    if(err){
                        res.status(201).send({"message":"Something wrong while hashing the passowrd"})
                    }
                    else {
                        const user = new UserModel({username,email,password:hash})
                        user.save()
                        res.status(200).send({"message":"A new user has been registered"})
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send({"msg":"something wrong in catch block for user", "Error":err})
    }
})

// Login route

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body
    try {

        if( !email || !password){
            return res.status(201).send({"message":"All fields are mandatory"})
        }
        else{
            const user = await UserModel.findOne({email})
            if(!user) {
                return res.status(201).send({"message":"Please Register first"})
            }
            else{
                bcrypt.compare(password, user.password, (err,result) => {
                    if(result){
                        const token = jwt.sign({ userID:user._id, username:user.username },process.env.SECRET_KEY,{expiresIn:"1d"})
                        res.status(200).send({"message":"Login Successfull!", "token":token})
                    } else {
                        res.status(201).send({"message":"Wrong Credentials"})
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send({"message":"Error in login catch while login ","Error": err} )
    }
})

// Logout route

userRouter.get("/logout", async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        const blacklisted_token = new BlacklistModel({token})
        await blacklisted_token.save()
        res.send({"msg":"You have been logged out!"})

      } catch (err) {
        res.status(400).send({ "message": "Something Error in logout catch block", "error": err });
      }
})


module.exports = {
    userRouter
}