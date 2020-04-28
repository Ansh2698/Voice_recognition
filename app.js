var express= require("express");
var bodyParser=require("body-parser");
var http=require("http");
var ejs=require("ejs");
var app= express();
var container=require("./container");
const PORT=process.env.PORT || 8080;
container.resolve(function(users){
    var app=SetExpress();
    function SetExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(PORT,function(){
            console.log("server is running on port "+PORT);
        })
        Configure(app);
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