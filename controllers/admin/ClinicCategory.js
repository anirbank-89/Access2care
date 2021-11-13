var mongoose = require("mongoose");
const { Validator } = require("node-input-validator");

const CLINIC_CATEGORY = require("../../models/clinic_category");

var addCategory = async (req, res) => {
    const V = new Validator(req.body, {
        name: "required"
    });
    let matched = await V.check().then();

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    }

    const NEW_CATEGORY = new CLINIC_CATEGORY(saveData);

    return NEW_CATEGORY.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "Data saved successfully",
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

var deleteCategory = async (req, res) => {
    var id = req.params.id;

    return CLINIC_CATEGORY.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data deleted successfully",
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
    addCategory,
    getAllCategories,
    deleteCategory
}