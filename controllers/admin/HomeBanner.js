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

module.exports = {
    createBanner,
    getBannerById
}