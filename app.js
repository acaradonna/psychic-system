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
	console.log(req.headers);

	// REQUEST INFORMATION PULL
	const url = req.url;
	const method = req.method;

	// HOME PAGE HANDLING
	if (url === '/'){
		// HTML PAGE LOAD
		fs.readFile("index.html", function(error, pgResp){
			// LOAD ERROR HANDLING
			if (error){
				res.writeHead(404);
				res.write('Content not found');
				return res.end();
			} // END ERROR HANDLING
			else { // NO ERROR
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.write(pgResp);
				return res.end();
			}
		}); 
	} // END HOME PAGE HANDLING

	// MESSAGE PAGE
	else if (url === '/message' && method === 'POST'){
		const body = [];

		// DATA EVENT LISTENER
		req.on('data', (chunk) => {
			console.log(chunk + ' - Chunk Added');
			body.push(chunk);
		});

		// "END" EVENT LISTENER
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody);
			const message = parsedBody.split('=')[1];
			fs.writeFileSync('message.txt', message);
		});
		
		res.writeHead(302, {'Location' : '/'});
		return res.end();
	}

	// PAGE DOESN'T EXIST
	else{
		res.write('<html><body><h1>Aw dang, this page straight up dont exist bro :( </h1></body></html>');
		return res.end();
	}



}); //END SERVER LOOP
// BEGIN SERVER LISTEN
server.listen(3000);
