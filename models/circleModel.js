var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var circleSchema = new Schema({
    pos_x: Number,
    pos_y: Number,
    vx: Number,
    vy: Number,
    radius: Number,
    color: String,
    id: String
})

var Circles = mongoose.model('Circles', circleSchema);

module.exports = Circles;