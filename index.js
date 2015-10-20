var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var compression = require('compression');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compression());

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200);
    res.render('pages/index', {
        title: 'willkommen',
        description: 'There is no such thing as perfect',
        keywords: 'cemyabansu, cem, yabansu, cemyabansu.com'
    });
});

app.get('*', function (req, res) {
    res.status(404);
    res.render('pages/error', {
        title: 'What are you looking for is not here.',
        description: 'error page',
        keywords: 'error, 404, lol'
    });
});

var port = process.env.PORT || 8080;
app.listen(port);


