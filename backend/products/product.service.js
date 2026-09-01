import { productRepository } from '../product.repository.js';
import { productSchema, productUpdateSchema } from './product.schema.js';
import { ValidationError, NotFoundError, InvalidIdError } from '../shared/errors.js';

export const productService = {
    async createProduct(data) {
        const result = productSchema.safeParse(data);
        if (!result.success) throw new ValidationError(result.error.issues);
        return productRepository.create(result.data);
    },

    async getAllProducts() {
        return productRepository.findAll();
    },

    async getProductById(id) {
        let product;
        try {
            product = await productRepository.findById(id);
        } catch {
            throw new InvalidIdError('ID inválido');
        }
        if (!product) throw new NotFoundError('Producto no encontrado');
        return product;
    },

    async updateProduct(id, data) {
        const result = productUpdateSchema.safeParse(data);
        if (!result.success) throw new ValidationError(result.error.issues);
        let product;
        try {
            product = await productRepository.updateById(id, result.data);
        } catch {
            throw new InvalidIdError('ID inválido');
        }
        if (!product) throw new NotFoundError('Producto no encontrado');
        return product;
    },

    async deleteProduct(id) {
        let product;
        try {
            product = await productRepository.deleteById(id);
        } catch {
            throw new InvalidIdError('ID inválido');
        }
        if (!product) throw new NotFoundError('Producto no encontrado');
        return product;
    },
};