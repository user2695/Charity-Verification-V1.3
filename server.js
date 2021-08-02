//jshint esversion:6

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
qrcode = require('qrcode');
var qr = require('qrcode');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const DB = "mongodb+srv://admin-zubair:zubair12@cluster0.7tjmi.mongodb.net/testDatabase?retryWrites=true&w=majority/notesDB"

mongoose.connect(DB, {
  
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true,
 useFindAndModify: false
}).then(()=>{
    console.log("connected to mongoDb");
}).catch((error)=>
        console.log("no connection"));

//Schema

 const userSchema = {
    fullname: String,
    email: String,
    password: String,
    telcollector: String,
    org:String,
    orgEmail: String,
}
const User = mongoose.model("User",userSchema);
const { check, validationResult} = require("express-validator");
const { Router } = require("express");
app.use("/styles",express.static("styles"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");


//Navigation
app.get("/",function(req,res){
    res.render("index")
});
app.get("/login",function(req,res){
    res.render("login")
})
app.get("/register", function(req, res){
  res.render("register")
})

app.post("/", function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
  let newUser = new User({ 
      email:req.body.email,
      password:hash, 
      telcollector:req.body.telcollector ,
      org:req.body.org,
      orgEmail:req.body.orgEmail,
  });
  newUser.save();
  res.redirect("/");
  })

})

app.post("/login", function(req, res){
 const email = req.body.email;
 const password = req.body.password;
var foundUser;
 User.findOne({email:email}, function(err, foundUser){
 if (err){
    res.send("Invalid login details");
 }else{
     if (foundUser){
         bcrypt.compare(password, foundUser.password, function(err, result){
          if (result === true){
            const url = foundUser.toString();
            
            if (url.length === 0) res.send("Empty Data!");
            qr.toDataURL(url, (err, src) => {
                if (err) res.send("Error occured");
        
                res.render("scan", { src });
                
            });
                        
            }else{
              res.send("Invalid login details! Try again.");
            }
          });
        }
      }    
}); 
})

app.listen(3000, function(){
    console.log("Server started at port 3000");
});
