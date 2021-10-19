var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QSTN_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('assessment_questions', QSTN_SCHEMA);