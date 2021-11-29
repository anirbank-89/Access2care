var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var SEXUAL_PRACTICES = require('../../../models/risk_assessment/sexual_practices');

var addPractice = async (req, res) => {
    const V = new Validator(req.body, {
        practice_en: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let practiceData = {
        _id: mongoose.Types.ObjectId(),
        practice_en: req.body.practice_en
    }
    if (req.body.practice_dz != "" || req.body.practice_dz != null || typeof req.body.practice_dz != "undefined") {
        practiceData.practice_dz = req.body.practice_dz;
    }

    const NEW_PRACTICE = new SEXUAL_PRACTICES(practiceData);

    return NEW_PRACTICE.save()
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

module.exports = {
    addPractice
}