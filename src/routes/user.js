const Router = require('express').Router();
const { createUser, getUser, deleteUser } = require('../controllers/usercontroller.js')


Router.route('/create').post(createUser)
Router.route('/delete').delete(deleteUser)
Router.route('/get').get(getUser)

module.exports = Router;