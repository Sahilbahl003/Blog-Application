const multer = require('multer');   
const storage=multer.memoryStorage();

const fileFilter=(req,file,cb)=>{
    if(
        file.mimetype==="image/jpeg" ||
        file.mimetype==="image/png" ||
        file.mimetype==="image/jpg"     
    )
    {
        cb(null,true);
    }                       
    else
    {
        cb(new Error("Only jpeg, png and jpg files are allowed"),false);
    }       
};

module.exports=multer({storage,fileFilter});