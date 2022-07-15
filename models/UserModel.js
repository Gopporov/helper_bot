const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    first_name: String,
    last_name: String,
    referral_id: String,
});

module.exports = mongoose.model('User', userSchema);