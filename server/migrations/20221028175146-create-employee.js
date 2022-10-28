'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('employee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          validator: function (v) {
            return phoneValidationRegex.test(v);
          },
        }
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('employee');
  }
};