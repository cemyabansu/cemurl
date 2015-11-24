var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var api = require('./controllers/api');
var router = require('./controllers/router');

mongoose.connect('mongodb://cyabansu:Cy123456@ds039504.mongolab.com:39504/cemurl', function (error) {
    if (error) console.error(error);
    else console.log('Connected to mongodb');
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', router.Index);

app.get('/add', api.AddUrl);

//will match paths with 6 chars like /ABCXYZ
app.use(/\/[a-zA-Z0-9]{6}/, api.GetUrl);

//If there is no proper response, show error page
app.get('*', router.Error);

var port = process.env.PORT || 8080;
app.listen(port);
