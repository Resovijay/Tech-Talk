const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
    },
});

module.exports = mongoose.model("File",fileSchema);
