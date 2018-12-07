const mongoose = require('mongoose');

const { Schema } = mongoose;

// EXAMPLE SCHEMA FOR MONGO
const ExampleModelSchema = new Schema(
    {
        test: String,
    },
    { timestamps: true },
);

module.exports = mongoose.model('ExampleModel', ExampleModelSchema);
