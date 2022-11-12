import axios from 'axios';
import errorHandler from '../utils/errorHandler';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const employeeApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee`,
  httpsAgent
});

employeeApi.interceptors.response.use(
  response => response,
  error => errorHandler(error),
);

export default {
  employeeApi,
};
