import express from 'express';
import connectDB from './config/database';
import {
    authRoutes,
    userRoutes
} from './routes';

const app = express();
connectDB();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);


app.listen(5000, () => {
    console.log('Server running on port 5000');
});
