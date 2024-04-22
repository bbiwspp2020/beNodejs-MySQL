const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});


db.user.belongsToMany(db.product, {
  through: 'user_products', // ตารางกลางสำหรับการจัดเก็บความสัมพันธ์
  foreignKey: 'userId', // คอลัมน์ในตารางกลางที่อ้างอิงผู้ใช้
  otherKey: 'productId', // คอลัมน์ในตารางกลางที่อ้างอิงสินค้า
});

db.product.belongsToMany(db.user, {
  through: 'user_products',
  foreignKey: 'productId',
  otherKey: 'userId',
});

console.log(db);

db.roles = ["user", "admin", "moderator"];

module.exports = db;
