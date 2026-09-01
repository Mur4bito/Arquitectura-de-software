import { Router } from 'express';
import { productService } from './product.service.js';
import { verifyToken } from '../auth/auth.middleware.js';
import { ValidationError, NotFoundError, InvalidIdError } from '../shared/errors.js';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Producto creado correctamente', product });
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ error: error.issues });
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

router.get('/', async (req, res) => {
    const products = await productService.getAllProducts();
    res.json({ products });
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json({ product });
    } catch (error) {
        if (error instanceof InvalidIdError) return res.status(400).json({ error: error.message });
        if (error instanceof NotFoundError) return res.status(404).json({ error: error.message });
        res.status(500).json({ error: 'Error inesperado' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ message: 'Producto actualizado correctamente', product });
    } catch (error) {
        if (error instanceof ValidationError) return res.status(400).json({ error: error.issues });
        if (error instanceof InvalidIdError) return res.status(400).json({ error: error.message });
        if (error instanceof NotFoundError) return res.status(404).json({ error: error.message });
        res.status(500).json({ error: 'Error inesperado' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        if (error instanceof InvalidIdError) return res.status(400).json({ error: error.message });
        if (error instanceof NotFoundError) return res.status(404).json({ error: error.message });
        res.status(500).json({ error: 'Error inesperado' });
    }
});

export default router;