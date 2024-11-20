import axios from "axios";

const API_URL = "http://localhost:8081";

// Fetch departments
export const fetchDepartments = async () => {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data;
};

// Fetch employees by department ID
export const fetchEmployeesByDepartment = async (departmentId) => {
    const response = await axios.get(`${API_URL}/employees/by-department/${departmentId}`);
    return response.data;
};

// Update employee details
export const updateEmployee = async (employeeId, formData) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${employeeId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Register a new employee
export const registerEmployee = async (employee) => {
    const response = await axios.post(`${API_URL}/employees/register`, employee);
    return response.data;
};
// Delete employee by ID
export const deleteEmployee = async (employeeId) => {
    const response = await axios.delete(`${API_URL}/employees/${employeeId}`);
    return response.data;
};
