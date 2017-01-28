const express = require('express')
    , http = require('http')
    , path = require('path');

const app = express();

app.set('port', (process.env.PORT || 8080));

app.get('/:name', function (req, res) {
    if (req.params.name == null) {
        res.send('Hi, Dude!');
    }
    res.set({
        'Cache-Control': 'public, max-age=7200000',
        'Expires': new Date(Date.now() + 7200000000)
    });
    res.sendFile(path.join(__dirname, 'files', req.params.name));
});

app.listen(app.get('port'), function () {
    console.log('Server is on port', app.get('port'));
});