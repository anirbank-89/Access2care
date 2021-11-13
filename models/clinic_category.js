var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CATEGORY_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("clinic_category", CATEGORY_SCHEMA);