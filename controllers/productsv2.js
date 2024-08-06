const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

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
                        description: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    },
                    {
                        image_url: {
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

module.exports = { getProductsByTerm };