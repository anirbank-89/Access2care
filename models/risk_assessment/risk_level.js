var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RISK_LEVEL_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: Number,
    risk_factor: String,
    risk_behaviours: Array
});

module.exports = mongoose.model("risk_level", RISK_LEVEL_SCHEMA);