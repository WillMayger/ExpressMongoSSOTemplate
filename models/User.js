const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

// CREATE USER SCHEMA FOR MONGO
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    userid: String,
    admin: Boolean,
    updated_at: { type: Date, default: Date.now },
});

// SOLVES OAUTH / SSO ISSUE
// YOU NEED A FIND OR CREATE METHOD AND PASSPORT DOES NOT SUPPLY THIS
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
