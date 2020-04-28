module.exports=function(io){
    io.on("connection",function(socket){
        socket.on("join",function(data,callback){
            socket.join(data);
            callback();
        })
    });
}