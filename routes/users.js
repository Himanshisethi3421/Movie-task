var mongoose = require("mongoose");
const passport = require('passport');
mongoose.connect('mongodb://localhost/Task');
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    username: String,
    password: String,
    email:String, 
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movie'
    }],

    
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("user",userSchema);