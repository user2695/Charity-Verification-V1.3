const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path")
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const mainRoutes = require("./routes/main") 
const payRoute = require("./routes/server")
const qrcode = require('qrcode')
const Post = require("./models/Post");
const User = require("./models/User");
const methodOverride = require("method-override")
app.set('view engine','ejs');
app.use(express.static('public'))


app.use(express.urlencoded({extended:true}))

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    // const collections = Object.keys(mongoose.connection.collections);
    // console.log(collections);
    console.log("Connected to MongoDB");
  }
);

app.get('/favicon.ico', (req, res) => res.status(204));


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//method-override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// app.get("/lol", (req,res,next)=>{
//   res.render("qrindex")
// })

//MAIN PAGE
app.get("/" , (req,res) => {

  const approved = [];

  Post.find()
  .then((result) => {
    result.map(ele => {
      if(ele.approved == true){
      approved.push(ele);
    } else{
     console.log("no approved posts");
    }})
    res.render("index", {posts:approved}) 
  } )
  .catch((err)=> console.log(err,"found error"))
});







app.use(mainRoutes)
app.use(payRoute);
app.use(adminRoute)
app.use(authRoute);
app.use(postRoute);
app.use(userRoute);




// const a = async(req,res) => {
//   const b = await User.find();
//   console.log(b);
// }


// app.get("/lol/qrscan", async(req, res, next) => {
//  try {
//   console.log("inside scan");
//   const b = await User.find();
//   const input_text = [];
//   b.map(d => {
//     input_text.push(`Email: ${d.email}, Endorser:${d.endorser}`)
//   })

//   console.log(input_text);

//   // console.log(input_text);

//   qrcode.toDataURL(input_text, (err, src) => {
//     if (err) res.send("Something went wrong!!");
//     res.render("qrscan", {
//       qr_code: src,
//     });
//   });
//  } catch (error) {
//    res.status(500).json(error)
//  }
// });




app.listen(8800, () => {
  console.log("Backend server is running!");
});
