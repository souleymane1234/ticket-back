const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const ticketSchema = new mongoose.Schema({
  compagnie: {
    type: String,
    required: true,
  },

  depart: {
    type: String,
    required: true,
  },
  arrivee: {
    type: String,
    required: true,
  },
  jour: {
    type: Date,
    require: true
  },
  prix: {
    type: Number,
    require: true
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



module.exports = mongoose.model("Ticket", ticketSchema);