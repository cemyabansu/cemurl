var Url = require('../models/url');
var validator = require('validator');

exports.AddUrl = function (req,res) {
    //getting new url from query
    var newUrl = req.query.newUrl;

    //Check the url
    if(!validator.isURL(newUrl)){
      res.status(404).json('Url is not valid!');
      console.error('Url is not valid! The url : ' + newUrl);
      return;
    }

    var newKey = makeKey();

    var shorterUrl = new Url({
        key : newKey,
        url : newUrl
    });

    // console.log('new url : ' + newUrl);
    // console.log('new key : ' + newKey);

    shorterUrl.save( function ( err, shorterUrl ){
      if(!err){
        res.status(200).json(newKey);
      }
      else{
        res.status(404).json(err.message);
        console.error('Error occured when trying to save the url to db. Error :' + err.message);
      }
    });
}

exports.GetUrl = function (req, res, next) {
    var request = req.originalUrl.slice(1);
    Url.findOne({ key: request }, function (err, returnedUrl) {
            if(err === null && returnedUrl !== null){
                //If url is found
                res.redirect(returnedUrl.url);
            }else{
                //if key not found, root to next controls
                console.error("The shorter url is not found!");
                next();
            }
        });
}


function makeKey(){
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        key += possible.charAt(Math.floor(Math.random() * possible.length));

    return key;
}
