const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({

    player1: {
        type: String,
        required: true
    },

    player2: {
        type: String,
        required: true
    },

    tossWinner: String,

    firstBatter: String,

    secondBatter: String,

    firstInningsScore: {
        type: Number,
        default: 0
    },

    secondInningsScore: {
        type: Number,
        default: 0
    },

    winner: String,

    result: String,

    status: {
        type: String,
        default: 'Completed'
    }

}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);