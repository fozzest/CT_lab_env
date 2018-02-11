var http = require("http");
var date = new Date();
var current_hour = date.getHours();
var hungry = "im hungry";

const PORT = 8080;

function handleRequest(request, response){
	response.end("date:" + date);
}

var server = http.createServer(handleRequest);



server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);	

});