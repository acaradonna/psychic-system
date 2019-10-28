const http = require('http'); // Import HTPP module
	console.log('HTTP Module Loaded');
const fs = require('fs');
	console.log('fs Module Loaded');
	console.log('Server Awaiting Request...')

const server = http.createServer((req, res) => {
	console.log('Request Received.');
	console.log('Request URL: ' + req.url);
	console.log('Request Method: ' + req.method);
	console.log('Request Headers: ');
	console.log(req.headers);
	console.log('Request Body: ' + req.Body);
	const url = req.url;
	res.setHeader('Content-Type', 'text/html');
	if (url === '/'){ // if on index
        fs.readFile("index.html", function (error, pgResp) { // start page load
            if (error) { // if error on page load
            	console.log('Page not found error');
                //res.writeHead(404); // write 404 header
                //res.write('Contents you are looking are Not Found'); // content not found
            } else { // if no error...
            	console.log('Page found');
                //res.writeHead(200, { 'Content-Type': 'text/html' }); //set content type
                res.write(pgResp); // send page response
            } // end success 
        //sendHTMLResponse(res, "index.html");
    	});
             
        res.end();
    } // end index 

    else { // page doesn't exist
        //4.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Product Manager</h1><br /><br />To create product please enter: ' + req.url);
        res.end();
    } 
}); //end server loop

server.listen(3000); //only passing a port argument for now, since we're running locally