const express = require('express');
const mo = require('method-override')
const router = require("express").Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const popup = require("node-popup")

//REGISTER USER
router.post("/registerUser", async (req, res) => {
  try {
    console.log("in try block");
    user = await User.findOne({ email: req.body.email });
    
    if(user){
      res.status(500).json("email already in use");
    }
    else{
      console.log('ran through')
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      endorser: req.body.endorser,
    });
    //save user and respond
    const user = await newUser.save();
    res.render("login");
    // res.status(200).json(user);
    }
    
  } catch (err) {
    console.log("post user error")
    res.status(500).json(err)
    
  }
});

//USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    const approved = [];
    const result = await Post.find()
      result.map(ele=> { if(ele.approved == true){
        approved.push(ele)
      }
    })
    res.render("charityForm")
    // res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

//Admin Login and iterate posts to be approved

router.post("/admin-login" , async(req,res) => {
  const notApproved = []
    try {
      const admin = await Admin.findOne({ email: req.body.email });
      !admin && res.status(404).json("user not found");
      const result = await Post.find()
      result.map(ele=> { if(ele.approved == false){
        notApproved.push(ele)
      }
    })
    res.render("admin-view",{posts:notApproved})

    } catch (error) {
      res.status(500).json(error)
    }
})

module.exports = router;
