const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        require: true,
      
        unique: true,
    },
    password:{
        type: String,
        require: true,
        min: 8,
     
    },
})

module.exports = mongoose.model('user', userSchema);