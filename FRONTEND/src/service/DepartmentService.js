import axios from "axios";

const API_URL = "http://localhost:8081";

// Function to get JWT token from localStorage or any other secure storage
const getAuthToken = () => {
    return localStorage.getItem("jwtToken");  // Or wherever you store the token
};

// Function to handle unauthorized errors (you can modify this based on your application needs)
const handleUnauthorized = () => {
    // Optionally, redirect to login page or show an error
    alert("Unauthorized! Please log in again.");
    window.location.href = "/login";  // Redirect to login page (or your preferred page)
};

// Fetch departments
export const fetchDepartments = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            handleUnauthorized();
            return;
        }

        const response = await axios.get(`${API_URL}/departments`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        }
        throw error;
    }
};

// Fetch employees by department ID
export const fetchEmployeesByDepartment = async (departmentId) => {
    try {
        const token = getAuthToken();
        if (!token) {
            handleUnauthorized();
            return;
        }

        const response = await axios.get(`${API_URL}/employees/by-department/${departmentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        }
        throw error;
    }
};

// Update employee details
export const updateEmployee = async (employeeId, formData) => {
    try {
        const token = getAuthToken();
        if (!token) {
            handleUnauthorized();
            return;
        }

        const response = await axios.put(`${API_URL}/employees/${employeeId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Important for file uploads
                'Authorization': `Bearer ${token}`,   // Add the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        }
        throw error;
    }
};

// Register a new employee
export const registerEmployee = async (employee) => {
    try {
        const token = getAuthToken();
        if (!token) {
            handleUnauthorized();
            return;
        }

        const response = await axios.post(`${API_URL}/employees/register`, employee, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        }
        throw error;
    }
};

// Delete employee by ID
export const deleteEmployee = async (employeeId) => {
    try {
        const token = getAuthToken();
        if (!token) {
            handleUnauthorized();
            return;
        }

        const response = await axios.delete(`${API_URL}/employees/${employeeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        }
        throw error;
    }
};
