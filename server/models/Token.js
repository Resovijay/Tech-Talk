const mongoose = require('mongoose');

const Tokenschema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('token',Tokenschema);