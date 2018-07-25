var http = require('http');
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  
  var mongo=require('mongodb');
  var db, uri="mongodb://"+ process.env.IP+ "/Test";
  
  
  var mongo=require('mongodb')
  mongo.MongoClient.connect(uri,{userNewUrParser:true},
  function(err,client){
    if(err){
      console.log("couldnt connect with mogodb");
    }else{
      db= client.db('simple-node');
    }
  });
  
  var save=function(form_data){
    db.createCollection('users',function(err,collection){});
    var collection=db.collection('users');
    collection.save(form_data);
  }
  
  var server = http.Server(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  

  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  })
  
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  
   app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  
  app.post('/signup', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    console.log("post received: %s %s", username, email);
});

app.post('/submit_user', function(req, res){
  console.log(req.body);
  save(req.body);
  res.status('200');
})

  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });