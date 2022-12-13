const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Products = sequelize.define(
  'product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true},
  OS: {
    type: DataTypes.ARRAY(DataTypes.ENUM({
      values: ['Windows', 'Linux', 'Mac OS']
    }))
  }
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


module.exports = {
  Products,
  User,
  CompareBasket
}