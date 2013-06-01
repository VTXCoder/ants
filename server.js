// VTX Helpers
var common = require('./vtx/common');
var control = require('./vtx/control');
var error = require('./vtx/error');

// Settings
var settings = common.getSettings();
//console.log(settings);

// Connect to database
var mongoose = require('mongoose')
mongoose.connect(common.getMongooseConnectionString(settings))
console.log("---------------------------------------------");

// Initialise the models
common.initModels();
console.log("---------------------------------------------");

// Initialise the controllers
common.initControllers();

// Create the web server
var app=require('./vtx/app').app();
server=app.listen(settings.port);
console.log("---------------------------------------------");
console.log(settings.siteName+" - Port: %d - %s", server.address().port, app.settings.env);
console.log("---------------------------------------------");

// Routes
require('./routes').init(app);

// Error Handling
error.addErrorRouting(app);