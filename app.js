
/**
 * Module dependencies.
 */





var express = require('express'), routes = require('./routes');

var app = module.exports = express.createServer();
var x =1;
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat"}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/Idea',routes.idea);
app.get('/connect', routes.connect);
app.get('/', routes.index);
app.get('/Account/Idea', routes.ideaAccount);
app.get('/CreateAccount', routes.CreateAccount);
app.get('/Account/Create', routes.CreateAccount);
app.post('/Account/Create', routes.CreateAccount);
app.get('/Account/', routes.UserAccount);
app.get('/Account/View', routes.Viewget);
app.post('/Account/View', routes.Viewpost);


app.get('/Account/Create/:action', routes.act);
app.post('/Account/Create/:action', routes.act);
app.get('/Account/Create/New', routes.CreateAccount);
app.get('/Account/Create/View', routes.View);

app.get('/Account/Create/:firstname/:lastname', routes.createAction);

app.post('/Account/Create/View', routes.Viewpost);

app.get('/huda',routes.huda);
app.get('/shaker',routes.shaker);

app.get('/c2',routes.c2get);
app.post('/c2',routes.c2post);


app.listen(3000);
console.log("Express server listening on port %d in %s mode, my name is %s", app.address().port, app.settings.env, "Huda");





var Client = require('mysql').Client;
var client = new Client();

client.user = 'someuser';
client.password = 'password';

console.log('Connecting to MySQL...');

client.connect(function(error, results) {
  if(error) {
    console.log('Connection Error: ' + error.message);
    return;
  }
  console.log('Connected to MySQL');
  ClientConnectionReady(client);
});

ClientConnectionReady = function(client)
{
    client.query('USE vote', function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        ClientReady(client);
    });
};
