const router = require('express').Router();

const { Employee } = require('../models');
const validateDto = require('../middlewares/validateDto');
const { creaateEmployeeRequestDto } = require('../dto/employee');
const LOG = require('../logger');
/*
    +-------------------------------------------+
    |                                           |
    |              EMPLOYEE ROUTES              |
    |                                           |
    +-------------------------------------------+
*/

router.post('/', validateDto(creaateEmployeeRequestDto), async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, gender } = await req.body;
    const employees = await Employee.findOne({ where: { email } });
    if (employees) {
      return res.status(403).json({ error: "Already Exists" });
    }
    const newUser = await Employee.create({ firstName, lastName, email, phone: phoneNumber, gender });
    return res.status(201).json(newUser);
  } catch (error) {
    LOG.error('[POST - CREATE EMPLOYEE] Error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    if (employees.length === 0) {
      return res.status(204).json();
    }
    return res.status(200).json(employees);
  } catch (error) {
    LOG.error('[GET - GET ALL EMPLYEE] Error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:empId', async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ where: { id: empId } });
    if (!employee) {
      return res.status(404).json({
        error: "The requested resource was not found.",
      });
    }
    employee.destroy();

    return res.status(200).json({ message: 'Resource successfully deleted!' });
  } catch (error) {
    LOG.error('[DELETE - DELETE EMPLOYEE BY ID] Error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:empId', async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ where: { id: empId } });
    if (!employee) {
      return res.status(404).json({
        error: "The requested resource was not found.",
      });
    }

    const { firstName, lastName, email, phoneNumber, gender } = await req.body;

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.phone = phoneNumber;
    employee.gender = gender;

    await employee.save();

    return res.status(204).json();
  } catch (error) {
    LOG.warn('[PUT - UPDATE EMPLOYEE DETAILS] Error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
