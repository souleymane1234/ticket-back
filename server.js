const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const PORT = 5000;
const { mogoUrl } = require("./keys");
const qrcode = require("qrcode");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");

require("./models/User");
require("./models/Event");
require("./models/Ticket");
require("./models/UserTicket");
require("./models/onePage");
require("./models/CompagnieTransport");
require("./models/TicketTransport");
require("./models/Sport");
require("./models/Cinema");
require("./models/Img");
const requireToken = require("./middleware/requireToken");
const AuthRoutes = require("./routes/AuthRoutes");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// mongoose
//   .connect(MONGOURL)
//   .then(() => {
//     console.log("Database connected successful.");
//     app.listen(PORT, () => {
//       console.log(`server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(AuthRoutes);
app.use("/uploads", express.static("uploads"));

const uri =
  "mongodb+srv://TicketAgenceImage:Tm8cTxvt1E3CHScS@mory.51otj.mongodb.net/?retryWrites=true&w=majority&appName=mory";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah");
});

mongoose.connection.on("error", (err) => {
  console.log("this id error", err);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("hello");
});
app.get("/", requireToken, (req, res) => {
  res.send("Your mail is" + req.user.email);
});

app.listen(PORT, () => {
  console.log("server running" + PORT);
});
