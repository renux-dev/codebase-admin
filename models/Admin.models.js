const mongoose = require('mongoose');

const admin = mongoose.Schema({
    id_Level_Master: Number,
    token: String,
    email: String,
    name: String,
    username: String,
    password: String,
    created_at: Number,
    status: Number,
    status_reg: Number
});

module.exports = mongoose.model('admin', admin);