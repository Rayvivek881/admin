const Router = require('express').Router();
const authentication = require('../middleware/authentication.js');
const {
    createAdmin, AdminLogin, insertJob, deleteJob, getJobs
} = require('../controllers/admincontroller.js')

Router.route('/createAdmin').post(createAdmin);
Router.route('/adminLogin').post(AdminLogin);
Router.route('/Job')
    .post(authentication, insertJob)
    .delete(authentication, deleteJob)
    .get(getJobs);


module.exports = Router;