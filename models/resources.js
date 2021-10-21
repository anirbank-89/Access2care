var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RESOURCES_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    image: String,
    audio: String
});

module.exports = mongoose.model("resources", RESOURCES_SCHEMA);