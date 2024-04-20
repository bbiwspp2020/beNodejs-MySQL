module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      productName: {
        type: Sequelize.STRING
      },
      productCode: {
        type: Sequelize.STRING
      },
      title:{
        type:Sequelize.STRING
      },
      quantity:{
        type:Sequelize.INTEGER
      },
      totleQuantity:{
        type:Sequelize.INTEGER
      },
    });
  
    return Product;
  };
  