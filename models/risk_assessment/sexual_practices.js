var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PRACTICE_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    practice_en: {
        type: String,
        unique: true
    },
    practice_dz: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('sexual_practice', PRACTICE_SCHEMA);