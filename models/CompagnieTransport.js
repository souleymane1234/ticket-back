const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const compagnieTransportSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
created_at: {
  type: Date,
  default: Date.now
},
updated_at: {
  type: Date,
  default: Date.now
 }
});



module.exports = mongoose.model("CompagnieTransport", compagnieTransportSchema);