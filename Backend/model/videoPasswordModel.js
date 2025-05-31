const mongoose = require('mongoose')

const videoPasswordSchema = new mongoose.Schema({
   password:
   {
    type: String,
    require: true,
   },
   userId:
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
   }
})

module.exports = mongoose.model('videoPassword', videoPasswordSchema);