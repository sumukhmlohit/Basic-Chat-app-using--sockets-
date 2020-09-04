//Make connection

var socket=io.connect('http://localhost:4000');

var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');

//emit events

btn.addEventListener("click",function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value="";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value)
})

message.addEventListener('change',function(){
    //called when user focus away from inputfield or presses enter
      socket.emit('typingstop');
    });

//Listen for events

socket.on('chat',function(data){
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+data.handle+': '+'</strong>'+data.message+'</p';   
});

socket.on('typing',function(data){
    feedback.innerHTML='<p><em>'+data+'is typing a message...</em></p>';
});

socket.on('typingstop',function(data){
    feedback.innerHTML="";
});

/*
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
*/