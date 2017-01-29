const express = require('express');
const http = require('http');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 8080));

app.get('/:name', function (req, res) {
    const filePath = path.join(__dirname, 'files', req.params.name);

    let acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding) acceptEncoding = '';

    fs.exists(filePath, (exists) => {
        if (exists) {
            res.set({
                'Cache-Control': 'public, max-age=7200000',
                'Expires': new Date(Date.now() + 7200000000)
            });
            let fileStream = fs.createReadStream(filePath);
            if (acceptEncoding.match(/\bdeflate\b/)) {
                res.status(200)
                    .set({ 'content-encoding': 'deflate' });
                fileStream.pipe(zlib.createDeflate()).pipe(res);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                res.status(200)
                    .set({ 'content-encoding': 'gzip' });
                fileStream.pipe(zlib.createGzip()).pipe(res);
            } else {
                res.status(200, {});
                fileStream.pipe(res);
            }
        } else {
            res.status(404).end();
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Server is on port', app.get('port'));
});