const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description , price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(prod);
    } catch (err) {        
        res.status(500).json(err);
    }
};

//getall products
const getProducts =  async (req, res) => {
    const custs = await prisma.products.findMany()
    res.json(custs)
};
//get one product
const getProduct =  async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!cust) {
            res.status(404).json({ 'message': 'Customer not found!' });
        } else {
            res.status(200).json(cust);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
// update product
const updateProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.update({
            data: {
                name,
                description,
                price,
                category,
                image_url
            },
            where: { product_id: Number(product_id) }
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};
// delete customer by products_id
const deleteProduct =  async (req, res) => {
    const id = req.params.id;
    try {
        console.log(id);
        const cust = await prisma.products.delete({
            where: {
                product_id: Number(id),
            },
        })
        res.status(200).json(cust)
    } catch (err) {
        res.status(500).json(err);
    }
};
// search any product by name
const getProductsByTerm = async (req, res) => {
    const  searchString  = req.params.term;
    try {
        const custs = await prisma.products.findMany({
            where: { 
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!custs || custs.length == 0) {
            res.status(404).json({ 'message': 'Customer not found!' });
        } else {
            res.status(200).json(custs);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createProduct,getProducts,getProduct,updateProduct,deleteProduct,getProductsByTerm };