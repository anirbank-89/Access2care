var mongoose = require("mongoose");

const SLOTS = require("../../../models/slots/slots");

var viewSlots = async (req, res) => {
    var slots = await SLOTS.find().exec()

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

var bookSlot = async (req,res)=>{}

module.exports = {
    viewSlots
}