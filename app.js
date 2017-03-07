/* RESBot by nlusskin -- 3/7/17 */

var http = require('http');
url = require("url"); 
http.createServer(function (req, res) {
    //Makeshift router
    if (req.url.search('/webhook') === 0) {
        req.pipe(res);
        // Parse the request for arguments and store them in _get
        var _get = url.parse(req.url, true).query;
        // Write headers to the response. 
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (_get['mode'] === 'subscribe' &&
      _get['verify_token'] === 'resdoes') {
            console.log("Validating webhook");
            res.end(_get['challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.statusCode = 403;
            res.end('FAILED');
        }
    } else { res.end("NOTHING TO SHOW"); }
}).listen(8080);