const express = require("express");
const UserEndpoints = require('./endpoints/userEndpoints.js');
const cors = require('cors');
const logger = require('./utils/logger');


const app = express();
app.use(cors())

const userEndpoints = new UserEndpoints(console)

app.post('/v0/registerNewUser',(req, res) => userEndpoints.createNewUser(req, res));
app.post('/v0/updateUserStatus', (req, res) => userEndpoints.updateUserStatus(req, res));

app.listen(8080)
console.log('Listening at http://localhost:8080')