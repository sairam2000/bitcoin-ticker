//jshint esversion :6
const express = require('express');
const badyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(badyParser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log('port is started at 3000');
});
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.post('/',function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var option ={
    url:'https://apiv2.bitcoinaverage.com/indices/global',
    method:'GET',
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };
  request(option,function(error,response,body){
    var data = JSON.parse(body);
    var price = data.price;
    console.log(price);
    var currentDate = data.time;
    res.write('<p>the current date is '+currentDate+"</p>");
    res.write('<h1>'+amount+crypto+' is currently worth '+price+" "+fiat+ "</h1>");
    res.send();
  });
});
