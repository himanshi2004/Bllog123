const mongoose = require('mongoose')
const connectDB = () =>{
    return mongoose.connect ("mongodb://127.0.0.1:27017/Bllog")
    .then(()=>{
            console.log('connection successful')
    })
    .catch(()=>{
        console.log(err)
    })
}
module.exports = connectDB