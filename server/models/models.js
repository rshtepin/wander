const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Test = sequelize.define(
  'test', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true},
  OS: {type: DataTypes.ENUM, values: ['Windows', 'Linux', 'Mac OS']}
})

const User = sequelize.define(
  'user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const CompareBasket = sequelize.define(
  'compareBasket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const DlpProduct = sequelize.define(
  'dlpProduct', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true},
  img: {type: DataTypes.STRING, allowNull: true},
  OS: {type: DataTypes.ENUM, values: ['Windows', 'Linux', 'Mac OS']}
})

const DlpProductInfo = sequelize.define(
  'dlpProductInfo', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: true}
})


const Brand = sequelize.define(
  'brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}
})


DlpProduct.hasMany(DlpProductInfo)
DlpProductInfo.belongsTo(DlpProduct)

module.exports = {
  Test,
  User,
  DlpProduct,
  DlpProductInfo,
  Brand,
  CompareBasket
}