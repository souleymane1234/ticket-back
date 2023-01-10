const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const eventSchema = new mongoose.Schema({
  compagnie: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },

  depart: {
    type: String,
  },
  arrivee: {
    type: String,
  },
  jour: {
    type: Date,
  },
  prix: {
    type: Number,
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



module.exports = mongoose.model("Event", eventSchema);