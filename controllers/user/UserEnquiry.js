var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

const USER_ENQUIRY = require('../../models/user_enquiry');

var addEnquiry = async (req, res) => {
    const V = new Validator(req.body, {
        name: "required",
        email: "required|email",
        message: "required"
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let enquiryData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    if (
        req.body.subject != "" || 
        req.body.subject != null || 
        typeof req.body.subject != "undefined"
    ) {
        enquiryData.subject = req.body.subject;
    }

    const NEW_ENQUIRY = new USER_ENQUIRY(enquiryData);

    return NEW_ENQUIRY.save((err,docs)=>{
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New enquiry successfully added!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add enquiry. Server error.",
                error: err
            });
        }
    });
}

module.exports = {
    addEnquiry
}