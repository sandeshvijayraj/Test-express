const UserEndpointsHandler = require('../middleware/UserEndpointsHandler')
const { validateCreateUserRequest, ValidateUpdateUserStatus } = require('../utils/userRequestValidations')

class UserEndpoints {
    constructor(logger) {
        this.logger = logger
        this.userEndpointsHandler = new UserEndpointsHandler(logger)
    }
    async createNewUser(req, res) {
        let userBody = {name: "sandesh", phoneNumber: "9741865499", pinCode: "582101"};
        let isInvalidUserBody = validateCreateUserRequest(userBody);
        if (isInvalidUserBody) {
            return res.status(isInvalidUserBody.status).json(isInvalidUserBody)
        }
        try {
            let result = await this.userEndpointsHandler.createNewUser(userBody);
            return res.status(201).json(result)
        } catch (error) {
            this.logger.log({title: Error, error: error});
            return res.status(error.status || 500).json(error.message || {title: 'Internal servewr error'})
        }
    }
    async updateUserStatus(req, res) {
        let userBody = {userId: 'test', symptoms: ['test'], 'travelHistory': true, contactWithCovidPatient: true};
        let isInvalidUpdateUserStatusBody = ValidateUpdateUserStatus(userBody);
        if(isInvalidUpdateUserStatusBody) {
            return res.status(isInvalidUpdateUserStatusBody.status).json(isInvalidUpdateUserStatusBody)
        }
        try {
            let result = await this.userEndpointsHandler.updateUserStatus(userBody);
            return res.status(201).json(result)
        } catch (error) {
            this.logger.log({title: Error, error: error});
            return res.status(error.status || 500).json(error.message || {title: 'Internal servewr error'})
        }
    }
 }

 module.exports = UserEndpoints;