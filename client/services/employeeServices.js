import { isEmpty, isNumber } from 'lodash';
import api from './httpService';

function getAllEmployeeProfiles() {
    return api.employeeApi.get('/', {
        headers: {
            'Content-type': 'application/json',
        },
    })
}

function createEmployeeProfile({ data }) {
    if (isEmpty(data)) { return null; }
    return api.employeeApi.post('/', data)
}

function updateEmployeeProfile({ employeeId, data }) {
    if (isEmpty(employeeId) || isEmpty(data)) { return null; }
    return api.employeeApi.put(`/${employeeId}`, data)
}

function getEmployeeProfile({ employeeId }) {
    if (isEmpty(employeeId)) { return null; }
    return api.employeeApi.get(`/${employeeId}`, {
        headers: {
            'Content-type': 'application/json',
        },
    })
}

function deleteEmployeeProfile({ employeeId }) {
    if (!isNumber(employeeId)) { return null; }
    return api.employeeApi.delete(`/${employeeId}`)
}

function uploadEmployeeProfilePicture({ data }) {
    const formData = new FormData();
    formData.append('photo', data);
    return api.employeeApi.post('/upload', formData)
}

const employeeServices = {
    getAllEmployeeProfiles,
    createEmployeeProfile,
    updateEmployeeProfile,
    getEmployeeProfile,
    deleteEmployeeProfile,
    uploadEmployeeProfilePicture
}

export default employeeServices;