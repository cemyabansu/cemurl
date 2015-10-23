var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
      key       : String, 
      url       : String
    });

var Url = mongoose.model('Url', Schema);

mongoose.connect('mongodb://cyabansu:Cy123456@ds039504.mongolab.com:39504/cemurl', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('pages/index', {
        title: 'willkommen',
        description: 'There is no such thing as perfect',
        keywords: 'cemyabansu, cem, yabansu, cemyabansu.com'
    });
});

app.get('/add', function (req, res) {
    var newUrl = req.param('newUrl');
    var newKey = makeKey();

    //Key control must be done!!

    var shorterUrl = new Url({
        key : newKey,
        url : newUrl
    });

    console.log('new url : ' + newUrl);
    console.log('new key : ' + newKey);
    
    shorterUrl.save( function ( err, shorterUrl ){
        res.json(200, newKey);
        console.log('added to db');
      });
});

app.get('*', function (req, res) {
    var request = req.originalUrl.slice(1);
	
    if (request.length === 6) {
        Url.findOne({ key: request }, function (err, returnedUrl) {
            console.log("the found url is : " + returnedUrl.url);
            res.redirect(returnedUrl.url);
        });
	}
	else{
		res.status(404);
		res.render('pages/error', {
			title: 'What are you looking for is not here.',
			description: 'error page',
			keywords: 'error, 404, lol'
		});
	}

	
});

var port = process.env.PORT || 8080;
app.listen(port);


function makeKey(){
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        key += possible.charAt(Math.floor(Math.random() * possible.length));

    return key;
}
