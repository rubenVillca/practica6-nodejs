var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var ejs = require('ejs');
var partials = require('express-partials');
var indexRouter = require('./routes/index');
//UI
var loginRouterUI = require('./routes/ui/login');
var usersRouterUI = require('./routes/ui/users');
var restaurantsRouterUI = require('./routes/ui/restaurants');
var commentsRouterUI = require('./routes/ui/comments');
//API
//var loginRouterAPI = require('./routes/api/login');
var usersRouterAPI = require('./routes/api/users');
var restaurantsRouterAPI = require('./routes/api/restaurants');
var commentsRouterAPI = require('./routes/api/comments');
var restFul =  require('method-override');

var app = express();
app.use(partials());


app.use(restFul('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.set('port',process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
let router = express.Router();
router.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.set('view engine', 'ejs');

app.use('/', loginRouterUI);
app.use('/', usersRouterUI);
app.use('/', restaurantsRouterUI);
app.use('/', commentsRouterUI);

//app.use('/api/v1/nodejscourse', loginRouterAPI);
app.use('/api/v1/nodejscourse', usersRouterAPI);
app.use('/api/v1/nodejscourse', restaurantsRouterAPI);
app.use('/api/v1/nodejscourse', commentsRouterAPI);

//app.use('/', router);


app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, './angularapp/dist/angularapp/index.html'));
  res.redirect('/login');
});

app.listen(app.get('port'),  () => {
  console.log('Example app listening on port:'+ app.get('port')+'!');
});
