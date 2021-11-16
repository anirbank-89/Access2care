var mongoose = require("mongoose");
const { Validator } = require("node-input-validator");
var fs = require("fs");

const CLINIC = require("../../models/clinic");
var Upload = require("../../service/upload");
var cloudinaryConfig = require("../../service/cloudinary");

var getTokenData = async (token) => {
    let clinicData = await CLINIC.findOne({ token: token }).exec();
    // console.log('Clinic data', clinicData);
    return clinicData;
}

var getAllClinics = async (req, res) => {
    return CLINIC.aggregate([
        {
            $lookup: {
                from: "clinic_categories",
                localField: "cat_id",
                foreignField: "_id",
                as: "category_data"
            }
        },
        {
            $unwind: "$category_data"
        },
        {
            $project: {
                __v: 0
            }
        }
    ])
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data get successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to get data. Server error.",
                error: err.message
            });
        });
}

var getClinicById = async (req, res) => {
    var id = req.params.id;

    return CLINIC.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "clinic_categories",
                localField: "cat_id",
                foreignField: "_id",
                as: "category_data"
            }
        },
        {
            $unwind: "$category_data"
        },
        {
            $project: {
                __v: 0
            }
        }
    ])
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data get successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id.",
                error: err.message
            });
        });
}

var imageUpload = async (req, res) => {
    var imagUrl = "";
    var image_url = await Upload.uploadFile(req, "clinics");
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
    let audio_url = await Upload.uploadAudioFile(req, "clinics");

    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinaryConfig.v2.uploader.upload(
        path,
        {
            resource_type: "raw",
            public_id: `clinics/${fName}`,
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

var editClinic = async (req, res) => {
    const V = new Validator(req.body, {
        clinic_name: 'required',
        address: 'required',
        mobile: 'required',
        email: 'required|email',
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let clinicData = {
        cat_id: mongoose.Types.ObjectId(req.body.cat_id),
        clinic_name: req.body.clinic_name,
        address: req.body.address,
        mobile: Number(req.body.mobile),
        email: req.body.email
    }
    if (req.body.contact_name != "" || req.body.contact_name != null || typeof req.body.contact_name != "undefined") {
        clinicData.contact_name = req.body.contact_name;
    }
    if (req.body.telephone != "" || req.body.telephone != null || typeof req.body.telephone != "undefined") {
        clinicData.telephone = req.body.telephone;
    }
    if (req.body.image != "" || req.body.image != null || typeof req.body.image != "undefined") {
        clinicData.image = req.body.image;
    }
    if (req.body.audio != "" || req.body.audio != null || typeof req.body.audio != "undefined") {
        clinicData.audio = req.body.audio;
    }

    var id = req.params.id;

    return CLINIC.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) }, 
        clinicData, 
        { new: true }
        )
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data edited successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id.",
                error: err.message
            });
        });
}

module.exports = {
    getTokenData,
    getAllClinics,
    getClinicById,
    imageUpload,
    audioUpload,
    editClinic
}