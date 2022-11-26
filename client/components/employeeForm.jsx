import { useState } from "react";
import { useForm } from 'react-hook-form';
import { InputLabel, Box, TextField, MenuItem, CardActions, CardContent, Button, Typography, Paper, } from "@mui/material";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import "yup-phone-lite";
import { isEmpty } from "lodash";

import { ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE, SELECT_GENDERS, SELECT_GENDERS_DEFAULT } from '../constants';
import { employeeServices } from "../services";

export default function EmployeeForm({ onSubmitHandler, employee = {}, submitBtnTitle = ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE }) {

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Firstname is required')
            .min(6, 'Firstname must be at least 6 characters')
            .max(10, 'Firstname must not exceed 10 characters'),
        lastName: Yup.string()
            .required('Lastname is required')
            .min(6, 'Lastname must be at least 6 characters')
            .max(10, 'Lastname must not exceed 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string()
            .required('Phone number is required')
            .phone('LK', 'Please enter a valid phone number'),
        gender: Yup.string()
            .oneOf(['MALE', 'FEMALE'], 'Gender is required'),
        photo: Yup.mixed(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    async function onSubmit(data) {
        if (isSelected) {
            const { data: { uploadPath } } = await employeeServices.uploadEmployeeProfilePicture({ data: selectedFile });
            const updatedData = { ...data, photo: uploadPath };
            onSubmitHandler(updatedData);
        } else {
            const updatedData = { ...employee, ...data };
            onSubmitHandler(updatedData);
        }
    }

    const handleChange = ({ target }) => {
        setSelectedFile(target.files[0]);
        setIsSelected(true);
    };

    return (
        <Paper variant="elevation" elevation={8} sx={{ width: '35%' }}>
            <Box>
                <CardContent>
                    <Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-first-name'}
                            color='primary'
                        >
                            First Name
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>
                            <TextField
                                defaultValue={employee.firstName}
                                variant="filled"
                                required
                                aria-describedby='form-first-name-helper-text'
                                id={'firstName'}
                                {...register('firstName')}
                                error={errors.firstName ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.firstName?.message}
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-last-name'}
                            color='primary'
                        >
                            Last Name
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>

                            <TextField
                                defaultValue={employee.lastName}
                                variant="filled"
                                required
                                aria-describedby='form-last-name-helper-text'
                                id={'lastName'}
                                {...register('lastName')}
                                error={errors.lastName ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.lastName?.message}
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-email'}
                            color='primary'
                        >
                            Email
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>

                            <TextField
                                defaultValue={employee.email}
                                variant="filled"
                                required
                                aria-describedby='form-email-helper-text'
                                id={'email'}
                                {...register('email')}
                                error={errors.lastName ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.email?.message}
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-phone'}
                            color='primary'
                        >
                            Phone
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>
                            <TextField
                                defaultValue={employee.phone}
                                variant="filled"
                                required
                                aria-describedby='form-phone-helper-text'
                                id={'phone'}
                                {...register('phone')}
                                error={errors.phone ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.phone?.message}
                            </Typography>
                        </Box>
                    </Box>
                    <Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-gender'}
                            color='primary'
                        >
                            Gender
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>
                            <TextField
                                defaultValue={employee?.gender || SELECT_GENDERS_DEFAULT.value}
                                select
                                variant="filled"
                                id={'gender'}
                                {...register('gender')}
                                error={errors.gender ? true : false}
                            >
                                {SELECT_GENDERS.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography variant="inherit" color="textSecondary">
                                {errors.gender?.message}
                            </Typography>
                        </Box>
                    </Box>
                    {isEmpty(employee) && (<Box style={{ paddingBlock: '1em' }} display={'flex'} justifyContent='space-between' flexDirection='row' alignContent={'center'} alignItems={'center'}>
                        <InputLabel
                            sx={{ minWidth: '95px' }}
                            required
                            htmlFor={'form-profile-picture'}
                            color='primary'
                        >
                            Profile Picture
                        </InputLabel>
                        <Box sx={{ width: '75%' }} display={'flex'} flexDirection='column'>
                            <input id={'photo'} type={'file'} onChange={handleChange} />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.photo?.message}
                            </Typography>
                        </Box>
                    </Box>)}
                </CardContent>
                <CardActions sx={{ paddingRight: '1em', paddingBottom: '2em', justifyContent: 'flex-end' }} display={'flex'} >
                    <Button onClick={handleSubmit(onSubmit)} variant="outlined" sx={{ width: '100px' }} >{submitBtnTitle}</Button>
                </CardActions>
            </Box>
        </Paper>
    );
}