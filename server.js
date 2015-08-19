var express  = require('express'),
    exphbs   = require('express-handlebars'),
    path     = require('path'),
    mongoose = require('mongoose'),
    morgan   = require('morgan'),
    parser   = require('body-parser'),
    ranges   = require('./models/ranges.js'),
    app      = express();

app.use(morgan('dev'));
app.use(parser.json()); // for parsing application/json
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

// View engine - handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connected to mongodb');
});

// Index page
app.get('/', function (req, res) {
  res.render('body', { title: 'Guns n Ranges'});
});

// JSON test
app.get('/about', function (req, res) {
  res.send('About Us');
});

// JSON test
app.get('/contact', function (req, res) {
  res.send('Contact Us');
});

// API by State
app.get('/state/:state', function (req, res) {
  ranges.find({ state: req.params.state.toUpperCase() }, function (err, data) {
    res.render('body', { rangeData: data[0] });
    console.log(data[0]);
  });
});

app.use(function(req, res) {
    res.redirect('/')
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(app.get('port'));
console.log('Express server listening on port:' + app.get('port'));
