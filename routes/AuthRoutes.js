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
const Transport = mongoose.model('Transport')
const CompagnieTransport = mongoose.model('CompagnieTransport')
const moment = require('moment')
const qrcode = require("qrcode");
const e = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');
const Cors = require('cors');
const initMiddleware = require('../lib/init-middleware');
const multer  = require('multer');
const onePage = require('../models/onePage');
// const upload = multer({ dest: 'uploads/' })

// storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/uploads/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    req.body.file = fileName
    cb(null, uuidv4() + '-' + fileName)
  }
});
const upload = multer({
    storage: fileStorageEngine,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/api/upload', upload.array('logo', 9), (req, res, next) => {
  const {nom,email,textBienvenue,lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche,tel,fixe,lieu,lienFb,lienMenu,lienInfo} = req.body;
  // const email = req.body.email;
  // const textBienvenue = req.body.textBienvenue;
  // const lundi = req.body.lundi;
  // const mardi = req.body.mardi;
  // const mercredi = req.body.mercredi;
  // const jeudi = req.body.jeudi;
  // const vendredi = req.body.vendredi;
  // const samedi = req.body.samedi;
  // const dimanche = req.body.dimanche;
  // const tel = req.body.tel;
  // const fixe = req.body.fixe;
  // const lieu = req.body.lieu;
  // const lienFb = req.body.lienFb;
  // const lienMenu = req.body.lienMenu;
  // const lienInfo = req.body.lienInfo;
  console.log("frst..........", req.body)
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/tmp/uploads/' + req.files[i].filename)
        console.log("first......", req.files)
    }
    const pa = new OnePage({
        nom,email,textBienvenue,lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche,tel,fixe,lieu,lienFb,lienMenu,lienInfo,
        logo: reqFiles
    });
    pa.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            userCreated: { 
                logo: result.logo
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

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
// creer un evenement 
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
})

// creer une compagnie 
router.post('/api/compagnie', async(req,res) => {
  console.log('inside post function')
  const {nom,image,created_at,updated_at} = req.body;
    try{
    const compa = new CompagnieTransport({nom,image,created_at,updated_at});
    await compa.save();
    res.json(compa)
  }catch(err){
    res.status(422).send(err.message)
  }
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
// API pour creer un ticket 
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

// get all compagnie 
router.get('/api/allCompagnie', (req,res) => {
  CompagnieTransport.find({}, (err,data) =>{
    if (!err) {
      res.send(data)
    }else {
      console.log(err)
    }
  })
})

// router.post('/api/onepage', upload.single('logo'), async (req,res) => {

//   const {nom,email,textBienvenue,presentation1Titre,presentation1Description,presentation2Titre,presentation2Description,created_at,updated_at} = req.body;
//   const logo = req.file
//   console.log("ok......", logo)
//   try{
//     const one = new OnePage({nom,email,logo,textBienvenue,presentation1Titre,presentation1Description,presentation2Titre,presentation2Description,created_at,updated_at});
//     await one.save();
//     console.log(one)
//     res.send({one})
//   }catch(err){
//     res.status(422).send(err.message)
//   }
// })
// router.get("/api/singleUsers/:nom", (req, res, next) => {
//     OnePage.findOne().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

router.get('/api/singleUsers/:nom', (req,res,next) =>{
  OnePage.findOne({nom: req.params.nom}, (err,data) =>{
    console.log("first", req.params.nom);
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
})

// router.get('/api/singleUsers/:nom', (req,res) =>{
  // OnePage.findOne(req.params.nom,function (err, course) 
  
  // {
  //   console.log(nom)
  //   res.json(course);
  // }); 
  // OnePage.find({username: /nom/i} (err,data) =>{
  //   if (!err) {
  //     res.send(data)
  //   } else {
  //     console.log(err)
  //   }
  // })
// })



// ...

// ...


module.exports = router