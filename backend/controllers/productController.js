import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find({});
    res.json(products);
});

//@desc Fetch a product
//@route GET /api/products/:id
//@access Public

const getProductById = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource not found ')
    }
});

//@desc Create a  products
//@route POST /api/products
//@access Private/admin

const createProduct = asyncHandler(async (req, res) =>{
    const product  = new Product({
        name:'Sample Product',
        price:0,
        prevPrice:null,
        user:req.user._id,
        image:'/Images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'


    })
    createProduct =await product.save();
    res.json(createProduct);
});

//@desc Update a  products
//@route PUT /api/products/:id
//@access Private/admin

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price,prevPrice, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.prevPrice = prevPrice;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
    });

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
    } );

export {getProducts, getProductById ,createProduct ,updateProduct,deleteProduct}