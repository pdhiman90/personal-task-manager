import express from 'express';
import loginRoute from './routes/auth.route';
import taskRoute from './routes/task.route';
import { connectMongoDB } from './config/db.config';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config();

const port = process.env.PORT;
console.log(process.env.ORIGIN,"cors origin")
const app = express();
app.use(cors({
    origin: process.env.ORIGIN, // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB().then(() => {
    console.log('MongoDB connected successfully!');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use('/',loginRoute);
app.use('/api',taskRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
