var mongoose = require('mongoose')
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const { Validator } = require('node-input-validator');

const ADMIN = require('../../models/admin');

function createToken(data) {
    return jwt.sign(data, 'DonateSmile');
}

const getTokenData = async (token) => {
    let adminData = await Admin.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return adminData;
}

var register = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required',   // |minLength:8
        fullname: 'required'
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({ status: false, error: v.errors });
    }
    let adminData = {
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        token: createToken(req.body)
    }
    if (typeof (req.body.phone) != 'undefined') {
        adminData.phone = Number(req.body.phone);
    }

    const NEW_ADMIN = new ADMIN(adminData);

    return NEW_ADMIN.save().then((data) => {
        res.status(200).json({
            status: true,
            success: true,
            message: 'New admin successfully registered!',
            data: data,
        });
    })
        .catch((error) => {
            res.status(200).json({
                status: false,
                success: false,
                message: 'Server error. Please try again.',
                error: error,
            });
        });
}

var login = async (req, res) => {
    const V = new Validator(req.body, {
        email: 'required', // |email
        password: 'required', // |minLength:8
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        res.status(400).json({ status: false, errors: V.errors });
    }

    ADMIN.findOne({ email: req.body.email })
        .then(admin => {
            if (admin != null && admin != '' && admin.length < 1) {
                return res.status(401).json({
                    status: false,
                    message: 'Server error. Please try again.',
                    error: 'Server Error',
                });
            }
            if (admin != null && admin != '' && admin.comparePassword(req.body.password)) {
                return res.status(200).json({
                    status: true,
                    message: 'Admin login successful',
                    data: admin
                });
            }
            else {
                return res.status(200).json({
                    status: false,
                    message: 'Invalid Email or Password !!. Please try again.',
                    error: 'Invalid Email or Password !!',
                });
            }
        }

        )
}

module.exports = {
    register,
    login
}