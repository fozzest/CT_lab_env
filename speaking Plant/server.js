
var questionNum = 0;													
var question = '<h1>tell me about your day</h1>';				 
var output = document.getElementById('output');	


function chat() { 
    var input = document.getElementById("input").value;
		var sad = input.includes("sad");
		var happy = input.includes("happy");
    console.log(input);
	
    if (questionNum == 0){
			if (sad){
    output.innerHTML = '<h1>im sorry </h1>';
			}	
			else if (input.match(/sad/g)==2){
				output.innerHTML = '<h1>that is VERY sad </h1>'
			}
			else if (happy){
				output.innerHTML = '<h1>that is good</h1>'

			}
} 
  
};


//key event https://stackoverflow.com/questions/18160342/jquery-how-to-trigger-click-event-on-pressing-enter-key
$(document).keypress(function(e) {
  if (e.which == 13) {
    chat();	
		questionNum == 0;
  }
});


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');
var serialVal;

var mySerialPort = new SerialPort('/dev/tty.usbmodem1451', { //paste your port path here
  parser: new SerialPort.parsers.Readline('\n')
});



server.listen(port, function(){
  console.log('Server listening on ' + port);
});

io.on('connection',function(client){
  console.log('Socket connected...');
    client.emit('initialMessage');

      client.on('0', function(){
        console.log("sad")
      mySerialPort.write("0");

    });

    client.on('1', function(){
      console.log("happy")

      mySerialPort.write("1");

    });

  });



app.get('/', function(req,res){
  console.log('serving index.html');
  res.sendFile(__dirname + '/digitalWrite.html');

});