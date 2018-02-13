
const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg })
    
}

const categoryModule = require('./categories')({ connection, errorHandler })
const userModule = require('./users')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

module.exports = {
    categories: () => categoryModule,
    users: () => userModule,
    auth: () => authModule

}