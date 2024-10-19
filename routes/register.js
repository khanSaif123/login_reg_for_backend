const express = require('express')
const router = express.Router()
var mongodb = require('mongodb')

// http:://localhost:3000/register/reg , post

const url = 'mongodb+srv://saifkhan:saif@nareshitproject.cmm0f.mongodb.net/'


router.post('/reg', async function(req, res, next){

    const data = req.body

  
    try{
          // connect with the database.
        const mongoClient = mongodb.MongoClient
        // igot the server
        const server = await mongoClient.connect(url)
        // server contain data base. get own database
        const db = server.db('employees')
        // db contain collection
        const collection = db.collection('register')
        const result = await collection.insertOne(data)
        res.send(result)

    }catch(err){
        res.send(err.message)
    }
   
})

router.post('/login', async function(req, res, next){
    const {email, password} = req.body

    const mongoClient = mongodb.MongoClient
        // igot the server
        const server = await mongoClient.connect(url)
        // server contain data base. get own database
        const db = server.db('employees')
        // db contain collection
        const collection = db.collection('register')
        collection.findOne({email:email})
        .then((user)=>{
           if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json('Password is incorrect')
            }
           }
           else{
            res.json('No record exists')
           }
        })

})

module.exports = router;