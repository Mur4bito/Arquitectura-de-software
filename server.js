import express from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
app.use(express.json());

const productSchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    stock: z.number().int().min(0),
});

const productUpdateSchema = productSchema.partial();

app.post('/products', async (req, res) => {
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