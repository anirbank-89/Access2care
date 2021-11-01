const USER_ENQUIRY = require('../../models/user_enquiry');

var getAllEnquiries = async (req,res)=>{
    var user_enquiries = await USER_ENQUIRY.find().exec();

    if (user_enquiries.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All enquiries successfully get.",
            data: user_enquiries
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No user enqueries to show.",
            data: null
        });
    }
}

var getEnquiryById = async (req,res)=>{
    var id = req.params.id;

    return USER_ENQUIRY.findById(
        {_id: id},
        (err,docs)=>{
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Enquiry successfully get!",
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
    getAllEnquiries,
    getEnquiryById
}