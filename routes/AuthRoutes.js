const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../keys");
const router = express.Router();
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const Ticket = mongoose.model("Ticket");
const Sport = mongoose.model("Sport");
const Cinema = mongoose.model("Cinema");
const Img = mongoose.model("Img");
const multer = require("multer");

// storage
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//     req.body.file = fileName
//     cb(null, uuidv4() + '-' + fileName)
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
router.post("/uploadd", upload.single("image"), function (req, res, next) {
  const url = req.protocol + "://" + req.get("host");
  const NewImage = new Img({
    image: url + "/public/" + req.file.filename,
  });
  NewImage.save()
    .then((result) => {
      res.status(201).json({
        message: "Done upload!",
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
  // req.file contains the uploaded file
  // req.body contains the text fields
});

// const upload = multer({ dest: 'uploads/' })

// sign up API start
router.post("/api/signup", async (req, res) => {
  const { nom, prenom, email, password, number, created_at, updated_at } =
    req.body;
  try {
    const user = new User({
      nom,
      prenom,
      email,
      password,
      number,
      created_at,
      updated_at,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.send({ user, token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// sign up API end

// sign in API start
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.send({ user, token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" });
  }
});
// sign in API end

// create event API start
router.post("/api/createEvent", async (req, res) => {
  const {
    type,
    nombrePiece,
    prix,
    localisation,
    latitude,
    longitude,
    acd,
    image,
    filtre,
    created_at,
    updated_at,
  } = req.body;
  try {
    const events = new Event({
      type,
      nombrePiece,
      prix,
      localisation,
      latitude,
      longitude,
      acd,
      image,
      filtre,
      created_at,
      updated_at,
    });
    await events.save();
    res.json(events);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create event API end

// get all event API start
router.get("/api/allEvent", (req, res) => {
  Event.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all event API end

// get single event API start
router.get("/api/single/event/:id", (req, res) => {
  Event.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get single event API end

// create sport API start
router.post("/api/createSport", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    prixVip,
    prixVvip,
    nomLieu,
    descriptionLieu,
    created_at,
    updated_at,
  } = req.body;
  try {
    const sports = new Sport({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      prixVip,
      prixVvip,
      nomLieu,
      descriptionLieu,
      created_at,
      updated_at,
    });
    await sports.save();
    res.json(sports);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create sport API end

// get all sport API start
router.get("/api/allSport", (req, res) => {
  Sport.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all sport API end

// get single sport API start
router.get("/api/single/sport/:id", (req, res) => {
  Sport.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get single sport API end

// create cinema API start
router.post("/api/createCinema", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    prixVip,
    nomLieu,
    descriptionLieu,
    created_at,
    updated_at,
  } = req.body;
  try {
    const cinemas = new Cinema({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      prixVip,
      nomLieu,
      descriptionLieu,
      created_at,
      updated_at,
    });
    await cinemas.save();
    res.json(cinemas);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create cinema API end

// get all cinema API start
router.get("/api/allCinema", (req, res) => {
  Cinema.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all cinema API end

// get single cinema API start
router.get("/api/single/cinema/:id", (req, res) => {
  Cinema.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get single cinema API end

// create ticket API start
router.post("/api/createTicket", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    prixVip,
    prixVvip,
    nomLieu,
    descriptionLieu,
    artisteInviter1,
    artisteInviter2,
    artisteInviter3,
    artisteInviter4,
    usersId,
    eventId,
    created_at,
    updated_at,
  } = req.body;
  try {
    const tickets = new Ticket({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      prixVip,
      prixVvip,
      nomLieu,
      descriptionLieu,
      artisteInviter1,
      artisteInviter2,
      artisteInviter3,
      artisteInviter4,
      usersId,
      eventId,
      created_at,
      updated_at,
    });
    await tickets.save();
    res.json(tickets);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create ticket API end

// get all cinema API start
router.get("/api/allTicket", (req, res) => {
  Ticket.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all cinema API end

module.exports = router;
