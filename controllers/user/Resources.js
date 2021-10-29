var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var resourceInfo = require('../../models/resources');

var addResource = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let resourceData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        resourceData.image = req.body.image;
    }
    if (
        req.body.audio != "" ||
        req.body.audio != null ||
        typeof req.body.audio != "undefined"
    ) {
        resourceData.audio = req.body.audio;
    }

    const NEW_RESOURCE = new resourceInfo(resourceData);

    return NEW_RESOURCE.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New resource info added successfully!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add resource info. Server error.",
                error: err.message
            });
        }
    });
}

var viewAllResources = async (req, res) => {
    var resources = await resourceInfo.find().exec();

    if (resources.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All resources successfully get.",
            data: resources
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Failed to get resources. Server error."
        });
    }
}

var viewResourceById = async (req, res) => {
    var id = req.params.id;

    var resource = await resourceInfo.findById({ _id: id }).exec();

    if (resource != "" || resource != null) {
        return res.status(200).json({
            status: true,
            message: "Resource successfully get.",
            data: resource
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

var editResorce = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return resourceInfo.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Resource info successfully edited.",
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

var deleteResource = async (req, res) => {
    var id = req.params.id;

    return resourceInfo.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Resource info deleted successfully.",
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
    addResource,
    viewAllResources,
    viewResourceById,
    editResorce,
    deleteResource
}