const mysql = require('mysql-promise')()

class MysqlConnector {

    constructor(logger) {
        this.logger = logger;
        mysql.configure({
            host: 'localhost',
            user: 'root',
            password: 'sandesh@123',
            database: 'udaan'
        })
    }
    async updateTableData(sql) {
        try {
            await mysql.query(sql);
            return;
        } catch(error) {
            throw error;
        }
    }
    async fetchTableData(sql) {
        try {
            let res = await mysql.query(sql);
            return res[0];
        } catch(error) {
            throw error;
        }
    }
}
module.exports = MysqlConnector;