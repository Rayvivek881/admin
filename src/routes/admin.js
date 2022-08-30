const Router = require('express').Router();
const {
    createAdmin, AdminLogin, insertJob, deleteJob, getJobs
} = require('../controllers/admincontroller.js')

Router.route('/createAdmin').post(createAdmin);
Router.route('/adminLogin').post(AdminLogin);
Router.route('/Job')
    .post(insertJob)
    .delete(deleteJob)
    .get(getJobs);


module.exports = Router;