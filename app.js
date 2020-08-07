const mysql = require('mysql');

const getConnection = () => {
  const {MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD} = process.env;

  const config = {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
  };

  const connection = mysql.createConnection(config);

  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    })
  })
}

const query = (...params) => new Promise((resolve, reject) => {
  getConnection()
    .then((connection) => {
      connection.query(...params, (error, response) => {
        connection.destroy();

        if (error) {
          reject(error);
          return;
        }

        resolve(response);
      })
    })
    .catch(reject);
})

async function getDatabaseNames() {
  const result = await query('SHOW DATABASES;');

  const response = result.map(({ Database }) => Database);
  return JSON.stringify(response);
}

module.exports = {getDatabaseNames}
