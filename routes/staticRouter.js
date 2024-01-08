const express = require('express');
const router = express.Router();
const URL = require('../models/url')

router.get('/', async (req, res) => {
    try {
        const allurls = await URL.find({});
        return res.render('home', { urls: allurls });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
