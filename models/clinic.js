var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CLINIC_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cat_id: mongoose.Schema.Types.ObjectId,
    clinic_name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    contact_name: String,
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    telephone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    audio: String
});

module.exports = mongoose.model("clinic", CLINIC_SCHEMA);