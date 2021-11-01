var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CONTACT_INFO_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: Array,
    address: String,
    image: String,
    audio: String
});

module.exports = mongoose.model("contact_infos", CONTACT_INFO_SCHEMA);