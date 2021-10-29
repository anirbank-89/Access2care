var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const HIV_INFORMATION_SEGMENT = new Schema({
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

module.exports = mongoose.model('hiv_information_segments', HIV_INFORMATION_SEGMENT);