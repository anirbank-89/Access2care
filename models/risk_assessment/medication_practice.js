var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MEDICINE_PRACTICE_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    practice_en: {
        type: String
    },
    risk_level_en: String,
    recommendation_en: String,
    practice_dz: {
        type: String
    },
    risk_level_dz: String,
    recommendation_dz: String
});

module.exports = mongoose.model('medication_practice', MEDICINE_PRACTICE_SCHEMA);