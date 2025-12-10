const Product = require('../models/productmodels');
const fs = require("fs");
const path = require("path");

exports.addProduct = async (req, res) => {
    try {

        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return res.json({ status: 400, message: 'Product already exists!' });
        }

        if (!req.body) {
            return res.json({ status: 400, message: 'All fields are required' });
        }

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        // ⭐ Create new product and store created data
        const newProduct = await Product.create({
            ...req.body,
            image: imagePath,
        });

        return res.json({
            status: 200,
            message: 'Product added successfully!',
            product: newProduct   // ⭐ Now returning full product data
        });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};


exports.EditProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.json({ status: 404, message: "Product not found" });
        }

        let image = product.image; // ⭐ Fix: Declare image with old value

        if (req.file) {

            // ⭐ Delete old image if exists
            if (product.image) {
                const oldImagePath = path.join(__dirname, "..", product.image.replace(/^\//, ""));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // ⭐ Save new image
            image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { ...req.body, image },
            { new: true }
        );

        return res.json({
            status: 200,
            message: "Product updated successfully!",
            updatedProduct
        });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};


exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.json({ status: 404, message: "Product not found" });
        }

        if (product.image) {
            const imagePath = path.join(__dirname, "..", product.image.replace(/^\//, ""));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(id);
        return res.json({ status: 200, message: "Product deleted successfully!" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.Viewallproduct = async (req, res) => {
    try {
        
        const products = await Product.find();

        if (products.length === 0) {
            return res.json({ status: 404, message: "No products found" });
        }
        return res.json({ status: 200, message: "All products fetched successfully!", products });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.viewSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // 🛑 ID missing
        if (!productId) {
            return res.status(400).json({ status: 400, message: "Product ID is required" });
        }

        // 🟢 Only Admin + User can access (use req.user.role)
        if (req.user.role !== "Admin" && req.user.role !== "User") {
            return res.status(403).json({ status: 403, message: "Access Denied" });
        }

        // 🔍 Find product
        const singleProduct = await Product.findById(productId);

        if (!singleProduct) {
            return res.status(404).json({ status: 404, message: "Product not found" });
        }

        // ✅ Return success
        return res.status(200).json({
            status: 200,
            message: "Single Product Fetched",
            product: singleProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong",
            error: error.message
        });
    }
};
