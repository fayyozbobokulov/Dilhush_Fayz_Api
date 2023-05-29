import express from 'express';
import { connectDB } from './config/connect.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();
app.use(cors());

//Routes
import drinkRouter from './routers/drinks.js';
import milliyRoute from './routers/milliyFoods.js';
import orderRouter from './routers/order.js';
import pizzaRouter from './routers/pizzas.js';
import saladRouter from './routers/salads.js';
import authRouter from './routers/auth.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/drink', drinkRouter);
app.use('/api/milliyFood', milliyRoute);
app.use('/api/pizza', pizzaRouter);
app.use('/api/salad', saladRouter);
app.use('/api/order', orderRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
