var mongoose = require('mongoose');
var fs = require('fs');

const { Validator } = require('node-input-validator');

const CONTACT_INFO = require('../../models/contact_info');
var Upload = require('../../service/upload');
var cloudinaryConfig = require('../../service/cloudinary');

var addNEditInfo = async (req, res) => {
    const V = new Validator(req.body, {
        phone: 'required'
    });
    let matched = V.check().then(val => val)

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let contactInfoData = {
        _id: mongoose.Types.ObjectId(),
        phone: req.body.phone
    }
    if (
        req.body.address != "" ||
        req.body.address != null ||
        typeof req.body.address != "undefined"
    ) {
        contactInfoData.address = req.body.address;
    }
    if (
        req.body.info_id == "" ||
        req.body.info_id == null ||
        typeof req.body.info_id == "undefined"
    ) {
        const NEW_INFO = new CONTACT_INFO(contactInfoData);

        return NEW_INFO.save((err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Info added successfully!",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Failed to add info. Server error.",
                    error: err.message
                });
            }
        });
    }
    else {
        return CONTACT_INFO.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.info_id) },
            req.body,
            { new: true },
            (err, docs) => {
                if (!err) {
                    res.status(200).json({
                        status: true,
                        message: "Information successfully updated.",
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
}

var imageUpload = async (req, res) => {
    let imagUrl = "";
    let image_url = await Upload.uploadFile(req, "contact_info");
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

var audioUpload = async (req, res, next) => {
    let audio_url = await Upload.uploadAudioFile(req, "contact_info");

    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinaryConfig.v2.uploader.upload(
        path,
        {
            resource_type: "raw",
            public_id: `contact_info/${fName}`,
        },

        // Send cloudinary response or catch error
        (err, audio) => {
            if (err) return res.status(500).json({ status: false, error: err });

            fs.unlinkSync(path);
            res.status(200).json({
                status: true,
                server_url: audio_url,
                cloudinary_data: audio.secure_url
            });
        }
    );
}

var viewAllInfos = async (req, res) => {
    var contact_info = await CONTACT_INFO.find().exec();

    if (contact_info.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All contact information successfully get.",
            data: contact_info
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No contact information to show.",
            data: null
        });
    }
}

var viewInfoById = async (req, res) => {
    var id = req.params.id;

    return CONTACT_INFO.findById(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Contact information successfully get.",
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

var deleteContactInfo = async (req, res) => {
    var id = req.params.id;

    return CONTACT_INFO.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Contact information successfully deleted.",
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

module.exports = {
    addNEditInfo,
    imageUpload,
    audioUpload,
    viewAllInfos,
    viewInfoById,
    deleteContactInfo
}