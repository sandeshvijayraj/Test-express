function validateCreateUserRequest(body) {
    if (!body) {
        return {status: 400, message: 'Missing user body. need user body of the form {name: string, phoneNumber:string, pinCode: string}'}
    }
    if (!body.name || !body.phoneNumber || !body.pinCode) {
        return {status: 400, message: 'Missing body arguments. need user body of the form {name: string, phoneNumber:string, pinCode: string}'}
    }
}

function ValidateUpdateUserStatus(body) {
    if (!body) {
        return {status: 400, message: 'Missing user body. need user body of the form {userId:string, symptoms:string[], travelHistory:boolean, contactWithCovidPatient:boolean}'}
    }
    if (!body.userId || !body.symptoms || !body.travelHistory || !body.contactWithCovidPatient) {
        return {status: 400, message: "Missing user body arguments. need user body of the form {userId:string, symptoms:string[], travelHistory:boolean, contactWithCovidPatient:boolean}"}
    }

    if (typeof body.travelHistory != 'boolean') {
        return {status: 400, message: "travelHistory must be a boolean"}
    }
    if (typeof body.contactWithCovidPatient != 'boolean') {
        return {status: 400, message: "contactWithCovidPatient must be a boolean"}
    }
 }
module.exports = { validateCreateUserRequest, ValidateUpdateUserStatus }