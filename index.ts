const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    const config = mysql2.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'MYSQLDB_DATABASE',
        port: 3000
    });
    
    config.connect(function(err) {
        if (err) throw err;
        console.log('Connected');
    });

    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({message: 'Hello!!'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});