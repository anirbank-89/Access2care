var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var privacySegment = require('../../models/privacy_n_data_policy');

var addSegment = async (req, res) => {
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required',
        headingd: 'required',
        descriptiond: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let segmentData = {
        _id: mongoose.Types.ObjectId(),
        heading: req.body.heading,
        description: req.body.description,
        headingd: req.body.headingd,
        descriptiond: req.body.descriptiond
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

    const NEW_SEGMENT = new privacySegment(segmentData);

    return NEW_SEGMENT.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New segment for privacy info created.",
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
    var segments = await privacySegment.find().exec();

    if (segments.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All segments successfully get.",
            data: segments
        });
    }
    else {
        return res.status(200).json({
            status: false,
            message: "No data available.",
            data: null
        });
    }
}

var viewSegmentById = async (req, res) => {
    var id = req.params.id;

    var segment = await privacySegment.findById({ _id: id }).exec();

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
        description: 'required',
        headingd: 'required',
        descriptiond: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return privacySegment.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for privacy info successfully edited.",
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

    return privacySegment.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for privacy info deleted successfully.",
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