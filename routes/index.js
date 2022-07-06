var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local');
const userModel=require("./users")
const movieModel=require("./movie");

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(deta){
   movieModel.find()
   .populate('author')
   .then(function(deta){ 
    res.render('home',{deta})
   
      
  })  
})
})




router.get('/create', function(req, res, next) {
  res.render('create')
})

router.post('/createmovie', function(req, res, next) {
  userModel.findOne({username:req.session.passport.user}) 
  .then(function(founduser){
     movieModel.create({
       Title:req.body.Title,
        desc:req.body.desc,
        image:req.body.image
    }).then(function(createdpost){
         founduser.posts.push(createdpost)
         founduser.save()
         .then(function(saved){
          res.redirect("/home")
         })
     })
  })
})

router.get('/delete/:_id', function(req, res, next) {
    movieModel.findOneAndDelete({_id:req.params._id})
    .then(function(remove){
        res.redirect('/home')
    })
});

router.get('/edit/:_id', function(req, res, next) {
  movieModel.findById({_id:req.params._id})
  .then(function(updated){
    res.render('update',{user:updated})
  })
});

router.post('/update/:_id', function(req, res, next) {
  var data={
    Title:req.body.Title,
    desc:req.body.desc
  }
  movieModel.findByIdAndUpdate({_id:req.params._id},data)
  .then(function(update){
    res.redirect('/home')
  })
  
});



 

router.post('/register', function(req, res, next) {
  var newuser= new userModel({
      firstname:req.body.firstname,
      secondname:req.body.lastname,
      email:req.body.email,
      username:req.body.username
  })
  userModel.register(newuser,req.body.password)
  .then(function(e){
   passport.authenticate("local")(req,res,function(){
     res.redirect("/")
   })
 }).catch(function(u){
     res.send(u)
 })
 });
 
 router.get('/login', function(req, res, next) {
  res.render('login')
})

// router.get('/logout', function(req, res, next) {
//   res.render('index')
// })

 router.post('/login', passport.authenticate("local", {
   successRedirect:"/home",
   failureRedirect:"/"
 }),function(req,res,next){ });
 
 router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
 
 function isLoggedIn(req,res,next)
 {
   if(req.isAuthenticated()){
     return next();
   }
   else{
     res.redirect("/")
   }
 };
 



module.exports = router;
