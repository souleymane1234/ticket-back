const express = require('express')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Ticket = mongoose.model('Ticket')
const moment = require('moment')
const qrcode = require("qrcode");
const e = require('express');

router.post('/api/signup', async (req,res) => {

  const {email,password,number} = req.body;
  try{
    const user = new User({email,password,number});
    await user.save();
    const token = jwt.sign({userId:user._id},jwtKey)
    res.send({token})
  }catch(err){
    res.status(422).send(err.message)
  }
  
 

  
})

router.post('/api/signin',async (req,res) => {
  const {email,password} = req.body
  if (!email || !password) {
    return res.status(422).send({error :"must provide email or password"})
  }
  const user = await User.findOne({email})
  if (!user) {
    return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password);
    const token = jwt.sign({userId:user._id},jwtKey)
    res.send({user,token})
  }catch(err){
    return res.status(422).send({error :"must provide email or password"})
  }
})

router.post('/api/createTicket', async(req,res) => {
  console.log('inside post function')
  const {compagnie,depart,arrivee,jour,prix,created_at,updated_at} = req.body;
    try{
    const tickets = new Ticket({compagnie,depart,arrivee,jour,prix,created_at,updated_at});
    await tickets.save();
    const ID = tickets._id.toString()
    res.json(tickets)
  }catch(err){
    res.status(422).send(err.message)
  }

})

// get all ticket 
router.get('/api/allTicket', (req,res) => {
  Ticket.find({}, (err,data) =>{
    if (!err) {
      res.send(data)
    }else {
      console.log(err)
    }
  })
})
// get single ticket 
router.get('/api/single/ticket/:id', (req,res) =>{
  Ticket.findById(req.params.id, (err,data) =>{
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
})

// ...

router.post('/qr/generate', async (req, res) => {
  try {
    const { ticketId } = req.body;

    // Validate user input
    if (!ticketId) {
      res.status(400).send("User Id is required");
    }

    const ticket = await Ticket.findById(ticketId);

    // Validate is user exist
    if (!ticket) {
      res.status(400).send("User not found");
    }

    const qrExist = await QRCode.findOne({ ticketId });

    // If qr exist, update disable to true and then create a new qr record
    if (!qrExist) {
      await QRCode.create({ ticketId });
    } else {
      await QRCode.findOneAndUpdate({ ticketId }, { $set: { disabled: true } });
      await QRCode.create({ ticketId });
    }

    // Generate encrypted data
    const encryptedData = jwt.sign({ ticketId: ticket._id },jwtKey);

    // Generate qr code
    const dataImage = await QR.toDataURL(encryptedData);

    // Return qr code
    return res.status(200).json({ dataImage });
  } catch (err) {
    console.log(err);
  }
});

// ...


module.exports = router