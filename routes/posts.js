const router = require("express").Router();
const Post = require("../models/Post");
const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './public/media')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--'+ file.originalname)
  }
})
const upload = multer({storage: storage})


//CREATE POST - post is created and sent for approval from admin
router.post("/create", upload.single("image") , (req,res) => {

  const newPost = new Post({
    title: req.body.title,
    desc : req.body.desc,
    amount: req.body.amount,
    image : req.file.filename,
  })
  
  newPost.save()
  .then((result)=>{
    res.redirect("/")
    // res.send(result)
  })
  .catch(err=>console.log(err))
})

//GET POST DETAILS - shows details of single post when clicked
router.get('/:id', (req, res) => {
  const id = req.params.id
  Post.findById(id)
  .then((result)=>{
    res.render("details", {post:result})
  })
  .catch(err => console.log(err))
})


module.exports = router;
