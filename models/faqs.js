var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FAQ_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question:{
        type: String,
        required: true,
        unique: true
    },
    answer:{
        type: String,
        required: true
    },
    image: String,
    audio: String
});

module.exports = mongoose.model("faqs", FAQ_SCHEMA);