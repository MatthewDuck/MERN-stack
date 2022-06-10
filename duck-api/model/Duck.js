const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const duckSchema = new Schema({
    name: String,
    region: String,
    genus: String,
    colour: String,
    wingspan: Number
});

const Duck = mongoose.model('Duck', duckSchema);

module.exports = Duck;