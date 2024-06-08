const mysql = require('mysq');

const pool = mysql.createPool({
    host: 'your-online-database-host',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database-name'
});

module.exports = pool.promise();
