const mongoose = require('mongoose');

const dbConnect=  ()=>{
        mongoose.connect(process.env.MONGODB_URL)
       .then(()=>{console.log("DATABASE CONNECTION SUCCESSFULL")})
       .catch((error)=>console.log(error));
}

module.exports=dbConnect;