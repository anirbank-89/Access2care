var mongoose = require("mongoose");
// var moment = require("moment-timezone");
var Schema = mongoose.Schema;

const USER_BOOKED_SLOT = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    booking_id: Number,
    clinic_id: mongoose.Schema.Types.ObjectId,
    clinic_cat_id: mongoose.Schema.Types.ObjectId,
    slot_id: mongoose.Schema.Types.ObjectId,
    date_of_booking: Date,
    dayname_of_booking: String,
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: Number,
    rating: {
        type: Number,
        required: true
    },
    comment: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("user_booked_slot", USER_BOOKED_SLOT);