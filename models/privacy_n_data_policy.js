var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PRIVACY_SEGMENT = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    audio: String
});

module.exports = mongoose.model('privacy_segments', PRIVACY_SEGMENT);