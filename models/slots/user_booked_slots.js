var mongoose = require("mongoose");
var moment = require("moment-timezone");
var Schema = mongoose.Schema;

const USER_BOOKED_SLOT = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clinic_id: mongoose.Schema.Types.ObjectId,
    clinic_cat_id: mongoose.Schema.Types.ObjectId,
    slot_id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    
    date_of_booking: {
        type: Date,
        default: moment.tz(new Date(), "Asia/Kolkata")
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("user_booked_slot", USER_BOOKED_SLOT);