const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 3000;
const {mogoUrl} = require('./keys');
const qrcode = require("qrcode");
const cors = require('cors');
const fs = require('fs');

require('./models/User')
require('./models/Event')
require('./models/Ticket')
require('./models/UserTicket')
require('./models/onePage')
const requireToken = require('./middleware/requireToken')
const AuthRoutes = require('./routes/AuthRoutes')
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(AuthRoutes)

const uri = "mongodb+srv://TicketAgenceImage:Tm8cTxvt1E3CHScS@cluster0.ihbx5zc.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(mogoUrl)
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
// .then(values=>console.log('connected to mongo yeah', values)).catch((error=>console.log('this isss error', error)));

mongoose.connection.on('connected', () => {
    console.log('connected to mongo yeah')
})

mongoose.connection.on('error', (err) => {
    console.log('this id error', err)
})

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.post('/', (req,res) => {
    console.log(req.body)
    res.send('hello')
})
app.get('/',requireToken, (req,res) => {
  res.send("Your mail is" + req.user.email)
})

app.listen(PORT, () => {
     console.log("server running" + PORT)
})