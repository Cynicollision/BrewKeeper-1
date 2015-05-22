var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(
    {
        src: __dirname + '/public/css',
        compile: compile,
        debug: true,
        dest: __dirname + "/public/css"
    }
));
app.use(express.static(__dirname + '/public'));

if (env === 'development') {
    mongoose.connect('mongodb://brewjournal:brewj0urnaL@localhost:27017/vast');
} else {
    mongoose.connect('mongodb://brewkeeper:keeperbrew@ds061268.mongolab.com:61268/heroku_app37114486');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('vast db online');
});
var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('BrewKeeper server listening on port ' + port);