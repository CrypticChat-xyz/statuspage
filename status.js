const express = require('express');
const request = require('request');

const app = express();

function pingWebsite(url, callback) {
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/status', (req, res) => {
    const websiteUrl = 'http://crypticchat.xyz';
    pingWebsite(websiteUrl, (online) => {
        const status = online ? 'Online' : 'Offline';
        res.send(status);
    });
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

setInterval(() => {
    const websiteUrl = 'http://crypticchat.xyz';
    pingWebsite(websiteUrl, (online) => {
    });
}, 5000);
