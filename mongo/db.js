const  mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/rest_record')
    .then(()=> console.log('connected to database'))
    .catch((e)=>console.log("Error found connecting to database",e))
    