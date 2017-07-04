const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers');
const PORT = 8000;

const app = express();

mongoose.connect('mongodb://localhost:27017/todoApp', {}, function (err) {
  if(err){
    console.log("Connect fail" + err);
  }
  else {
    console.log("Connected Database todoApp");
  }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(PORT, function (err) {
  if(err){
    console.log("Server running fail" + err);
  }else {
    console.log("Server is running on port " + PORT);
  }
})
