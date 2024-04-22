module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("product", {
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
      userId:{
        type:Sequelize.INTEGER
      },
      
    });
  
    return Products;
  };
  