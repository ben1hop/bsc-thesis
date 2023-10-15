import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '10.100.16.14',
  user: 'anldev',
  password: 'anldev',
  database: 'analytics_dev',
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

export default pool;