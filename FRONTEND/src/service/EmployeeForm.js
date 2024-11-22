import React, { useState, useEffect } from 'react';
import { registerEmployee, fetchDepartments } from './DepartmentService';

function EmployeeForm() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        employeeIdPrefix: "EMP",
        employeeIdNumber: "",
        firstName: "",
        lastName: "",
        title: "",
        departmentId: "",
        photo: ""
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
        const employeeId = formData.prefix + formData.numericPart;
        const payload = { ...formData, employeeId };
        const employeeData = new FormData();
        Object.keys(payload).forEach(key => employeeData.append(key, payload[key]));
        if (selectedFile) employeeData.append("photo", selectedFile);

    try {
        await registerEmployee(employeeData);
        alert("Employee registered successfully!");
        // Clear the form after successful registration
        setFormData({
            employeeIdPrefix: "EMP",
            employeeIdNumber: "",
            firstName: "",
            lastName: "",
            title: "",
            departmentId: "",
            photo: ""
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
            <div className="row mb-3">
                <div className="col-2">
                    <label className="form-label">Employee ID:</label>
                    <select
                        name="employeeIdPrefix"
                        value={formData.employeeIdPrefix}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="EMP">EMP</option>
                        <option value="FAC">FAC</option>
                        <option value="NTS">NTS</option>
                    </select>
                </div>
                <div className="col">
                    <label className="form-label">ㅤ</label>
                    <input
                        type="text"
                        name="employeeIdNumber"
                        value={formData.employeeIdNumber}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        placeholder="Enter numeric part"
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-2">
                    <label className="form-label">Title:</label>
                    <select
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="">Select</option>
                    </select>
                </div>
                <div className="col-5">
                    <label className="form-label">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        placeholder="Enter first name"
                    />
                </div>
                <div className="col">
                    <label className="form-label">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter last name"
                    />
                </div>
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
