const mongoose = require('mongoose');
let url = `mongodb://localhost:27017/movie`
const connect = async()=>{
    try {
        await mongoose.connect(url)
        console.log('Connected');
    } catch (error) {
        console.log('error');
    }
}

module.exports = connect;