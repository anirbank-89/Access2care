var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

const HOME_BANNER = require('../../models/home_banners');

// Create home page banner
var createBanner = async (req, res) => {
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let bannerData = {
        _id: mongoose.Types.ObjectId(),
        heading: req.body.heading,
        description: req.body.description
    }
    if (
        req.body.audio!="" && 
        req.body.audio!=null && 
        typeof req.body.audio!="undefined"
        ) {
        bannerData.audio = req.body.audio;
    }
    if (
        req.body.image=="" && 
        req.body.image==null && 
        typeof req.body.image=="undefined"
        ) {
        bannerData.image = null;
    } else {
        bannerData.image = JSON.parse(req.body.audio);
    }

    const NEW_BANNER = new HOME_BANNER(bannerData);

    return NEW_BANNER.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "New banner saved successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to save banner data. Server error.",
                error: err
            });
        });
}

var getBanner = async (req,res)=>{
    var banner_info = await HOME_BANNER.find().exec();

    if (banner_info.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All banners successfully get!",
            data: banner_info
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No banner information found.",
            data: null 
        });
    }
}

var getBannerById = async (req, res) => {
    var id = req.params.id;

    return HOME_BANNER.findOne({ _id: mongoose.Types.ObjectId(id) })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Banner get successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err
            });
        });
}

var editBanner = async (req, res) => {
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return HOME_BANNER.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Banner info successfully edited.",
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

var deleteBanner = async (req, res) => {
    var id = req.params.id;

    return HOME_BANNER.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Banner info deleted successfully.",
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
    createBanner,
    getBanner,
    getBannerById,
    editBanner,
    deleteBanner
}