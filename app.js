var express= require("express");
var bodyParser=require("body-parser");
var http=require("http");
var ejs=require("ejs");
var app= express();
var container=require("./container");
var socketIO=require("socket.io");
require('dotenv').config();
var Token=process.env.TOKEN;
var SESSION_ID=process.env.SESSION_ID;
var apiai = require('apiai')(Token);
const PORT=process.env.PORT || 8080;
container.resolve(function(users){
    var app=SetExpress();
    function SetExpress(){
        var app=express();
        var server=http.createServer(app);
        var io=socketIO(server);
        server.listen(PORT,function(){
            console.log("server is running on port "+PORT);
        })
        Configure(app);
        require('./socket/voice-recog')(io,apiai,SESSION_ID);
        var router=require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    function Configure(app){
        app.use(express.static("public"));
        app.set("view engine","ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
})