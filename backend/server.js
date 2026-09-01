import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './products/product.routes.js';
import authRoutes from './auth/auth.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/login', authRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`La api esta corriendo en el puerto ${PORT}`));
});