<<<<<<< HEAD
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
=======

// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
      id       : String, 
      title    : String,
      completed: Boolean
    }),

    Todo = mongoose.model('Todo', Schema);

/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
>>>>>>> origin/master
    if (error) console.error(error);
    else console.log('mongo connected');
});

<<<<<<< HEAD
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
    res.status(404);
    res.render('pages/error', {
        title: 'What are you looking for is not here.',
        description: 'error page',
        keywords: 'error, 404, lol'
    });
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
=======
express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .post('/api/todos', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .del('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Todo.remove({ completed: true }, function ( err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      res.json(200, todo);
    });
  })

  .put('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      todo.save( function ( err, todo ){
        res.json(200, todo);
      });
    });
  })

  .del('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      todo.remove( function ( err, todo ){
        res.json(200, {msg: 'OK'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);
>>>>>>> origin/master
