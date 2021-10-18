var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

const HOME_BANNER = require('../../models/home_banners');

// Create home page banner
var create = async (req,res)=>{
    const V = new Validator(req.body, {
        heading: 'required',
        description: 'required'
    });
}

module.exports = {
    create
}