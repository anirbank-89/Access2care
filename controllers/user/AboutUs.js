var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');
const FETCH_STATE = require('../../models/all_state');
const QSTN_SURVEY = require('../../models/survey');
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

var addstate = async (req, res) => {
    

    let segmentData = {
        _id: mongoose.Types.ObjectId(),
        state: req.body.state,
        stated: req.body.stated
       
    }
   
    const NEW_SEGMENT = new FETCH_STATE(segmentData);

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



const viewAllstate = async (req, res) => {
    var states = await FETCH_STATE.find().exec();
    // console.log(states)
    if (states.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All states and conditions successfully get.",
            data: states
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No states and condition to show.",
            data: null
        });
    }
}


var addsurvey = async (req, res) => {
    
    let unique_id = `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;
    let surveyData = {
        _id: mongoose.Types.ObjectId(),
        unique_id: unique_id,
        data: req.body.data
       
    }
    
   
    const NEW_SEGMENT = new QSTN_SURVEY(surveyData);

    return NEW_SEGMENT.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "Data Added Successfully.",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add data.",
                error: err.message
            });
        }
    });
}

module.exports = {
    viewAllSegments,
    viewSegmentById,
    viewAllstate,
    addstate,
    addsurvey
}