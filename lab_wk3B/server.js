//here we created array to hold our possible user responses and the appropriate system output 
//the first item in the Array is what the user entered after are the possible system responses
//$1 inserts the user responses 
//.* indicates any input 
// \. indicates end of a line 
// \? indicates ends with a question mark 
var convpatterns = new Array (
  new Array (".*hello.*","Greetings."),
  new Array ("^I (?:wish |would like )(?:I could |I was able to |to be able to )(.*)\.","I wish that too sometimes"),
  new Array ("sad\.", "I'm sorry")
  new Array ("I need (.*)\." , "Sometimes I feel I need $1 as well", "Yes, it would be nice to have $1"),


uinput = ""
soutput = ""
dialog = "Hi, how are you?" + "\n"; 
 

function mainroutine() {
    //get the input from the basic text area 4 (where the user types)
    //set the new dialog equal to the old dialog + the new dialog
    uinput = document.mainscreen.BasicTextArea4.value;
    dialog = dialog + "User: " + uinput +  '\r' + "\n";
    conversationpatterns()
    dialog = dialog  +  '\r' + "\n";
    updatescreen();
}

//-------
function conversationpatterns() {

  //here we write a for loop to loop through the conversation arrays
   for (i=0; i < convpatterns.length; i++) {
    re = new RegExp (convpatterns[i][0], "i");
    //if there is a user input, return a random respons from the system response options 
    if (re.test(uinput)) {
      len = convpatterns[i].length - 1;
      index = Math.ceil( len * Math.random());
      reply = convpatterns[i][index];
      soutput = uinput.replace(re, reply);
      soutput = initialCap(soutput);
      dialog = dialog + "System: " + soutput +  '\r' + "\n";
      break;
  }
 }
}

//-------

function initScreen() {
 updatescreen()
 document.getElementById("BasicTextArea4").focus();

}

//-------
function updatescreen() {
 document.mainscreen.BasicTextArea1.value = dialog

 //uncomment to display the system output and uinput 
 // document.mainscreen.BasicTextArea2.value = soutput
 // document.mainscreen.BasicTextArea3.value = uinput

 document.mainscreen.BasicTextArea4.value = ""
}

//-------
function initialCap(field) {
   field = field.substr(0, 1).toUpperCase() + field.substr(1);
   return field
}


function scroll(){
    var textarea = document.getElementById("dialogArea");
    textarea.value += '\n';
    textarea.scrollTop = textarea.scrollHeight;
}




var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');
var serialVal;

var mySerialPort = new SerialPort('/dev/tty.usbmodem14611', { //paste your port path here
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
