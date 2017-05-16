var mongoose = require('mongoose');

var detailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    }
});

var details = mongoose.model('details', detailsSchema);

module.exports = details;
