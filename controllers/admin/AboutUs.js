var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var aboutusSegment = require('../../models/about_us');

var addSegment = async (req, res) => {
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let segmentData = {
        _id: mongoose.Types.ObjectId(),
        heading: req.body.heading,
        description: req.body.description
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        segmentData.image = req.body.image;
    }
    if (
        req.body.audio != "" ||
        req.body.audio != null ||
        typeof req.body.audio != "undefined"
    ) {
        segmentData.audio = req.body.audio;
    }

    const NEW_SEGMENT = new aboutusSegment(segmentData);

    return NEW_SEGMENT.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New segment for About Us info created.",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add segment. Server error.",
                error: err.message
            });
        }
    });
}

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

var editSegment = async (req, res) => {
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return aboutusSegment.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for About Us info successfully edited.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id.",
                    error: err.message
                });
            }
        }
    );
}

var deleteSegment = async (req, res) => {
    var id = req.params.id;

    return aboutusSegment.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for About Us info deleted successfully.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id.",
                    error: err.message
                });
            }
        });
}

module.exports = {
    addSegment,
    viewAllSegments,
    viewSegmentById,
    editSegment,
    deleteSegment
}