const express = require('express')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Event = mongoose.model('Event')
const Ticket = mongoose.model('Ticket')
const UserTicket = mongoose.model('UserTicket')
const OnePage = mongoose.model('OnePage')
const moment = require('moment')
const qrcode = require("qrcode");
const e = require('express');
const multer = require('multer')
const fs = require('fs')
const path = require('path');

router.post('/api/signup', async (req,res) => {

  const {nom,prenom,email,password,number,created_at,updated_at} = req.body;
  try{
    const user = new User({nom,prenom,email,password,number,created_at,updated_at});
    await user.save();
    const token = jwt.sign({userId:user._id},jwtKey)
    res.send({user,token})
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
  const {nom,image,lieu,date,heure,prixStandart,prixVip,artisteInviter1,artisteInviter2,artisteInviter3,artisteInviter4,created_at,updated_at} = req.body;
    try{
    const events = new Event({nom,image,lieu,date,heure,prixStandart,prixVip,artisteInviter1,artisteInviter2,artisteInviter3,artisteInviter4,created_at,updated_at});
    await events.save();
    res.json(events)
  }catch(err){
    res.status(422).send(err.message)
  }
// ok
})

// router.post('/api/createTicket', async(req,res) => {
//       var obj = {
//         usersId: req.body.usersId,
//         eventId: req.body.eventId,
//     }
//         Ticket.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             item.save();
//             res.json(obj)
//         }
//     });
// })

router.post('/api/createTicket', async (req, res) => {
const newTicket = new Ticket(req.body);
console.log(newTicket)
try {
const tik = await newTicket.save();
if(!tik) throw Error('Something went wrong with the post')
res.status(200).json(tik);
} catch(error) {
res.status(400).json({msg: error})
}
});

//  router.post('/api/createTicket', async(req,res) => {
   
//      try{
//          const {usersId,eventId,created_at,updated_at} = req.body;
//           const tik = await new Ticket({usersId,eventId,created_at,updated_at}).save();
//         return res.json({ tik, message: 'Feedback Created' });
//    }catch (error) {
//       console.log(error.message);
//       res.json('Failed to create feedback!');
//     }

//  })


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
router.get('/api/single/event/:id', (req,res) =>{
  Event.findById(req.params.id, (err,data) =>{
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
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

router.post('/api/onepage', async (req,res) => {

  const {nom,email,imageCouverture,textBienvenue,presentation1Image,presentation1Titre,presentation1Description,presentation2Image,presentation2Titre,presentation2Description,presentation3Image,presentation3Titre,presentation3Description,created_at,updated_at} = req.body;
  try{
    const one = new OnePage({nom,email,imageCouverture,textBienvenue,presentation1Image,presentation1Titre,presentation1Description,presentation2Image,presentation2Titre,presentation2Description,presentation3Image,presentation3Titre,presentation3Description,created_at,updated_at});
    await one.save();
    console.log(one)
    res.send({one})
  }catch(err){
    res.status(422).send(err.message)
  }
})

// ...

// ...


module.exports = router