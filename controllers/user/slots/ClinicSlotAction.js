var mongoose = require("mongoose");
const { Validator } = require("node-input-validator");

const SLOT = require("../../../models/slots/slots");

var addSlot = async (req, res) => {
    const V = new Validator(req.body, {
        start_time: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let slotData = {
        _id: mongoose.Types.ObjectId(),
        clinic_id: mongoose.Types.ObjectId(req.body.clinic_id),
        cat_id: mongoose.Types.ObjectId(req.body.cat_id),
        start_time: req.body.start_time
    }

    const NEW_SLOT = new SLOT(slotData);

    return NEW_SLOT.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "Data saved successfully!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to save data. Server error.",
                error: err
            });
        }
    });
}

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

var deleteSlot = async (req, res) => {
    var id = req.params.id;

    return SLOT.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data deleted successfully.",
                data
            });
        })
        .catch(error => {
            res.status(500).json({
                status: false,
                message: "Invalid id.",
                error
            });
        });
}

module.exports = {
    addSlot,
    viewSlotsPerClinic,
    deleteSlot
}