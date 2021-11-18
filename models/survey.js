var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const STATE_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: {
        type: Number,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("qstn_survey", STATE_SCHEMA);