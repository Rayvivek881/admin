const authentication = require('../middleware/authentication.js');
const encryption = require('../middleware/encryption.js');

const createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const AdminLogin = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const insertJob = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const deleteJob = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const getJobs = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

module.exports = {
    createAdmin, AdminLogin, insertJob, deleteJob, getJobs
}