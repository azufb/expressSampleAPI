const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const db = pgp(connectionConfig);

const createTasksTable = 'CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY, title VARCHAR(100) NOT NULL)';

db.one(createTasksTable);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({message: 'Hello!!'});
});

app.post('/addTask', (req, res) => {
    const title = req.body.title;
    const sql = 'INSERT INTO tasks(title) VALUES($1)';

    db.manyOrNone(sql, [title])
    .then(data => {
        console.log(data);
        res.send(data);
    });
});

app.post('/addTasks', (req, res) => {
    const columnSet = new pgp.helpers.ColumnSet(['title'], {table: 'tasks'});
    const query = pgp.helpers.insert(req.body.sample, columnSet);
    
    db.manyOrNone(query)
    .then(data => {
        console.log(data);
        res.send(data);
    });
});

app.get('/getTasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';

    db.manyOrNone(sql)
    .then((data) => {
        res.send(data);
    });
});

app.post('/deleteTask', (req, res) => {
    const targetId = req.body.id;
    const sql = 'DELETE FROM tasks WHERE id = $1';

    db.manyOrNone(sql, [targetId])
    .then(data => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});