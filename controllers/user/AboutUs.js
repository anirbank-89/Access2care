var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var aboutusSegment = require('../../models/about_us');

var viewAllSegments = async (req, res) => {
    var segments = await aboutusSegment.find().exec();

    if (segments.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All segments successfully get.",
            data: segments
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Failed to get segments. Server error."
        });
    }
}

var viewSegmentById = async (req, res) => {
    var id = req.params.id;

    var segment = await aboutusSegment.findById({ _id: id }).exec();

    if (segment != "" || segment != null) {
        return res.status(200).json({
            status: true,
            message: "Segment successfully get.",
            data: segment
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Invalid id.",
            error: err.message
        });
    }
}

module.exports = {
    viewAllSegments,
    viewSegmentById
}