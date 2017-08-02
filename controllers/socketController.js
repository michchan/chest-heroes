/* Socket Controller - define socket APIs */

module.exports = function(io, app) {

    io.sockets.on('connection', (socket) => {
        console.log('@ io.socket.on connection');

        /* Hero Collection */
        socket.on('chestheroes_heroes:read', function(data, callback) {

            console.log('@ read hero collection');

            callback(null, app.heroes);

        });

    });

}