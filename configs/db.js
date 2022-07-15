const config = require('./config.json')
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(config.mongo_url)
    console.log('Connected to DB')
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB