var mongoose = require('mongoose');

var UrlSchema = new mongoose.Schema({
        key       : String,
        url       : String
    });

module.exports = mongoose.model('Url', UrlSchema);
