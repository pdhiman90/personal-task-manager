import mongoose from 'mongoose';
// import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define database configurations
const dbConfig:any = {
  mongo: {
    uri: process.env.MONGO_URI, // MongoDB URI
  },
  mysql: {
    host: process.env.MYSQL_HOST, // MySQL Host
    user: process.env.MYSQL_USER, // MySQL User
    password: process.env.MYSQL_PASSWORD, // MySQL Password
    database: process.env.MYSQL_DB, // MySQL Database Name
  },
};

// MongoDB connection setup
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(dbConfig.mongo.uri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// MySQL connection setup
// export const connectMySQL = () => {
//   const connection = mysql.createConnection({
//     host: dbConfig.mysql.host,
//     user: dbConfig.mysql.user,
//     password: dbConfig.mysql.password,
//     database: dbConfig.mysql.database,
//   });

//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to MySQL:', error);
//       process.exit(1); // Exit process with failure
//     } else {
//       console.log('MySQL connected successfully!');
//     }
//   });

//   return connection;
// };
