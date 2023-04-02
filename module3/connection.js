const { Client } = require('pg')
 
const connectionString = 'postgres://postgres:1234@localhost:5432/global-node';

const client = new Client({
    connectionString: connectionString
});

client.connect();

const createTableQuery = `
  INSERT INTO users (id, login, password, age, is_deleted)
  VALUES
      (1, 'mail@example.com', 'password1', 34, false),
      (2, 'jane@example.com', 'password2', 34, false),
      (3, 'bob@example.com', 'password3', 34, false);
`;

client.query(createTableQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
