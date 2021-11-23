var mongoose = require("mongoose");
const { Validator } = require("node-input-validator");

const CLINIC_TIMINGS = require('../../../models/slots/clinic_timings');

var createSlots = async (req, res) => {
    CLINIC_TIMINGS.findOne(
        {
            clinic_id: mongoose.Types.ObjectId(req.body.clinic_id),
            day_name: req.body.day_name
        }
    ).then(data => {
        if (data == null || data == '') {
            const V = new Validator(req.body, {
                day_name: 'required',
                from: 'required',
                to: 'required',
                slot_duration: 'required'
                // language: 'required'
            });
            let matched = V.check().then(val => val);

            if (!matched) {
                return res.status(400).json({ status: false, errors: V.errors });
            }

            let saveData1 = {
                _id: mongoose.Types.ObjectId(),
                clinic_id: mongoose.Types.ObjectId(req.body.clinic_id),
                category_id: mongoose.Types.ObjectId(req.body.category_id),
                day_name: req.body.day_name,
                from: req.body.from,
                to: req.body.to,
                slot_duration: Number(req.body.slot_duration)
                // language: req.body.language
            }

            const NEW_CLINIC_TIMING = new CLINIC_TIMINGS(saveData1);

            return NEW_CLINIC_TIMING.save()
                .then(docs => {
                    console.log("Clining opening hours data: ", docs);

                    var ranges = []           // start times array

                    var starttime = convertTime12to24(docs.from);          // see below for utility functions
                    var endtime = convertTime12to24(docs.to);              // see below for utility functions
                    var interval = docs.slot_duration;
                    var language = docs.language;

                    // console.log("Start time", starttime)
                    // console.log("End time", endtime)

                    var st_InMin4m12AM = convertH2M(starttime);         // see below for utility functions
                    var et_InMin4m12AM = convertH2M(endtime);           // see below for utility functions

                    console.log("Start time", st_InMin4m12AM);
                    console.log("End time", et_InMin4m12AM);

                    var timeRanges = getTimeRanges(ranges, st_InMin4m12AM, et_InMin4m12AM, interval, language);// see below for utility functions

                    console.log(timeRanges);

                    ranges.forEach(element => {
                        let saveData2 = {
                            _id: mongoose.Types.ObjectId(),
                            clinic_id: docs.clinic_id,
                            category_id: docs.category_id,
                            weekday_name: docs.day_name,
                            slot_time: element
                        }
                        docs.addSlots(saveData2);
                    });

                    res.status(200).json({
                        status: true,
                        message: "Slots created successfully for the day.",
                        data: docs
                    });
                })
                .catch(fault => {
                    res.status(500).json({
                        status: false,
                        message: "Failed to add slot. Server error.",
                        error: fault.message
                    });
                });
        }
        else {
            return res.status(500).json({
                status: false,
                error: "Slots for this day already exists. Please delete current day slots to add new.",
                data: null
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            message: "Failed to get data. Server error.",
            error: err.message
        });
    });
}

/**=============Utility functions section start==================**/
// Convert timestamp to 24-hour format
const convertTime12to24 = function (time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

// Convert 24-hour format timestamp to total minutes from 00:00:00
const convertH2M = function (timeInHour) {
    var timeParts = timeInHour.split(":");
    // console.log(timeParts);
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

// Push date-time data in an empty array
const getTimeRanges = function (arr, start_time, end_time, interval, language = window.navigator.language) {
    const date = new Date();
    const format = {
        hour: 'numeric',
        minute: 'numeric',
    };

    for (let minutes = start_time; minutes <= end_time; minutes = minutes + interval) {
        date.setHours(0);
        date.setMinutes(minutes);
        arr.push(date.toLocaleTimeString(language, format));
    }

    return arr;
}
/**===========Utility functions section start end================**/
module.exports = {
    createSlots
}