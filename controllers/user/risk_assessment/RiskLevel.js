var mongoose = require('mongoose');

const RISK_LEVEL = require('../../../models/risk_assessment/risk_level');
const SEXUAL_PRACTICE = require('../../../models/risk_assessment/sexual_practices');
const user = require('../../../service/middleware');

var addRiskLevel = async (req,res)=>{
    // var objects = [];
    // req.body.risk_behaviours.forEach(element => {
    //     // console.log(mongoose.Types.ObjectId(element));
    //     objects.push(mongoose.Types.ObjectId(element));
    // });
    // console.log(objects);
    let saveData = {
        _id: mongoose.Types.ObjectId(),
        unique_id: `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
        risk_factor: req.body.risk_factor,
        risk_behaviours: req.body.risk_behaviours
    }
    const NEW_RISK_LEVEL = new RISK_LEVEL(saveData);

    return NEW_RISK_LEVEL.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data successfully saved!",
                data: data
            });
        })
        .catch(err => { 
            res.status(500).json({
                status: false,
                message: "Failed to data. Server error.",
                error: err.message
            });
        });
}

var getRiskLevel = async (req,res)=>{
    var user_risk = await RISK_LEVEL.findOne({unique_id: req.params.unique_id}).exec();
    // console.log("User risk", user_risk);
    var risk_behaviours = user_risk.risk_behaviours;
    // console.log("Risky behaviour", risk_behaviours);
    var high_risk = risk_behaviours.filter(item => item.risk_level_en == "High");
    var medium_risk = risk_behaviours.filter(item => item.risk_level_en == "Medium");
    var low_risk = risk_behaviours.filter(item => item.risk_level_en == "Low");
    // console.log("Low risk", low_risk.length);
    
    if (high_risk.length == 0 && medium_risk.length == 0 && low_risk.length > 0) {  //
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            risk_level: low_risk[0].risk_level_en,
            recommendation: low_risk[0].recommendation_en
        });
    }
    else if (high_risk.length == 0 && medium_risk.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            risk_level: medium_risk[0].risk_level_en,
            recommendation: medium_risk[0].recommendation_en
        });
    }
    else if (high_risk.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            risk_level: high_risk[0].risk_level_en,
            recommendation: high_risk[0].recommendation_en
        }); 
    }
    // else {
    //     return res.status(200).json({
    //         status: true,
    //         data: "No high risk"
    //     });
    // }
    // var risk_levels = [];

    // risk_behaviours.forEach((element) => {
    //     SEXUAL_PRACTICE.findOne({_id: element})
    //     .then(data=>{
    //         console.log(data);
    //         risk_levels.push(data);
    //     })
    //     .catch(err=>{
    //         console.log(err.message);
    //     })
    // });
    // console.log("risk levels", risk_levels);
}

function appendToArray(array,data) {
    array.push(data);
}

module.exports = {
    addRiskLevel,
    getRiskLevel
}