const yup = require('yup');

const creaateEmployeeRequestDto = yup.object().shape({
    firstName: yup.string().min(6).max(10).required(),
    lastName: yup.string().min(6).max(10).required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
    gender: yup.string().required(),
});

module.exports = {
    creaateEmployeeRequestDto,
};
