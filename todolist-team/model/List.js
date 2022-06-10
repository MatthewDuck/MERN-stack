const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Needs a title'],
        trim: true,
        match: [/^[A-Z][a-z]{5, 20}$/, 'Capitalise first name and use only text']
    },
    desc: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    categories: {
        type: [String]
    },
    status: {
        type: String,
        required: true,
        enum: ['todo', 'doing', 'done']
    }
});

const List = mongoose.model('List', listSchema);

module.exports = List;