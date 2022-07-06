var mongoose = require("mongoose");
const passport = require('passport');
mongoose.connect('mongodb://localhost/Task');


var movieSchema = mongoose.Schema({
  image: { type: String, required: true},
  Title:{ type: String, required: true},
  desc:{ type: String, required: true},
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},
});


module.exports = mongoose.model("movie",movieSchema);
