const Product = require('../../../models/Product');

exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const skip = (page - 1) * limit;
        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        res.status(200).json({
            products,
            currentPage: page,
            totalPages,
            totalProducts
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve products', message: err.message });
    }
};

exports.getProductDetail = async (req, res) => {
    const { productId } = req.query;
    if (!productId) {
        return res.status(400).json({ error: 'Product id is required.' });
    }
    try {
        const product = await Product.findOne({ productId: Number(productId) });
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve product detail', message: err.message });
    }
};

exports.editProduct = async (req, res) => {
    const { productId } = req.body;
    const update = req.body.update ? JSON.parse(req.body.update) : {};

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    try {
        const baseUrl = `http://localhost:5000`;
        update.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;



        const updatedProduct = await Product.findOneAndUpdate(
            { productId: Number(productId) },
            update,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product', message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { productId } = req.query;
    if (!productId) {
        return res.status(400).json({ error: 'Product id is required.' });
    }
    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: Number(productId) });
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove product', message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    let { productId, productType, title, images, description, classSeries,
        primaryDescription, secondDescription, thirdDescription, price,
        FaqOneKey, FaqOneValue, FaqTwoKey, FaqTwoValue, FaqThreeKey, FaqThreeValue,
        FaqFourKey, FaqFourValue, detailOneKey, detailOneValue, detailTwoKey, detailTwoValue,
        detailThreeKey, detailThreeValue, mainDescription, author, publishDate, categories, content, culture } = req.body;

    if (!productType || !title || !culture) {
        return res.status(400).json({ error: 'Product type and title are required.' });
    }

    try {
        if (!productId) {
            productId = Math.floor(1000000 + Math.random() * 900000);
        }

        const existingProduct = await Product.findOne({ productId: Number(productId) });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this productId already exists.' });
        }
        const newProduct = new Product({
            productId,
            productType,
            title,
            images: images || [],
            description,
            classSeries,
            primaryDescription,
            secondDescription,
            thirdDescription,
            price,
            FaqOneKey,
            FaqOneValue,
            FaqTwoKey,
            FaqTwoValue,
            FaqThreeKey,
            FaqThreeValue,
            FaqFourKey,
            FaqFourValue,
            detailOneKey,
            detailOneValue,
            detailTwoKey,
            detailTwoValue,
            detailThreeKey,
            detailThreeValue,
            mainDescription,
            author,
            publishDate: publishDate ? new Date(publishDate) : undefined,
            categories: categories || [],
            content,
            culture
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product', message: err.message });
    }
};
