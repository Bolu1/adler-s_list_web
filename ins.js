const express = require('express')
const router = express.Router()
const {MongoClient} = require("mongodb")
const assert = require('assert')

const url = 'mongodb://localhost:27017/adler'
let posta
let lis
let ind = 0
let area


router.get('/', (req,res,next)=>{
    res.render('index')
})

router.get('/signup',(req,res,next)=>{
    res.render('signup')
})

router.get('/signin', (req,res,next)=>{
    res.render('signin')
})

router.get('/list', (req,res,next)=>{
    
    let resultarray1= []
    
    MongoClient.connect(url, { useNewUrlParser: true}, (err, client)=>{
            assert.equal(null, err)
            const q = req.query.item
            area = req.query.item  
            console.log(area)
            console.log(req.query.item)
            const db = client.db('adler')
            var cursor = db.collection('item').find()
            cursor.forEach((doc, err)=>{
                assert.equal(null, err)
                posta = doc.items.slice()
                //console.log(posta)
                //console.log(doc.items)
                //console.log(doc.items[0].length)
                for(var i = 0; i<doc.items.length; i++){
                    if(doc.items[i][0] == q){
                        const t = doc.items[i]
                        ind = i
                        for(var w = 1; w<t.length; w++){
                            resultarray1.push(doc.items[i][w])
                            //console.log(resultarray1)
                        
                        }
                     }
                }
                },
                function(){
                    client.close()
                    
                    var con = resultarray1.length != 0
                   
                    res.render('inv', {items:resultarray1, condition: con, title:q})
                   
                    //console.log("last"+posta)
                }
                
            )
        })
    })


router.get('/invlist', (req,res,next)=>{
    // res.render('inv list', { arr: ['Foods', 'Fruits', 'Cloths'], condition: true})
    let resultarray= []
    
    MongoClient.connect(url, { useNewUrlParser: true}, (err, client)=>{
            assert.equal(null, err)
            const db = client.db('adler')
            var cursor = db.collection('item').find()
            cursor.forEach((doc, err)=>{
                assert.equal(null, err)
                //console.log(doc.items[0].length)
                lis = doc.items.slice()
                
                for(var i = 0; i<doc.items.length; i++){
                //console.log('in Loop')
                resultarray.push(doc.items[i][0])
                }
                //console.log('on' + lis)
                },
                function(){
                    client.close()
                    //res.send(resultarray)
                    var con = resultarray.length != 0
                    //console.log(con)

                    res.render('inv list', {arr:resultarray, condition: con})
                    //console.log(resultarray)
                    posta = resultarray
                    //console.log('on' + lis)
                }
                
            )
        })
})

router.get('/logout', (req,res,next)=>{
    res.redirect('/')
})

router.post('/si',(req,res,next)=>{
    res.send([req.body.email, req.body.pass])
})

router.post('/add', (req, res,next)=>{
    var x = parseInt(req.body.total)
    var y = parseInt(req.body.price)
    const tot = x*y
    const aitem = [req.body.name, req.body.qty, req.body.price, tot ]
    console.log(area)
    MongoClient.connect(url, { useNewUrlParser: true}, (err, client)=>{
        assert.equal(null, err)
        const db = client.db('adler')
        //console.log(posta)
        posta[ind].push(aitem)
        //console.log('first' + posta)
        db.collection('item').update({id:1},{$set:{items: posta}}, (err, result)=>{
            assert.equal(null, err)
            //console.log(posta)
            client.close()
            
        })
    })
    res.redirect('/list?item='+area)
})

router.post('/removel', (req,res,next)=>{
    MongoClient.connect(url, (err,client)=>{
        assert.equal(null, err)
        const db = client.db('adler')
        if(req.body.remove-1>-1 && req.body.remove-1<lis.length){
        console.log(lis)
        lis.splice(req.body.remove, 1)
        console.log(req.body.remove)
        //console.log('First' + posta)
        db.collection('item').updateOne({id:1}, {$set:{items: lis}}, (err, result)=>{
            console.log("Sec" + lis)
            assert.equal(null, err)
            client.close
            posta = lis
        })}
})
    res.redirect('/invlist')
})

router.post('/remove', (req,res, next)=>{
    MongoClient.connect(url, (err,client)=>{
        assert.equal(null, err)
        const db = client.db('adler')
        if(req.body.remove>0 && req.body.remove<posta[ind].length){
        posta[ind].splice(req.body.remove, 1)
        console.log(posta)
        db.collection('item').updateOne({id:1}, {$set:{items: posta}}, (err, result)=>{
            assert.equal(null, err)
            client.close
        })}
    })
    res.redirect('/list?item='+area)
})

router.post('/addl', (req, res,next)=>{
   
    console.log(req.body.add)
    MongoClient.connect(url, { useNewUrlParser: true}, (err, client)=>{
        assert.equal(null, err)
        const db = client.db('adler')
        //console.log(posta)
        let arr = []
        arr.push(req.body.add)
        lis.push(arr)
        console.log('first' + lis)
        db.collection('item').update({id:1},{$set:{items: lis}}, (err, result)=>{
            assert.equal(null, err)
            //console.log(posta)
            client.close()
            
        })
    })
    arr = []
    res.redirect('/invlist')
})


module.exports = router