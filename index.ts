const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise');
const app = express();
const port = 3000;

app.use(cors());

const db = pgp('postgres://root:Y8FXbb14zGdDJZBN2tESxtOFCY7gfQIg@dpg-ce1mpa1a6gdsa63ihhq0-a:5432/sample_db_zxg9');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({message: 'Hello!!'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});