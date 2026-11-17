const express = require('express');

const router = express.Router();

const {
    saveMatch,
    getMatches
} = require('../controllers/gameController');

router.post('/save', saveMatch);

router.get('/history', getMatches);

module.exports = router;