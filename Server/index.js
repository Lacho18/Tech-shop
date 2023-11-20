const express = require('express');
const app = express();
const PORT = 5000;
const neznam = require('./data/clientFunctions');

app.get('/main', (req, res) => {
    try {
        res.json({ "users": ["user1", "user2", "user3"] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

neznam.lookByModel("computer");