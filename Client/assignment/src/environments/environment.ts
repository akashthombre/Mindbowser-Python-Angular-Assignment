const baseUrl = 'http://localhost:8000/api/';

export const environment = {
  production: false,
  login: baseUrl + 'login/',
  validate_user: baseUrl + 'validate/user',
  managerSignUp : baseUrl + 'register-manager/',
  getAllEmployees : baseUrl + 'employee-list/',
  createEmployee : baseUrl + 'create-employee/',
  updateEmployee : baseUrl + 'update-employee/',
  deleteEmployeeById : baseUrl + 'delete-employee/',
};
