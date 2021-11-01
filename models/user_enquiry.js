var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ENQUIRY_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: String,
    message: {
        type: String,
        required: true
    },
    resolution_status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("user_enquiries", ENQUIRY_SCHEMA);