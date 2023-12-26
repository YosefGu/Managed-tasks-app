const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: [String]
    },
    tasks: {
        type: {
            open: Array,
            progress: Array,
            resolved: Array,
            closed: Array
        }
    },
    author: {
        type: [String],
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);
