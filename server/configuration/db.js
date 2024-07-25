const mongooose = require('mongoose');
require('dotenv').config();
const dbConnect = ()=>{mongooose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connected successfully");
}
).catch((error)=>{
     console.log(error);
     console.log("Database Connection failed!! Try Again");
     process.exit(1);
});
}
module.exports = dbConnect;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        