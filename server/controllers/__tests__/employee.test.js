import request from 'supertest';
import app from '../../app';
import { HTTP_FORBIDDEN_CODE, HTTP_NOT_FOUND_CODE, HTTP_NO_CONTENT_CODE, HTTP_RESOURCE_CREATED_CODE, HTTP_SUCCESS_CODE } from '../../constants/httpStatusCodes';
import { sequelize } from '../../models';

describe('[GET] Get All Employee Profiles - /api/employee', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    it('should get all employees with status code 204 when employee is empty', async () => {
        const response = await request(app).get('/api/employee');
        expect(response.statusCode).toBe(HTTP_NO_CONTENT_CODE);
    });

    describe('With New Employee Profile',()=>{
        beforeAll(async ()=>{
            const requestBody = {
                "firstName": "Thinura",
                "lastName": "kumarasing",
                "email": "thinu@de1v.co",
                "phone": "0768760449",
                "gender": "MALE",
                "photo": "uploads/d975d6e6bd906dab.jpg"
            }
            await request(app).post('/api/employee').send(requestBody);
        });
        it('should get all employees with status code 200', async ()=>{
            const response = await request(app).get('/api/employee');
            expect(response.statusCode).toBe(HTTP_SUCCESS_CODE);
        })
    })
    
});

describe('[POST] Create Employee Profile - /api/employee', () => {
    const requestBody = {
        "firstName": "Thinura",
        "lastName": "kumarasing",
        "email": "thinu@de1v.co",
        "phone": "0768760449",
        "gender": "MALE",
        "photo": "uploads/d975d6e6bd906dab.jpg"
    }

    describe('Success Responses', ()=>{
        beforeEach(async () => {
            await sequelize.sync({ force: true });
        });

        it('should create employee with status code 201', async () => {
            const response = await request(app).post('/api/employee').send(requestBody);
            expect(response.statusCode).toBe(HTTP_RESOURCE_CREATED_CODE);
        });
    
        it('should create employee response has user id', async () => {
            const response = await request(app).post('/api/employee').send(requestBody);
            expect(response.body.id).toBeDefined()
        });
    });

    describe('Error Responses', ()=>{
        beforeAll(async ()=>{
            await sequelize.sync({ force: true });
            const requestBody = {
                "firstName": "Thinura",
                "lastName": "kumarasing",
                "email": "thinu@de1v.co",
                "phone": "0768760449",
                "gender": "MALE",
                "photo": "uploads/d975d6e6bd906dab.jpg"
            }
            await request(app).post('/api/employee').send(requestBody);
        });
        it('should respond with status code 403', async ()=>{
            const response = await request(app).post('/api/employee').send(requestBody);
            expect(response.statusCode).toBe(HTTP_FORBIDDEN_CODE);
        });
        it('should respond with error object', async ()=>{
            const response = await request(app).post('/api/employee').send(requestBody);
            expect(response.error).toBeDefined();
        });
    });
});

async function createEmployee(){
    const requestBody = {
        "firstName": "Thinura",
        "lastName": "kumarasing",
        "email": "thinu@de1v.co",
        "phone": "0768760449",
        "gender": "MALE",
        "photo": "uploads/d975d6e6bd906dab.jpg"
    }
    return request(app).post('/api/employee').send(requestBody);
}

async function getNewEmployeeId() {
    const response = await createEmployee();
    return response.body.id;
}

describe('[GET] Get Employee Profile By Id - /api/employee/:empId', () => {
    
    describe('Success Responses',  ()=>{
        
        beforeEach(async ()=>{
            await sequelize.sync({ force: true });
        });
        
        it('should get employee profile with status code 200', async () => {
            const employeeId = await getNewEmployeeId();
            const requestUrl = `/api/employee/${employeeId}`
            const response = await request(app).get(requestUrl);
            expect(response.statusCode).toBe(HTTP_SUCCESS_CODE);
        });
    
        it('should get employee profile response has user id', async () => {
            const employeeId = await getNewEmployeeId();
            const requestUrl = `/api/employee/${employeeId}`

            const response = await request(app).get(requestUrl);
            expect(response.body.id).toBeDefined()
        });
    });

    describe('Error Responses', ()=>{
        let employeeId = '21';
        const requestUrl = `/api/employee/${employeeId}`

        beforeAll(async ()=>{
            await sequelize.sync({ force: true });
            const requestBody = {
                "firstName": "Thinura",
                "lastName": "kumarasing",
                "email": "thinu@de1v.co",
                "phone": "0768760449",
                "gender": "MALE",
                "photo": "uploads/d975d6e6bd906dab.jpg"
            }
            await request(app).post('/api/employee').send(requestBody);
           
        });

        it('should respond with status code 404', async ()=>{
            const response = await request(app).get(requestUrl);
            expect(response.statusCode).toBe(HTTP_NOT_FOUND_CODE);
        });
        it('should respond with error object', async ()=>{
            const response = await request(app).get(requestUrl);
            expect(response.error).toBeDefined();
        });
    });
});

describe('[DELETE] Get Employee Profile By Id - /api/employee/:empId', () => {
    
    describe('Success Responses', ()=>{
        beforeEach(async ()=>{
            await sequelize.sync({ force: true });
        });
        it('should delete employee profile with status code 200', async () => {
            const employeeId = await getNewEmployeeId();
            const requestUrl = `/api/employee/${employeeId}`
            const response = await request(app).delete(requestUrl);
            expect(response.statusCode).toBe(HTTP_SUCCESS_CODE);
        });
    
        it('should delete employee profile response has user id', async () => {
            const employeeId = await getNewEmployeeId();
            const requestUrl = `/api/employee/${employeeId}`
            const response = await request(app).delete(requestUrl);
            expect(response.body.message).toBeDefined()
        });
    });

    describe('Error Responses', ()=>{
        let employeeId = '21';
        const requestUrl = `/api/employee/${employeeId}`

        beforeAll(async ()=>{
            await sequelize.sync({ force: true });
        });

        it('should delete employee profile respond with status code 404', async ()=>{
            const response = await request(app).delete(requestUrl);
            expect(response.statusCode).toBe(HTTP_NOT_FOUND_CODE);
        });
        it('should delete employee profile respond with error object', async ()=>{
            const response = await request(app).delete(requestUrl);
            expect(response.error).toBeDefined();
        });
    });
});