const mongoose = require("mongoose");
const onePageSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  email: {
    type: String,
  },
  logo: {
    type: Array,
  },
  textBienvenue: {
    type: String,
  },
  lundi: {
    type: String,
  },
  mardi: {
    type: String,
  },
  mercredi: {
    type: String,
  },
  jeudi: {
    type: String,
  },
  vendredi: {
    type: String,
  },
  samedi: {
    type: String,
  },
  dimanche: {
    type: String,
  },
  tel: {
    type: String,
  },
  fixe: {
    type: String,
  },
  lieu: {
    type: String,
  },
  lienFb: {
    type: String,
  },
  lienInst: {
    type: String,
  },
  lienMenu: {
    type: String,
  },
  lienInfo: {
    type: String,
  },
  // slide1: {
  //   type: String,
  // },
  // slide2: {
  //   type: String,
  // },
  // slide3: {
  //   type: String,
  // },
  // menu1: {
  //   type: String,
  // },
  // menu2: {
  //   type: String,
  // },
  // menu3: {
  //   type: String,
  // },
  // menu4: {
  //   type: String,
  // },
  // resto: {
  //   type: String,
  // },
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