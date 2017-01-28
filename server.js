const express = require('express')
    , http = require('http')
    , path = require('path');

const app = express();

app.get('/:name', function (req, res) {
    res.set({
        'Cache-Control': 'public, max-age=7200000',
        'Expires': new Date(Date.now() + 7200000000)
    });
    res.sendFile(path.join(__dirname, 'files', req.params.name));
});

app.listen(8080, function () {
    console.log('Server is on port 8080')
});