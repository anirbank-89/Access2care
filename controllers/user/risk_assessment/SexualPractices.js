const SEXUAL_PRACTICES = require('../../../models/risk_assessment/sexual_practices');

var getAll = async (req,res)=>{
    var sexual_practices = await SEXUAL_PRACTICES.find().exec();

    if (sexual_practices.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: sexual_practices
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No sexual practice option has been added.",
            data: null
        });
    }
}

module.exports = {
    getAll
}