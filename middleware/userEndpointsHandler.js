const MysqlConnector = require('../connector/mysqlConnector')
const uuid = require('uuid')

class UserEndpointsHandler {
    constructor(logger) {
        this.logger = logger;
        this.mysqlConnector = new MysqlConnector(logger);
    }
    async createNewUser(body) {
        try {
            const newUserId = uuid.v4();
            let sql = `Insert into user values("${newUserId}","${body.name}","${body.phoneNumber}","${body.pinCode}")`
            await this.mysqlConnector.updateTableData(sql)
            return {userId: newUserId}
        } catch (error) {
            error.status = error.status == 404 ? 404 : 500 ;
            error.message = error.status != 500 ? error.message : {title: 'Internal server error'};
            throw error;
        }
    }
    async updateUserStatus(body) {
        let riskPercentage = 0;
        try {
            if ((!body.symptoms || !body.symptoms.length) && !body.travelHistory && !body.contactWithCovidPatient) {
                riskPercentage = 5;
            } else if (body.symptoms.length > 2 && body.travelHistory && body.contactWithCovidPatient) {
                riskPercentage = 95;
            } else if(body.symptoms.length = 2 && body.travelHistory && body.contactWithCovidPatient) {
                riskPercentage = 75;
            } else if(body.symptoms.length = 1 && body.travelHistory && body,contactWithCovidPatient) {
                riskPercentage = 50
            }
            let sql = `Insert into UserStatus values("${body.userId}","${body.symptoms.toString()}",${body.travelHistory},${body.contactWithCovidPatient},${riskPercentage})`;
            await this.mysqlConnector.updateTableData(sql);
            return {riskPercentage: riskPercentage}
        } catch (error) {
            try {
                let sql = `update UserStatus set id="${body.userId}", symptoms="${body.symptoms.toString()}", travelHistory=${body.travelHistory}, contactWithCovidPatient=${body.contactWithCovidPatient}, covidResult=${riskPercentage} where id = "${body.userId}"`;
                await this.mysqlConnector.updateTableData(sql);
                return {riskPercentage: riskPercentage}
            } catch (error) {
                error.status = error.status == 404 ? 404 : 500 ;
                error.message = error.status != 500 ? error.message : {title: 'Internal server error'};
                throw error;
            }
        
        }
    }
}

module.exports = UserEndpointsHandler;