const express = require('express')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Event = mongoose.model('Event')
const Ticket = mongoose.model('Ticket')
const UserTicket = mongoose.model('UserTicket')
const moment = require('moment')
const qrcode = require("qrcode");
const e = require('express');
const multer = require('multer')
const fs = require('fs')
const path = require('path');

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

 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// const upload = multer({ storage: storage });
// router.get('/', (req, res) => {
//     Event.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.status(200);
//         }
//     });
// });

// router.post('/ok', upload.single('image'), (req, res, next) => {
 
//     const obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     Event.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             item.save();
//             res.status(200);
//         }
//     });
// });

// router.post("/api/createEvent", upload.single("testImage"), async(req,res) => {
//   const saveImage = new Event({
//     compagnie: req.body.compagnie,
//     image: {
//       data: fs.readFileSync("./routes/uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   saveImage.save()
//   .then((res) => {
//     console.log("image is saved")
//   })
//   .catch((err) => {
//     console.log(err, "error has")
//   })
// })

router.post('/api/createEvent', async(req,res) => {
  console.log('inside post function')
  const {compagnie,image,depart,arrivee,jour,prix,created_at,updated_at} = req.body;
    try{
    const events = new Event({compagnie,image,depart,arrivee,jour,prix,created_at,updated_at});
    await events.save();
    const ID = events._id
    console.log(req.body)
    res.json(events)
  }catch(err){
    res.status(422).send(err.message)
  }

})

router.post('/api/userticket', async(req,res) => {
  console.log('inside post function')
  const {usersId,eventId,created_at,updated_at} = req.body;
    try{
    const tik = new UserTicket({usersId,eventId,created_at,updated_at});
    await tik.save();
    res.json(tik)
  }catch(err){
    res.status(422).send(err.message)
  }

})

router.post('/api/createTicket', async(req,res) => {
  console.log('inside post function')
  const {usersId,eventId} = req.body;
  
    try{
    const pass = new Ticket({usersId,eventId});
    // console.log('pass',res)
    // console.log('rea',req)
    await pass.save();
    res.json(pass)
  }catch(err){
    res.status(422).send(err.message)
  }

})

// get all event 
router.get('/api/allEvent', (req,res) => {
  Event.find({}, (err,data) =>{
    if (!err) {
      res.send(data)
    }else {
      console.log(err)
    }
  })
})
// get single event 
router.get('/api/single/ticket/:id', (req,res) =>{
  Event.findById(req.params.id, (err,data) =>{
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