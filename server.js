var config = require('./config')
var express = require('express'),
app = express(),
port = process.env.PORT || 80;

mongoose = require('mongoose'),
bodyParser = require('body-parser');
Project = require('./api/models/projectListModel'),

mongoose.Promise = global.Promise;
mongoose.connect(config.db);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/projectListRoute');
routes(app);


app.listen(config.port);


console.log('Project List API server started on: ' + port);

module.exports = app;