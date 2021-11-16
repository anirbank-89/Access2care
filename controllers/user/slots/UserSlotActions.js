var mongoose = require("mongoose");

const SLOT = require("../../../models/slots/slots");

var viewSlotsPerClinic = async (req, res) => {
    var slots = await SLOT.find(
        {clinic_id: mongoose.Types.ObjectId(req.body.clinic_id)}
        ).exec()

    if (slots.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data get successfully!",
            data: slots
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No slots added.",
            data: null
        });
    }
}

var book

module.exports = {
    viewSlotsPerClinic
}