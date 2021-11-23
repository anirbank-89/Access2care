var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CLINIC_SLOTS = require('./slots');

const CLINIC_TIMING_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clinic_id: mongoose.Schema.Types.ObjectId,
    category_id: mongoose.Schema.Types.ObjectId,
    day_name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    slot_duration: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        default: 'en'
        // required: true
    }
});

CLINIC_TIMING_SCHEMA.methods.addSlots = function (data) {
    const NEW_CLINIC_SLOT = new CLINIC_SLOTS(data);
    return NEW_CLINIC_SLOT.save();
}

module.exports = mongoose.model("clinic_timings", CLINIC_TIMING_SCHEMA);