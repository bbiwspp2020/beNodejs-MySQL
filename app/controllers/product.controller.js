const { Op } = require("sequelize");
const db = require("../models");
const Product = db.product;

exports.getProducts = async (req, res) => {
    try {
        let data = await Product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            limit: Number(req.query.limit ? req.query.limit : 10),
            offset: Number((((req.query.offset ? req.query.offset : 1) - 1) * (req.query.limit ? req.query.limit : 10))),
            order: [
                ["id", "ASC"]
            ],
        })
        res.status(200).json({
            response: {
                products: data,
                total: data.length
            }
        })
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getProduct = async (req, res) => {
    try {
        let data = await Product.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id: {
                    [Op.eq]: req.params.id
                }
            },
        })
        res.status(200).json({
            response: data
        })
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.createProduct = (req, res) => {
    try {
        Product.create({
            productName: req.body.productName,
            productCode: `PD_0001`,
            title: req.body.title,
            quantity: req.body.quantity,
            totleQuantity: req.body.totleQuantity,

        }).then((pd)=>{
            res.status(200).json({
                response: pd
            })
        })
       
    } catch (e) {
        res.status(500).send(e);
    }
}