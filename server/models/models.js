
const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const productTable = process.env.DB_PRODUCTS_TABLE
const productInfoTable = process.env.DB_PRODUCT_INFO_TABLE
const varNameTable = process.env.DB_PRODUCT_VAR_NAMES

const Products = sequelize.define(
  productTable, {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true}
})

const Var_names = sequelize.define(
  varNameTable, {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  sqlVar: {type: DataTypes.STRING, primaryKey: true, unique: true},
  showVar: {type: DataTypes.STRING, primaryKey: true},
}, {timestamps: false}
)

const Product_info = sequelize.define(
  productInfoTable, {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, primaryKey: true, unique: true},
    idProduct: {type: DataTypes.INTEGER, primaryKey: true}
}, {timestamps: false}
)

const User = sequelize.define(
  'user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})

module.exports = {
  Products,
  User,
  Product_info,
  Var_names
}