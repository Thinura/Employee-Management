'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Employee.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already exists.',
      },
      validate: {
        isEmail: { msg: 'Only Valid emails are expected.' },
        notNull: { msg: 'Employee must a email.' },
        notEmpty: { msg: 'Firs Name must not be empty.' },
        max: { msg: 'Firs Name can only have maximum of 10 charaters', args: 10 },
        min: { msg: 'Firs Name only have minimum of 6 charaters', args: 6 },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Employee must a first name.' },
        notEmpty: { msg: 'Firs Name must not be empty.' },
        max: { msg: 'Firs Name can only have maximum of 10 charaters', args: 10 },
        min: { msg: 'Firs Name only have minimum of 6 charaters', args: 6 },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Employee must a last name.' },
        notEmpty: { msg: 'Last Name must not be empty.' },
        max: { msg: 'Last Name can only have maximum of 10 charaters', args: 10 },
        min: { msg: 'Last Name only have minimum of 6 charaters', args: 6 },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['MALE', 'FEMALE'],
      allowNull: false,
      validate: {
        notNull: { msg: 'Employee must a gender.' },
        notEmpty: { msg: 'Gender must not be empty.' },
        isIn: {
          args: [['MALE', 'FEMALE']],
          msg: 'Gender is invalid.',
        },
      },
    },
  }, {
    sequelize,
    tableName: 'employee',
    modelName: 'Employee',
  });
  return Employee;
};