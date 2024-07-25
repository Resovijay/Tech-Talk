const mongoose = require('mongoose');

const UserProfile = new mongoose.Schema({
    username:{
       type:String,
    },
    picture:{
        type:String,
    },
    githubLink:{
        type:String,  
    },
    codingProfileLink:{
        type:String,
    }
});

module.exports = mongoose.model("UserProfile",UserProfile);