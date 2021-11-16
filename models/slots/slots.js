var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const SLOT_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clinic_id: mongoose.Schema.Types.ObjectId,
    cat_id: mongoose.Schema.Types.ObjectId,
    start_time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("slot", SLOT_SCHEMA);