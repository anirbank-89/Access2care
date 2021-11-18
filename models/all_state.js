var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const STATE_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    state: {
        type: String,
        required: true
    },
    stated: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("states", STATE_SCHEMA);