const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const sportSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
    required: true
  },
  prixVvip: {
    type: String,
    required: true
  },
  nomLieu: {
    type: String,
    required: true
  },
  descriptionLieu: {
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



module.exports = mongoose.model("Sport", sportSchema);