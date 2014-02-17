var http = require('http');
var url = require('url');
    mysql = require("mysql");
    
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720roe2pj",
    password: "password",
    database: "cs4720roe2pj"
});

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var url_parts = url.parse(request.url, true);
    var query = url_parts.pathname;
    response.writeHead(200, {"Content-Type": "text/html"});

    if (query.charAt(query.length-1) == "/") {
        query = query.slice(0,-1);
    }

    switch(query.toLowerCase())
    {
    case "/pentax":
            connection.query('SELECT id, body, lens FROM picture_data WHERE lens = \'Pentax 55mm\';', function (error, rows, fields){
        response.write("<h1>Displays the image ID, body used, and lens used for each photo from my flickr feed </h1>");
        response.write("<h2>To filter this by lens type add /<i>lenstype</i> to the URL</h2>");
        response.write("<h3>Lens types are Canon, Vivitar, Pentax or Unknown</h3>")
        response.write(JSON.stringify(rows));
        response.end();
        });
    case "/vivitar":
        connection.query('SELECT id, body, lens FROM picture_data WHERE lens = \'Vivitar 70-210mm\';', function (error, rows, fields){
            response.write("<h1>Displays the image ID, body used, and lens used for each photo from my flickr feed </h1>");
            response.write("<h2>To filter this by lens type add /<i>lenstype</i> to the URL</h2>");
            response.write("<h3>Lens types are Canon, Vivitar, Pentax or Unknown</h3>")
            response.write(JSON.stringify(rows));
            response.end();
        });
    case "/canon":
        connection.query('SELECT id, body, lens FROM picture_data WHERE lens = \'Canon 18-55mm\';', function (error, rows, fields){
            response.write("<h1>Displays the image ID, body used, and lens used for each photo from my flickr feed </h1>");
            response.write("<h2>To filter this by lens type add /<i>lenstype</i> to the URL</h2>");
            response.write("<h3>Lens types are Canon, Vivitar, Pentax or Unknown</h3>")
            response.write(JSON.stringify(rows));
            response.end();
    });
    case "/unknown":
        connection.query('SELECT id, body, lens FROM picture_data WHERE lens = \'Unknown\';', function (error, rows, fields){
            response.write("<h1>Displays the image ID, body used, and lens used for each photo from my flickr feed </h1>");
            response.write("<h2>To filter this by lens type add /<i>lenstype</i> to the URL</h2>");
            response.write("<h3>Lens types are Canon, Vivitar, Pentax or Unknown</h3>")
            for (var i in rows) {
                response.write(JSON.stringify(rows[i]]));
            }
            response.end();
    });
    default:
        connection.query('SELECT id, body, lens FROM picture_data;', function (error, rows, fields){
            response.write("<h1>Displays the image ID, body used, and lens used for each photo from my flickr feed </h1>");
            response.write("<h2>To filter this by lens type add /<i>lenstype</i> to the URL</h2>");
            response.write("<h3>Lens types are Canon, Vivitar, Pentax or Unknown</h3>")
            response.write(JSON.stringify(rows));
            response.end();
        });
    }
});

server.listen(process.env.PORT || 8080);
console.log("Server running on http://127.0.0.1:8080");