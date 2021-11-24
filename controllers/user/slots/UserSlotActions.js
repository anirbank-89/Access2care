var mongoose = require("mongoose");
const { Validator } = require("node-input-validator");

const USER_BOOKED_SLOTS = require("../../../models/slots/user_booked_slots");

var bookSlot = async (req, res) => {
    const V = new Validator({
        name: 'required',
        phone: 'required',
        rating: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        booking_id: `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
        clinic_id: mongoose.Types.ObjectId(req.body.clinic_id),
        clinic_cat_id: mongoose.Types.ObjectId(req.body.clinic_cat_id),
        slot_id: mongoose.Types.ObjectId(req.body.slot_id),
        date_of_booking: req.body.date_of_booking,
        dayname_of_booking: req.body.dayname_of_booking,
        name: req.body.name,
        phone: Number(req.body.phone),
        rating: Number(req.body.rating)
    }
    if (req.body.age != '' || req.body.age != null || typeof req.body.age != "undefined") {
        saveData.age = Number(req.body.age);
    }
    if (req.body.comment != '' || req.body.comment != null || typeof req.body.comment != "undefined") {
        saveData.comment = req.body.comment;
    }

    const NEW_BOOKING = new USER_BOOKED_SLOTS(saveData);

    return NEW_BOOKING.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data saved successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to add data. Server error.",
                error: err
            });
        });
}

module.exports = {
    bookSlot
}