$(document).ready(function(){
    var socket=io();
    var params="Home";
    socket.on("connect",function(){
        console.log("Yeah!");
        socket.emit("join",params,function(){
            console.log("user has connected to this channel");
        })
    })
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    document.querySelector('button').addEventListener('click', () => {
        recognition.start();
    });   
    recognition.addEventListener('result', (e) => {
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
        document.querySelector(".output-you").textContent=text;
    });   
    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });
})