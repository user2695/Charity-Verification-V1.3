const router = require("express").Router();
const Post = require("../models/Post");
const qrcode = require("qrcode")




//TO BE APPROVED START - redirects to approval
   router.get("/admin-login/to-approve/:id", async(req, res) => {
    try {
      const id = req.params.id 
      Post.findById(id)
      .then((result)=>{
      res.render("admin-view-details", {post:result})
    })
  
    } catch (error) {
      res.status(500).json(error)
    }
  })

 //TO BE APPROVED FINAL - posts will be approved here
 router.put("/admin-login/approve/:id", async(req, res, next) => {
    try {
      const id = req.params.id ;
      const updates = req.body;
      const options = {new:true};
  
      const result = await Post.findOneAndUpdate({_id:req.params.id},{
        $set:{
          approved: true,
        }
      },options
        )
        const notApproved = []
        const resul = await Post.find()
        resul.map(ele => { if(ele.approved == false){
        notApproved.push(ele)
        }})

      res.render("admin-view",{posts:notApproved})
      // console.log(result)
      // res.status(200).json("done")
      
    } catch (error) {
      res.status(500).json(error)
    }
  })




 router.get('/approved', (req, res) => {
   const promises = [];
  const approved = [];
  const detailArray = [];
  const qrArray = [];

  const postFind = async() => {
    
   const result = await Post.find()
   console.log("111"); //one
    result.map(ele => {if(ele.approved == true){
      approved.push(ele);
      
    } else{
     console.log("no approved posts");
    }
  })
  approved.map(app => {
    detailArray.push(`Amount: ${app.amount}, Verified: ${app.approved}`)
  })
  const qrGen = await Promise.all(detailArray.map(async (qr) => {
    await qrcode.toDataURL(qr, (err,src)=>{
      qrArray.push(src)
      // console.log(src);
    })
  } ))
  
  
  console.log("222");//two
  
console.log('444');//four
  }

  // const generateQR = async(text) =>{
  //   try{
  //     console.log(await qrcode.toDataURL(text));
  //   } catch(err){
  //     console.log(err);
  //   }
  // }
  
 
 
 
  Promise.all([postFind()])
  .then((result)=>{
  // console.log(detailArray);
  console.log('555');//five
  console.log(qrArray);
  res.render("approved-posts",{posts:approved})
  })
 
    
  })
  

      

//   router.get('/approved', (req, res) => {
//   const approved = [];
//   Post.find()
//   .then((result) => {
//     result.map(ele => {if(ele.approved == true){
//       approved.push(ele);
//     } else{
//      console.log("no approved posts");
//     }
//   })  
  
//   // approved.map(a=>console.log(a.amount))
//   const qrInput = [];
//   const qrArray = [];
//   const promises = [];
//   approved.map(d => {
//     qrInput.push(`Amount: ${d.amount}, Verified:${d.approved}`)
//   })

//   qrInput.map(i => {
//     const pro = async() => {
//       await qrcode.toDataURL(i, (err, src) => {
//         if (err) res.send("Something went wrong!!");
//         qrArray.push(src)
//         console.log("inside 1");
//         promises.push(pro())
        
//       }) 
//     }
//   })
//   console.log(promises);
//   Promise.all(promises)
//   .then(results => {
//     console.log(results);
//     res.render("approved-posts", {posts:approved,qr_code:qrArray}) 
//   })
//   .catch(err => console.log(err))
// })

//   .catch((err)=> console.log(err,"found error"))
// })
  

//   router.get('/approved', (req, res) => {
//   const approved = [];
//   Post.find()
//   .then((result) => {
//     result.map(ele => {if(ele.approved == true){
//       approved.push(ele);
//     } else{
//      console.log("no approved posts");
//     }
//   })
//     // approved.map(a=>console.log(a.amount))
//     const qrInput = [];
//     approved.map(d => {
//       qrInput.push(`Amount: ${d.amount}, Verified:${d.approved}`)
//     })

//     qrcode.toDataURL(qrInput, (err, src) => {
//       if (err) res.send("Something went wrong!!");
//       res.render("approved-posts", {posts:approved,qr_code:src}) 
//     })
    
//   })
//   .catch((err)=> console.log(err,"found error"))
// })

// //DISPLAY APPROVED POSTS - posts that are approved will be displayed
// router.get('/approved', (req, res) => {
//     const approved = [];
//     Post.find()
//     .then((result) => {
//       result.map(ele => {if(ele.approved == true){
//         approved.push(ele);
//       } else{
//        console.log("no approved posts");
//       }})
//       res.render("approved-posts", {posts:approved}) 
//     } )
//     .catch((err)=> console.log(err,"found error"))
//   })

  



//DELETE POST -- post will be deleted/rejected

router.delete("/:id", (req, res) => {

    const id = req.params.id
    Post.findByIdAndDelete(id)
      .then((result) => {
          res.json({redirect: '/admin-view'})
      })
      .catch(err => console.log(err))
  });

  module.exports = router;