import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connect.js';
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(() => {
	console.log(`Server listening on PORT ${PORT}`);
});
