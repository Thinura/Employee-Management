const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const router = require('express').Router();

const { Employee } = require('../models');
const validateDto = require('../middlewares/validateDto');
const { creaateEmployeeRequestDto } = require('../dto/employee');
const LOG = require('../logger');
const upload = require('../middlewares/validateImage');
const { HTTP_NOT_FOUND_CODE, HTTP_INTERNAL_SERVER_ERROR_CODE, HTTP_FORBIDDEN_CODE, HTTP_RESOURCE_CREATED_CODE, HTTP_NOT_CONTENT_CODE, HTTP_SUCCESS_CODE } = require('../constants/httpStatusCodes');

/*
    +-------------------------------------------+
    |                                           |
    |              EMPLOYEE ROUTES              |
    |                                           |
    +-------------------------------------------+
*/

router.post('/', validateDto(creaateEmployeeRequestDto), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gender, photo } = await req.body;
    const employees = await Employee.findOne({ where: { email } });
    if (employees) {
      return res.status(HTTP_FORBIDDEN_CODE).json({ error: "Already Exists" });
    }
    const newUser = await Employee.create({ firstName, lastName, email, phone, gender, photo });
    return res.status(HTTP_RESOURCE_CREATED_CODE).json(newUser);
  } catch (error) {
    LOG.error('[POST - CREATE EMPLOYEE] Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const uploadPath = `${process.env.SERVER_URL}:${process.env.HTTP_PORT}/${req.file.path}`;
    return res.status(HTTP_SUCCESS_CODE).json({ uploadPath });
  } catch (error) {
    LOG.error('[POST - CREATE EMPLOYEE] Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    if (employees.length === 0) {
      return res.status(HTTP_NO_CONTENT_CODE).json();
    }
    return res.status(HTTP_SUCCESS_CODE).json(employees);
  } catch (error) {
    LOG.error('[GET - GET ALL EMPLYOEE Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

router.get('/:empId', async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ where: { id: empId } });
    if (!employee) {
      return res.status(HTTP_NOT_FOUND_CODE).json({
        error: "The requested resource was not found.",
      });
    }
    return res.status(HTTP_SUCCESS_CODE).json(employee);
  } catch (error) {
    LOG.error('[GET - GET EMPLOYEE BY ID] Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

router.delete('/:empId', async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ where: { id: empId } });
    if (!employee) {
      return res.status(HTTP_NOT_FOUND_CODE).json({
        error: "The requested resource was not found.",
      });
    }
    employee.destroy();

    return res.status(HTTP_SUCCESS_CODE).json({ message: 'Resource successfully deleted!' });
  } catch (error) {
    LOG.error('[DELETE - DELETE EMPLOYEE BY ID] Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

router.put('/:empId', validateDto(creaateEmployeeRequestDto), async (req, res) => {
  try {
    const { empId } = req.params;

    const employee = await Employee.findOne({ where: { id: empId } });
    if (!employee) {
      return res.status(HTTP_NOT_FOUND_CODE).json({
        error: "The requested resource was not found.",
      });
    }

    const { firstName, lastName, email, phone, gender, photo } = await req.body;

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.phone = phone;
    employee.gender = gender;
    employee.photo = photo;

    await employee.save();

    return res.status(HTTP_NO_CONTENT_CODE).json();
  } catch (error) {
    LOG.warn('[PUT - UPDATE EMPLOYEE DETAILS] Error: ', error);
    return res.status(HTTP_INTERNAL_SERVER_ERROR_CODE).json({ error: 'Internal server error' });
  }
});

module.exports = router;
