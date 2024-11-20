import React, { useState, useEffect } from 'react';
import { registerEmployee, fetchDepartments } from './DepartmentService';

function EmployeeForm() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        departmentId: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch departments on component mount
    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        loadDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = new FormData();
        employeeData.append("name", formData.name);
        employeeData.append("position", formData.position);
        employeeData.append("departmentId", formData.departmentId);
        if (selectedFile) employeeData.append("photo", selectedFile);

        try {
            await registerEmployee(employeeData);
            alert("Employee registered successfully!");
            // Clear the form after successful registration
            setFormData({
                name: "",
                position: "",
                departmentId: "",
                photo: null,
            });
            setSelectedFile(null);
        } catch (error) {
            console.error("Error registering employee:", error);
            alert("Failed to register employee.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="mb-4 text-center">Register Employee</h2>
            <div className="mb-3">
                <label className="form-label">Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter employee name"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Position:</label>
                <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Enter employee position"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Department:</label>
                <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                >
                    <option value="">Select a department</option>
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
}

export default EmployeeForm;
