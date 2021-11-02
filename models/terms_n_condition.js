var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TERMS_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content_1: {
        type: String,
        required: true
    },
    content_2: String,
    audio: String,
    image: String
});

module.exports = mongoose.model("terms_and_conditions", TERMS_SCHEMA);