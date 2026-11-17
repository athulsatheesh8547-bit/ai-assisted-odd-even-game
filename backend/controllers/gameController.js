const Match = require('../models/Match');

// Save match
const saveMatch = async (req, res) => {
    try {
        const {
            player1,
            player2,
            tossWinner,
            firstBatter,
            secondBatter,
            firstInningsScore,
            secondInningsScore,
            winner,
            result
        } = req.body;

        const match = new Match({
            player1,
            player2,
            tossWinner,
            firstBatter,
            secondBatter,
            firstInningsScore,
            secondInningsScore,
            winner,
            result,
            status: 'Completed'
        });

        await match.save();

        res.status(201).json({
            message: 'Match saved successfully',
            match
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error saving match',
            error: error.message
        });
    }
};

// Get match history
const getMatches = async (req, res) => {
    try {
        const matches = await Match.find()
            .sort({ createdAt: -1 });

        res.status(200).json(matches);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching matches'
        });
    }
};

module.exports = {
    saveMatch,
    getMatches
};