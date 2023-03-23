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
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  heure: {
    type: String,
    required: true
  },
  prixStandart: {
    type: String,
    required: true
  },
  prixVip: {
    type: String,
  },
  prixVvip: {
    type: String,
  },
  nomLieu: {
    type: String,
    required: true
  },
  descriptionLieu: {
    type: String,
  },
  artisteInviter1: {
    type: String
  },
  artisteInviter2: {
    type: String
  },
  artisteInviter3: {
    type: String
  },
  artisteInviter4: {
    type: String
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