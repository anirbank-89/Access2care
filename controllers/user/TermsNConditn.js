const TERMS_N_CONDITN = require('../../models/terms_n_condition');

var viewAllTerms = async (req, res) => {
    var terms = await TERMS_N_CONDITN.find().exec();

    if (terms.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All terms and conditions successfully get.",
            data: terms
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No terms and condition to show.",
            data: null
        });
    }
}

var viewTermsById = async (req, res) => {
    var id = req.params.id;

    return TERMS_N_CONDITN.findById(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Terms and conditions successfully get.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id.",
                    error: err
                });
            }
        }
    );
}

module.exports = {
    viewAllTerms,
    viewTermsById
}