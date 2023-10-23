const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:false}));
const mongoose = require('mongoose');
const db = require('../mongo/db');
const record = require('../models/record');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/get',(req,res)=>{
    record.find({}).then(function(result){
        res.send(result);
    })
    .catch(function(error){
        res.send(error);
    })
    
})
router.post('/post', async(req,res)=>{
   try {
    const data = new record({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        mobile:req.body.mobile,
        services:req.body.services,

    }); const val = await data.save();
    res.send(val);
   } catch (error) {
        res.send(error);
   } 
})
// router.put('/update/:id', async(req,res)=>{
//     try {
//         const data = await record.findById(req.params.id);
//         data.name = req.body.name,
//         data.email = req.body.email,
//         data.address = req.body.address,
//         data.mobile = req.body.mobile,
//         data.services = req.body.services
//         const val = await data.save();
//         res.send(val);
//     } catch (error) {
//         res.send(error);
//     }
// })
router.put('/update/:id', async(req,res)=>{
    try { 
        const data = await record.findByIdAndUpdate(req.params.id,{useFindAndModify:false});
        data.name = req.body.name,
        data.email = req.body.email,
        data.address = req.body.address,
        data.mobile = req.body.mobile,
        data.services = req.body.services
        const val = await data.save();
        res.send(val);
    } catch (error) {
        res.send(error);
    }
})
// router.delete('/delete/:id',(req,res)=>{
//   record.findOneAndDelete({id:req.params.id})
//   .then(function(result){
//     res.send(result);
//   })
//   .catch(function(error){
//     res.send(error);
//   })
// })

router.delete('/delete/:id',(req,res)=>{

  record.findByIdAndDelete(req.params.id)
  .then(function(result){
    res.send(result);
  })
  .catch(function(error){
    res.send(error);
  })
})
module.exports = router;
