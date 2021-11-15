// const express = require('express')
// const {check,  validationResult} = require('express-validator')
// const router = express.Router()
// const {mongo} = require('mongodb')
// const assert = require('assert')

// const url = 'mongodb://localhost:27017/test'
// const dbname = "db1"




// router.get('/', (req,res,next)=>{
//     res.render('index' )
// })

// router.get('/get-data', (req,res,next)=>{
//     var resultArray = []
//     mongo.connect(url, (err, db)=>{
//         assert.equual(null, err)
//         var cursor = db.collection('user-data').find()
//         cursor.forEach((doc, err)=>{
//             assert.equal(null, err)
//             resultArray.push(doc)
//         }, function(){
//             db.close()
//             res.render('index', {items: resultArray})
//         })
//     })
    
// })

// router.post('/insert', (req,res,next)=>{
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     }
//     mongo.connect(url, (err, db)=>{
//         assert.equal(null, err);
//         db.collection('userData').insertOne(item, (err, result)=>{
//             assert.equal(null, error)
//             console.log("Inserted")
//             db.close()
//         })
//     })

//     res.redirect('/')
// })


// router.get('/update', (req,res,next)=>{

// })

// router.post('/delete', (req,res,next)=>{

// })








// // router.get('/error', (req,res)=>{
// //     res.render('in')
// // })
// // router.get('/', (req, res, next)=>{
// //     res.render('index', {title: 'Form Val', success: false, errors: req.session.errors})
// //     req.session.errors = null
// // })
// //     // router.post('/submit', [check('email', "Error Detected").isEmail() ] , (req,res,next)=>{
// //     //     const errors = validationErrors(req);
// //     //     if(!errors().isEmpty()){
// //     //         req.session.errors = errors
// //     //     }
// //     //     res.redirect('/')
    
// //     // })

// //     router.post("/submit", [check('email', "your custom error message").isEmail()], (req, res) => {

// //         const errors = validationResult(req);
// //         if (!errors.isEmpty()) {
// //             req.session.errors = errors
// //             res.redirect('/error')
// //         }
// //         else{
// //           //here everything is ok to proceed
// //           res.redirect('/')
// //          //to api caller  res.json({msg : "ok"})
// //         }
      
// //       })


// module.exports = router