const express = require('express');
const Spotify = require('spotifydl-core').default
const bodyParser = require('body-parser');
let app = express();

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

const spotify = new Spotify(credentials);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Abdl is up.')
})

app.post('/api/ab/download', async (req, res) => {
    try {
        if (req.body.url.startsWith('https://open.spotify.com/') || req.body.url.startsWith('http://open.spotify.com/')) {
            res.header('Content-Disposition', 'attachment; filename="' + new Date() + '| Spotify - Fizzy.mp3"');
            let song = await spotify.downloadTrack(req.body.url);
            res.write(song, 'binary');
            res.end();
        } else {
            res.json({ error: 'Not found', status: 404 })
        }
    } catch (err) {
        res.json({ error: err, status: 500 })
    }
})

app.get('*', (req, res) => {
    res.json({ error: 'Not found', status: 404 })
})