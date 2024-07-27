const express = require('express');
const dbConnect = require('./configuration/db');
const bodyParser = require('body-parser')

const app = express();

require('dotenv').config();
const router =require('./router/route')
const PORT = process.env.PORT || 4000;
const cors = require('cors');
//const path = require('path');

// const __dirname = path.resolve();



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


// file upload using express-fileupload //
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



app.use('/', router);


app.listen(PORT,()=>{
    console.log("SERVER IS CREATED SUCCESSFULLY");
})

// database connection 
dbConnect();

//cloud se connect krna h 
const cloudinary = require("./configuration/cloudinary");
cloudinary.cloudinaryConnect();

//app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//   });




