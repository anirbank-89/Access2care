var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var SEXUAL_PRACTICES = require('../../../models/risk_assessment/sexual_practices');

var addPractice = async (req, res) => {
    const V = new Validator(req.body, {
        practice_en: 'required',
        risk_level_en: 'required',
        recommendation_en: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let practiceData = {
        _id: mongoose.Types.ObjectId(),
        practice_en: req.body.practice_en,
        risk_level_en: req.body.risk_level_en,
        recommendation_en: req.body.recommendation_en
    }
    if (req.body.practice_dz != "" || req.body.practice_dz != null || typeof req.body.practice_dz != "undefined") {
        practiceData.practice_dz = req.body.practice_dz;
    }
    if (req.body.risk_level_dz != "" || req.body.risk_level_dz != null || typeof req.body.risk_level_dz != "undefined") {
        practiceData.risk_level_dz = req.body.risk_level_dz;
    }
    if (req.body.recommendation_dz != "" || req.body.recommendation_dz != null || typeof req.body.recommendation_dz != "undefined") {
        practiceData.recommendation_dz = req.body.recommendation_dz;
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