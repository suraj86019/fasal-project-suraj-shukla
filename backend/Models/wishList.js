const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:String,
    src:String,
    id:String,
    email:String
})


module.exports = mongoose.model('List',schema);