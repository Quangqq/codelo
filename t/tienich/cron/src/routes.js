const express = require('express');
const router = express.Router();
const cronManager = require('./cronManager');

router.post('/schedule', (req, res) => {
    const { url, time, frequency } = req.body;

    try {
        cronManager.scheduleCronJob(url, time, frequency);
        res.json({ message: 'Cronjob scheduled successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling cronjob.' });
    }
});

module.exports = router;
