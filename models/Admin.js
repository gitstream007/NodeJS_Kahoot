const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    username: String,
    password: String,
    // roles: [String]
});

module.exports = mongoose.model('Admin', Admin);
