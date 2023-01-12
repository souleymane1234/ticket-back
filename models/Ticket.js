const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const ticketSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },

  lieu: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  prixStandart: {
    type: String,
    required: true
  },
  prixVip: {
    type: String,
    required: true
  },
  usersId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
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