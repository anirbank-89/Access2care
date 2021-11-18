var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
var fs = require('fs');

const TERMS_N_CONDITN = require('../../models/terms_n_condition');
var Upload = require('../../service/upload');
var cloudinaryConfig = require('../../service/cloudinary');

var addTerms = async (req, res) => {
    const V = new Validator(req.body, {
        content_1: "required",
        content_1d: "required",
        content_2: "required",
        content_2d: "required"
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({
            status: false,
            errors: V.errors
        });
    }

    let termsData = {
        _id: mongoose.Types.ObjectId(),
        content_1: req.body.content_1,
        content_1d: req.body.content_1d,
        content_2: req.body.content_2,
        content_2d: req.body.content_2d
    }
    // if (
    //     req.body.content_2 != "" ||
    //     req.body.content_2 != null ||
    //     typeof req.body.content_2 != "undefined"
    // ) {
    //     termsData.content_2 = req.body.content_2;
    // }
    if (
        req.body.audio != "" ||
        req.body.audio != null ||
        typeof req.body.audio != "undefined"
    ) {
        termsData.audio = req.body.audio;
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        termsData.image = req.body.image;
    }

    const NEW_TERMS = new TERMS_N_CONDITN(termsData);

    return NEW_TERMS.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New terms and condition added successfully!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add data. Server error.",
                error: err
            });
        }
    });
}

var audioUpload = async (req, res, next) => {
    let audio_url = await Upload.uploadAudioFile(req, "terms_and_condition");

    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinaryConfig.v2.uploader.upload(
        path,
        {
            resource_type: "raw",
            public_id: `terms_and_condition/${fName}`,
        },

        // Send cloudinary response or catch error
        (err, audio) => {
            if (err) return res.status(500).json({ status: false, error: err });

            fs.unlinkSync(path);
            res.status(200).json({
                status: true,
                server_url: audio_url,
                cloudinary_url: audio.secure_url
            });
        }
    );
}

var imageUpload = async (req, res) => {
    let imagUrl = "";
    let image_url = await Upload.uploadFile(req, "terms_and_condition");
    if (
        req.file != "" ||
        req.file != null ||
        typeof req.file != "undefined"
    ) {
        imagUrl = image_url
    }

    return res.status(200).send({
        status: true,
        data: imagUrl,
        error: null
    });
}

var viewAllTerms = async (req, res) => {
    var terms = await TERMS_N_CONDITN.find().exec();

    if (terms.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All terms and conditions successfully get.",
            data: terms
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No terms and condition to show.",
            data: null
        });
    }
}

var viewTermsById = async (req, res) => {
    var id = req.params.id;

    return TERMS_N_CONDITN.findById(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Terms and conditions successfully get.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id.",
                    error: err
                });
            }
        }
    );
}

var editTerms = async (req, res) => {
    const V = new Validator(req.body, {
        content_1: "required",
        content_1d: "required",
        content_2: "required",
        content_2d: "required"
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return TERMS_N_CONDITN.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for terms and conditions successfully edited.",
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

var deleteTerms = async (req, res) => {
    var id = req.params.id;

    return TERMS_N_CONDITN.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Segment for terms and conditions deleted successfully.",
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
    addTerms,
    audioUpload,
    imageUpload,
    viewAllTerms,
    viewTermsById,
    editTerms,
    deleteTerms
}