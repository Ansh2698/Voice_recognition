$(document).ready(function(){
    var socket=io();
    var params="Home";
    socket.on("connect",function(){
        console.log("Yeah!");
        socket.emit("join",params,function(){
            console.log("user has connected to this channel");
        })
    })
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var SpeechGrammarList=window.SpeechGrammarList || window.webkitSpeechGrammarList;
    var grammar="#JSGF V1.0";
    var recognition = new SpeechRecognition();
    var speechrecognitiongrammarList=new SpeechGrammarList();
    speechrecognitiongrammarList.addFromString(grammar,1);
    recognition.grammars = speechrecognitiongrammarList;
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