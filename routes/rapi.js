const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../mongo/db')
const user = require('../models/register');
router.use(express.json());
router.use(express.urlencoded({extended:false}));
const cors = require('cors');
router.use(cors());
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.json()); 


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


router.post('/signup',async(req,res)=>{
    try {
        const data = new user({
            name:req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            password:req.body.password
        })
        const val = await data.save()
        res.send(val);
    } catch (error) {
        res.send(error);
    }
})

//this is for login.
router.post('/login', async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await user.findOne({email:email});
  
        if(useremail.password === password) {
           let payload = {subject: 1}
           let token = jwt.sign(payload, 'secretKey')
           res.status(200).send({token})   
           } 
    } catch(error){
        res.status(400).send("invalid email");
    }
  });
module.exports = router;