module.exports=function(io,apiai,sessionId){
    io.on("connection",function(socket){
        socket.on("join",function(data,callback){
            socket.join(data);
            callback();
        })
        socket.on("message",function(data,callback){
            var request = apiai.textRequest(data, {
                sessionId: sessionId
            });
            request.on('response', function(response) {
                var Aitext=response.result.fulfillment.speech;
                socket.emit("response",Aitext);
            });
            request.on('error', function(error) {
                console.log(error);
            });
            request.end();
            callback();
        })
    });
}