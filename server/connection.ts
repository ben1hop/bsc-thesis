import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'host.docker.internal',
  user: 'root',
  password: 'pwd',
  database: 'bsc-dev-db',
});


pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
      return;
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
      return;
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
      return;
    }
  }
  console.log("Successfull db connection.")
  if (connection) {connection.release()};
  return;
});

export default pool;