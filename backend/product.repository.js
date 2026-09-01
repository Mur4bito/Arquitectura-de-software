import Product from './products/product.model.js';

export const productRepository = {
    create: (data) => Product.create(data),
    findAll: () => Product.find(),
    findById: (id) => Product.findById(id),
    updateById: (id, data) => Product.findByIdAndUpdate(id, data, { new: true }),
    deleteById: (id) => Product.findByIdAndDelete(id),
};