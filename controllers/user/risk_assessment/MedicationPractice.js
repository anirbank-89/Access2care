const MEDICATION_PRACTICES = require('../../../models/risk_assessment/medication_practice');

var getAll = async (req,res)=>{
    var medication_practices = await MEDICATION_PRACTICES.find().exec();

    if (medication_practices.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: medication_practices
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No medication usage option has been added.",
            data: null
        });
    }
}

module.exports = {
    getAll
}