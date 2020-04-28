var dependable=require("dependable");
var path=require("path");
var container=dependable.container();

var MyModule=[
    ["async","async"]
];
MyModule.forEach(function(val){
    container.register(val[0],function(){
        return require(val[1]);
    })
});
container.load(path.join(__dirname,"/controller"));
container.register("container",function(){
    return container;
});
module.exports=container;