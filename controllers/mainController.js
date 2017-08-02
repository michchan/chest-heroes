var initController = require('./initController');
var socketController = require('./socketController');

var app = {};

module.exports = function(io) {

    /* init game data */
    initController(app);

    /* define socket APIs */
    socketController(io, app);

}