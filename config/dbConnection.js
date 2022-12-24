const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB