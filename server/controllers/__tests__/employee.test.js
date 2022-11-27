import request from 'supertest';
import app from '../../app';
import { HTTP_SUCCESS_CODE } from '../../constants/httpStatusCodes';

describe('Employee Endpoint GET All Employee Profiles', () => {
    it('should get all employees with status code 200', async () => {
        const response = await request(app).get('/api/employee/');
        expect(response.statusCode).toBe(HTTP_SUCCESS_CODE);
    });
});