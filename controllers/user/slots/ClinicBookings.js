var mongoose = require('mongoose');

const USER_BOOKED_SLOTS = require('../../../models/slots/user_booked_slots');

var viewAllBookings = async (req,res)=>{
    var bookings = await USER_BOOKED_SLOTS.find(
        {
            clinic_id: mongoose.Types.ObjectId(req.body.clinic_id)
        }
    ).exec();

    if (bookings.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data get successfully!",
            data: bookings
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No bookings received till date.",
            data: null
        });
    }
}

module.exports = {
    viewAllBookings
}