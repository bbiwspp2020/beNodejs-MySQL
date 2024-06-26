const controller = require("../controllers/product.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/getProducts",
        [authJwt.verifyToken],
        controller.getProducts
    );

    app.get(
        "/api/getProduct/:id",
        [authJwt.verifyToken],
        controller.getProduct
    );

    app.post(
        "/api/product",
        [authJwt.verifyToken],
        controller.createProduct
    )

};