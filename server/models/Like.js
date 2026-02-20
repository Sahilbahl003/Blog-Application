const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    like:{
        type:String,
        enum:["like","dislike"]
    }
});

module.exports = new mongoose.model("Like",likeSchema);