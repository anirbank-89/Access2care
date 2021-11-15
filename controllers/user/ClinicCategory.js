var mongoose = require("mongoose");

const CLINIC_CATEGORY = require("../../models/clinic_category");

var getAllCategories = async (req, res) => {
    var categories = await CLINIC_CATEGORY.find().exec();

    if (categories.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: categories
        });
    }
    else {
        return res.status(500).json({
            status: true,
            message: "No categories exist.",
            data: null
        });
    }
}

var getCategoryById = async (req, res) => {
    var id = req.params.id;

    return CLINIC_CATEGORY.findOne({ _id: mongoose.Types.ObjectId(id) })
        .then(docs => {
            res.status(200).json({
                status: true,
                message: "Data get successfully",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id.",
                error: err
            });
        });
}

module.exports = {
    getAllCategories,
    getCategoryById
}