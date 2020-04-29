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
    recognition.interimResults = false;
    document.querySelector('button').addEventListener('click', () => {
        var lang=document.getElementById("lang").value;
        recognition.lang = lang;
        recognition.start();
    });   
    recognition.addEventListener('result', (e) => {
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
        document.querySelector(".output-you").textContent=text;
        socket.emit("message",text,function(){
            console.log("Message has been successfully send");
        })
    });   
    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });
    function Utter_the_text(text){
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        synth.speak(utterance);
    }
    socket.on("response",function(Response){
        Utter_the_text(Response);
        document.querySelector(".response").textContent=Response;
    })
})