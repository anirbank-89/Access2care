var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var hivInfoSegment = require('../../models/hiv_information');

var addSegment = async (req,res)=>{
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
    let matched = V.check().then(val=>val);

    if (!matched) {
        return res.status(400).json({status: false, errors: V.errors});
    }

    let segmentData = {
        _id: mongoose.Types.ObjectId(),
        heading: req.body.heading,
        description: req.body.description
    }
    if (
        req.body.audio!="" || 
        req.body.audio!=null || 
        typeof req.body.audio!="undefined"
    ) {
        segmentData.audio = req.body.audio;
    }

    const NEW_SEGMENT = new hivInfoSegment(segmentData);

    return NEW_SEGMENT.save((err,docs)=>{
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New segment for HIV info created.",
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

module.exports = {
    addSegment
}