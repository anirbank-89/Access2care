const CONTACT_INFO = require('../../models/contact_info');

var viewAllInfos = async (req, res) => {
    var contact_info = await CONTACT_INFO.find().exec();

    if (contact_info.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All contact information successfully get.",
            data: contact_info
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No contact information to show.",
            data: null
        });
    }
}

var viewInfoById = async (req, res) => {
    var id = req.params.id;

    return CONTACT_INFO.findById(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Contact information successfully get.",
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
    viewAllInfos,
    viewInfoById
}