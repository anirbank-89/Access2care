var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QUOTES_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quote_line1:{
        type: String,
        required: true,
        unique: true
    },
    quote_line2:{
        type: String,
        required: true,
        unique: true
    },
    quote_tagline:{
        type: String,
        default: 'AIDS'
    },
    author:{
        type: String,
        required: true
    },
    image: String,
    audio: String
});

module.exports = mongoose.model("quotes", QUOTES_SCHEMA);