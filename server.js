import express from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const productSchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    stock: z.number().int().min(0),
});

const productUpdateSchema = productSchema.partial();

const ADMIN_USER = { username: 'admin', password: '1234' };

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/products', verifyToken, async (req, res) => {
    const result = productSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error: result.error.issues});
    }
    const product = await Product.create(result.data);
    res.status(201).json({message: 'Producto creado correctamente', product});
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json({products});
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: 'Producto no encontrado'});
        res.json({product});
    } catch (error) {
        res.status(400).json({error: 'ID inválido'});
    }
});

app.put('/products/:id', async (req, res) => {
    const result = productUpdateSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error: result.error.issues});
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, result.data, {new: true});
        if(!product) return res.status(404).json({error: 'Producto no encontrado'});
        res.json({message: 'Producto actualizado correctamente', product});
    } catch (error) {
        res.status(400).json({error: 'ID inválido'});
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({error: 'Producto no encontrado'});
        res.json({message: 'Producto eliminado correctamente'});
    } catch (error) {
        res.status(400).json({error: 'ID inválido'});
    }
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`La api esta corriendo en el puerto ${PORT}`));
});