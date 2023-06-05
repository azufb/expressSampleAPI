const express: any = require('express');
const cors: any = require('cors');
const pgp: any = require('pg-promise')();
const app: any = express();
const port: number = 3000;

type ConnectionConfigType = {
  host: string | undefined;
  port: string | undefined;
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionConfig: ConnectionConfigType = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db: any = pgp(connectionConfig);

const createTasksTable: string =
  'CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY, title VARCHAR(100) NOT NULL)';

db.one(createTasksTable);

app.post('/addTask', (req: any, res: any) => {
  const title: any = req.body.title;
  const sql: string = 'INSERT INTO tasks(title) VALUES($1)';

  db.manyOrNone(sql, [title]).then((data: any) => {
    console.log(data);
    res.send(data);
  });
});

app.post('/addTasks', (req: any, res: any) => {
  const columnSet: any = new pgp.helpers.ColumnSet(['title'], {
    table: 'tasks',
  });
  const query: any = pgp.helpers.insert(req.body.sample, columnSet);

  db.manyOrNone(query).then((data: any) => {
    console.log(data);
    res.send(data);
  });
});

app.get('/getTasks', (req: any, res: any) => {
  const sql: string = 'SELECT * FROM tasks';

  db.manyOrNone(sql).then((data: any) => {
    res.send(data);
  });
});

app.post('/deleteTask', (req: any, res: any) => {
  const targetId: any = req.body.id;
  const sql: string = 'DELETE FROM tasks WHERE id = $1';

  db.manyOrNone(sql, [targetId]).then((data: any) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
