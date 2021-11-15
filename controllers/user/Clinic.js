var mongoose = require("mongoose");

const CLINIC = require("../../models/clinic");

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

module.exports = {
    getAllClinics,
    getClinicById
}