const { Validator } = require("node-input-validator");

const CLINIC = require("../../models/clinic");

var login = async (req, res) => {
    const V = new Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:8'
    })
    let matched = await V.check().then((val) => val)
    if (!matched) {
        return res.status(401).json({
            status: false,
            errors: V.errors
        });
    }

    CLINIC.findOne({ email: req.body.email })
        .then(data => {
            if (data == null || data == '') {
                res.status(400).json({
                    status: false,
                    message: "Wrong email id.",
                    error: "Wrong email id."
                })
            }
            else if (data != null && data != '' && data.comparePassword(req.body.password)) {
                return res.status(200).json({
                    status: true,
                    message: 'Successfully logged in',
                    data: data
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Wrong password.",
                    error: "Wrong password."
                })
            }
        })
}

module.exports = {
    login
}