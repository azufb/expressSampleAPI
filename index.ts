const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;

app.use(cors());

const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const db = pgp(connectionConfig);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({message: 'Hello!!'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});