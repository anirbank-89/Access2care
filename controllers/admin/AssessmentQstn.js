var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var ASSESSMENT_QSTN = require('../../models/assessment_qstn');

var createQstn = async (req, res) => {
    const V = new Validator(req.body, {
        question: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let question = {
        _id: mongoose.Types.ObjectId(),
        question: req.body.question
    }

    const NEW_QSTN = new ASSESSMENT_QSTN(question);

    return NEW_QSTN.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Question successfully saved!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to save question. Server error.",
                error: err
            });
        });
}

var getAllQstns = async (req, res) => {
    return ASSESSMENT_QSTN.find()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "All questions successfully get!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to get questions. Server error.",
                error: err
            });
        });
}

var getQstnById = async (req, res) => {
    var id = req.params.id

    return ASSESSMENT_QSTN.findOne({ _id: mongoose.Types.ObjectId(id) })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Question sucsessfully get.",
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

var deleteQstn = async (req,res)=>{
    var id = req.params.id;

    return ASSESSMENT_QSTN.findOneAndDelete(
        {_id: mongoose.Types.ObjectId(id)},
        (err,docs)=>{
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Question deleted successfully!",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id. Server error.",
                    error: err
                });
            }
        }
    );
}

module.exports = {
    createQstn,
    getAllQstns,
    getQstnById,
    deleteQstn
}