var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connect = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'nodelogin'
});

var app = express();

app.use(session({
	secret: 'formlogin',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/subscribe.html'));
});

app.post('/sub', function(request, response) {
	var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;
  var insertDb = "INSERT INTO `accounts` (username, password, email) VALUES ('" +
  username + "', '" + password + "', '" + email + "')";
	if (username && password && email ) {

		connect.query(insertDb, (err, fields) => {
      if (err) {
          return response.status(500).send(err);
      } else {
          response.redirect('/');
          response.send('Account added');
          response.end();
    }
  });

	} else {
		response.send('please subscribe for more informations');
		response.end();
	}
});

app.listen(3000);