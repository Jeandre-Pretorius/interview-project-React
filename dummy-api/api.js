const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8008;

// Replace 'data.json' with the path to your JSON file
const jsonDataPath = './json/ZA_Population.json';

app.get('/data', (req, res) => {
    fs.readFile(jsonDataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to load data' });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // This automatically sets Content-Type to application/json
        } catch (parseError) {
            res.status(500).send({ error: 'Failed to parse JSON data' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});