var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var quotesInfo = require('../../models/quotes');

var addQuote = async (req, res) => {
    const V = new Validator(req.body, {
        quote_line1: 'required',
        quote_line2: 'required',
        quote_line3: 'required',
        author: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let quoteData = {
        _id: mongoose.Types.ObjectId(),
        quote_line1: req.body.quote_line1,
        quote_line2: req.body.quote_line2,
        quote_line3: req.body.quote_line3,
        author: req.body.author
    }
    if (
        req.body.image != "" ||
        req.body.image != null ||
        typeof req.body.image != "undefined"
    ) {
        quoteData.image = req.body.image;
    }
    if (
        req.body.audio != "" ||
        req.body.audio != null ||
        typeof req.body.audio != "undefined"
    ) {
        quoteData.audio = req.body.audio;
    }

    const NEW_QUOTE = new quotesInfo(quoteData);

    return NEW_QUOTE.save((err, docs) => {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "New quote info added successfully!",
                data: docs
            });
        }
        else {
            res.status(500).json({
                status: false,
                message: "Failed to add quote info. Server error.",
                error: err.message
            });
        }
    });
}

var viewAllQuotes = async (req, res) => {
    var quotes = await quotesInfo.find().exec();

    if (quotes.length > 0) {
        return res.status(200).json({
            status: true,
            message: "All quotes successfully get.",
            data: quotes
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No quotes to show.",
            data: null
        });
    }
}

var viewQuoteById = async (req, res) => {
    var id = req.params.id;

    var quote = await quotesInfo.findById({ _id: id }).exec();

    if (quote != "" || quote != null) {
        return res.status(200).json({
            status: true,
            message: "Quote successfully get.",
            data: quote
        });
    }
    else {
        return res.status(500).json({
            status: false,
            message: "Invalid id. Server error.",
            error: err.message
        });
    }
}

var editQuote = async (req, res) => {
    const V = new Validator(req.body, {
        quote: 'required',
        author: 'required'
    });
    let matched = V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return quotesInfo.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Quote info successfully edited.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id. Server error.",
                    error: err.message
                });
            }
        }
    );
}

var deleteQuote = async (req, res) => {
    var id = req.params.id;

    return quotesInfo.findByIdAndDelete(
        { _id: id },
        (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    message: "Quote info deleted successfully.",
                    data: docs
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid id. Server error",
                    error: err.message
                });
            }
        });
}

module.exports = {
    addQuote,
    viewAllQuotes,
    viewQuoteById,
    editQuote,
    deleteQuote
}