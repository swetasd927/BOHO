// const mongoose = require('mongoose');
// const dbgr = require("debug")("development:mongoose");

// // Use environment variable directly
// const mongoURL = process.env.MONGO_URL;

// mongoose
//   .connect(`${mongoURL}/premiumbagshop`)
//   .then(() => {
//     dbgr("connected");
//   })
//   .catch((err) => {
//     dbgr(err);
//   });

// module.exports = mongoose.connection;

const mongoose = require('mongoose');

//reading environment varibles with fallback
const mongoURL = process.env.mongoURL || process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || 'premiumbagshop';

//logging connection attempt info
console.log('Attempting MongoDB connection with: ');
console.log('Database name: ', dbName);
console.log('Connection string format check:', mongoURL ? 'Present' : 'Missing');
console.log('Connection string starts with mongodb+src://', mongoURL?.startsWith('mongodb+srv://'));

//connection options
const connectOptions = {
  dbName,
  serverSelectionTimeoutMS: 30000,
  heartbeatFrequencyMS: 2000,
};

//async connection function
async function connectToDatabase() {
  if(!mongoURL){
    const msg = 'MONGO_URL(or MONGO_URI) is not set in environment. Cannot connect to MongoDB.';
    console.error(msg);
    throw new Error(msg);  
  }
  const fullUri = mongoURL;
  
  //attempt conncetion
  try{
    await mongoose.connect(fullUri, connectOptions);
    console.log('Mongoose connected to', fullUri.includes('@') ? 'MongoDB Atlas (masked URI)' : fullUri);
    return mongoose.connection;
  }catch(err){
    console.log('Mongoose connection error: ', err);
    throw err;
  }
}

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error event:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected');
});

module.exports = {
  connectToDatabase,
  connection: mongoose.connection,
}

