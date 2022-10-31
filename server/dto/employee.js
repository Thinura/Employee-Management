const yup = require('yup');
require("yup-phone-lite");

const creaateEmployeeRequestDto = yup.object().shape({
    firstName: yup.string()
        .required('Firstname is required')
        .min(6, 'Firstname must be at least 6 characters')
        .max(10, 'Firstname must not exceed 10 characters'),
    lastName: yup.string()
        .required('Lastname is required')
        .min(6, 'Lastname must be at least 6 characters')
        .max(10, 'Lastname must not exceed 10 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    phone: yup.string()
        .required('Phone number is required')
        .phone('LK', 'Please enter a valid phone number'),
    gender: yup.string()
        .oneOf(['MALE', 'FEMALE'], 'Gender is required'),
    photo: yup.string().required("Photo is required"),
});

module.exports = {
    creaateEmployeeRequestDto,
};
