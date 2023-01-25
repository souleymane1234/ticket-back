const mongoose = require("mongoose");
const onePageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  logo: {
    type: String
  },
  imageCouverture1: {
    type: String
  },
  imageCouverture2: {
    type: String
  },
  imageCouverture3: {
    type: String
  },
  textBienvenue: {
    type: String
  },
  presentation1Image: {
    type: String
  },
  presentation1Titre: {
    type: String
  },
  presentation1Description: {
    type: String
  },
  presentation2Image: {
    type: String
  },
  presentation2Titre: {
    type: String
  },
  presentation2Description: {
    type: String
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

// userSchema.pre('save',function(next){
//   const user = this;
//   if (!user.isModified('password')) {
//     return next()
//   }

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(user.password,salt,(err,hash) => {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash;
//     next()
//   })
// })
// })


// userSchema.methods.comparePassword = function(candidatePassword) {
//   const user = this;
//   return new Promise((resolve,reject) => {
//     bcrypt.compare(candidatePassword,user.password,(err,isMatch) => {
//       if (err) {
//         return reject(err)
//       }
//       if (!isMatch) {
//         return reject(err)
//       }
//       resolve(true)
//     })
//   })
// }

module.exports = mongoose.model("OnePage", onePageSchema);