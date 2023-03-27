const mongoose = require("mongoose");
const ImgSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Img", ImgSchema);