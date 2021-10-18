var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BANNER_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading: {
        type: String, 
        unique: true, 
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('home_banners', BANNER_SCHEMA);