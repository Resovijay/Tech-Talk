const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
       type:String,
       require:true,
       unique:true,
    },
    password:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model("User",UserSchema);