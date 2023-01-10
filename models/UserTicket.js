const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { isResolvable } = require("@hapi/joi/lib/common");


const userTicketSchema = new mongoose.Schema({
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



module.exports = mongoose.model("UserTicket", userTicketSchema);