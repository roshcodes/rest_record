const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is started on Port: ",port);
})
const mongoose = require('mongoose');
const db = require('./mongo/db')

app.use(express.urlencoded({extended:false}));

const path = require('path');
app.use(express.static(path.join(__dirname,'dist')));

const api = require('./routes/api');
app.use('/api', api);

const rapi = require('./routes/rapi');
app.use('/rapi', rapi);