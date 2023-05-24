const mongoose = require('mongoose');

const Weather = require('../models/weather');

module.exports = {};

module.exports.getLocation = async(name) => {
    return Weather.findOne({ name: name }).lean();
}
