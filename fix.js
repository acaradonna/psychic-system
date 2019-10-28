const http = require('http');
const fs = require('fs');

console.log('Server now Running. ');
console.log('Awaiting Request...');

//SERVER LOOP START
const server = http.createServer((req, res) => {
	// REQ RECEIVED DEBUG LOGGING
	console.log('**********************************************');
	console.log('Request Received.');
	console.log('URL: ' + req.url);
	console.log('Method: ' + req.method);
	console.log('Headers: ');
	console.log(req.Headers);

	// REQUEST INFORMATION PULL
	const url = req.url;

	// HOME PAGE HANDLING
	if (url === '/'){
		// HTML PAGE LOAD
		fs.readFile("index.html", function(error, pgResp){
			// LOAD ERROR HANDLING
			if (error){
				res.writeHead(404);
				res.write('Content not found');
				res.end();
			} // END ERROR HANDLING
			else { // NO ERROR
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.write(pgResp);
				res.end();
			}
		}); // END HOME PAGE HANDLING
	}

	// PAGE DOESN'T EXIST HANDLING
	else{
		res.write('<html><body><h1>Aw dang, this page straight up dont exist bro :( </h1></body></html>');
		res.end();
	}



}); //END SERVER LOOP
// BEGIN SERVER LISTEN
server.listen(3000);
