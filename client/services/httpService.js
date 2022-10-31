import axios from 'axios';
import errorHandler from '../utils/errorHandler';
const employeeApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee`,
});

employeeApi.interceptors.response.use(
  response => response,
  error => errorHandler(error),
);

export default {
  employeeApi,
};
