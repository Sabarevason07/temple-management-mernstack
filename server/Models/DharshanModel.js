const mongoose = require('mongoose');

const dharshanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    poojaTime: {
        type: String,
        required: true,
    },
});

const Dharshan = mongoose.model('Dharshan', dharshanSchema);

module.exports = Dharshan;
