const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const transportSchema = new mongoose.Schema({
  nomCompagnie: {
    type: String,
    required: true,
  },
  nomGare: {
    type: String,
    required: true
  },

  villeDepart: {
    type: String,
    required: true
  },
  villeArrive: {
    type: String,
    required: true
  },
  PrixTicket: {
    type: String,
    required: true
  },
  dateDepart: {
    type: String,
    required: true
  },
  heureDepart: {
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



module.exports = mongoose.model("Transport", transportSchema);