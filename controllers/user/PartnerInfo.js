var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var partnerInfo = require('../../models/partner');

var addPartner = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let partnerData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        partnerData.image = req.body.image;
    }
    if (
        req.body.audio != "" ||
        req.body.audio != null ||
        typeof req.body.audio != "undefined"
    ) {
        partnerData.audio = req.body.audio;
    }

    const NEW_PARTNER = new partnerInfo(partnerData);

    return NEW_PARTNER.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New partner info added successfully!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add partner info. Server error.",
                error: err.message
            });
        }
    });
}

var viewAllPartners = async (req, res) => {
    var partners = await partnerInfo.find().exec();

    if (partners.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All partners successfully get.",
            data: partners
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Failed to get segments. Server error."
        });
    }
}

var viewPartnerById = async (req, res) => {
    var id = req.params.id;

    var partner = await partnerInfo.findById({ _id: id }).exec();

    if (partner != "" || partner != null) {
        return res.status(200).json({
            status: true,
            message: "Partner successfully get.",
            data: partner
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

var editPartner = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return partnerInfo.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Partner info successfully edited.",
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

var deletePartner = async (req, res) => {
    var id = req.params.id;

    return partnerInfo.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Partner info deleted successfully.",
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
    addPartner,
    viewAllPartners,
    viewPartnerById,
    editPartner,
    deletePartner
}