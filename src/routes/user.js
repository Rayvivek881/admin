const Router = require('express').Router();
const { createUser, getUser, deleteUser } = require('../controllers/usercontroller.js')
const authentication = require('../middleware/authentication.js');


Router.route('/create').post(createUser)
Router.route('/delete').delete(authentication, deleteUser)
Router.route('/get').get(authentication, getUser)

module.exports = Router;