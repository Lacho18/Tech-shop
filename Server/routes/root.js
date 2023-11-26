const express = require('express');
const route = express();
const path = require('path');

route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

route.get('/main', (req, res) => {
    try {
        res.json({ "users": ["user1", "user2", "user3"] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = route;