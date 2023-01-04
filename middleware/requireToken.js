const jwt = require('jsonwebtoken')
require("dotenv").config();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const {jwtKey} = require('../keys')

// const jwtKey = ""

module.exports = (req,res,next) => {
    const { authorization } = req.headers;

    // authorization === Bearer 
    if (!authorization) {
        return res.status(401).send({error:"you must be logged in"})
    }
    const token =  authorization.replace("Bearer ", "");
    jwt.verify(token,jwtKey,async (err,payload) => {
        if (err) {
            return res.status(401).send({error:"you must be logged in"})
        }
    const {userId} = payload
    const user = await User.findById(userId)
    req.user = user;
    next();
    })
}