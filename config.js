const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://localhost:27017/Login-users')

connect.then(()=>{
    console.log('database connected successfully');
})
.catch(()=>{
    console.log('database can not be connected');
})

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model('users', loginSchema);
module.exports = collection;