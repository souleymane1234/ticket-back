const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isResolvable } = require("@hapi/joi/lib/common");

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  nombrePiece: {
    type: String,
    required: true,
  },

  prix: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  acd: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
