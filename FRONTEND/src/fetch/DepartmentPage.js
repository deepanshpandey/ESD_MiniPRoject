import React, { useState, useEffect } from 'react';
import { fetchDepartments, fetchEmployeesByDepartment, updateEmployee, deleteEmployee } from '../service/DepartmentService';

function DepartmentPage() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                setError("Failed to fetch departments.");
            }
        };
        getDepartments();
    }, []);

    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;
        setSelectedDepartment(departmentId);

        if (departmentId) {
            try {
               
                const employeesData = await fetchEmployeesByDepartment(departmentId);
                setEmployees(employeesData);
                //console.log(employeesData);
                setError("");
            } catch (error) {
                setError("Failed to fetch employees.");
                setEmployees([]);
            }
        } else {
            setEmployees([]);
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    };

    const handleSaveEdit = async (employeeId, updatedFormData) => {
        try {
            const updatedEmployee = await updateEmployee(employeeId, updatedFormData);

            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.employeeId === employeeId ? { ...emp, ...updatedEmployee } : emp
                )
            );

            setEditingEmployee(null);
            setError("");
        } catch (error) {
            setError("Failed to update employee.");
        }
    };

    const handleCancelEdit = () => {
        setEditingEmployee(null);
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeId !== employeeId));
        } catch (error) {
            setError("Failed to delete employee.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Select Department to View Employees</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-4">
                <label className="form-label">Department:</label>
                <select
                    className="form-select"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h3 className="mb-4">Employees</h3>
                {employees.length > 0 ? (
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Photo</th>
                                <th>Employee ID</th>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employeeId}>
                                    <td>
                                        {emp.photoPath ? (
                                            <img
                                                src={emp.photoPath}
                                                alt={`${emp.firstName} ${emp.lastName}`}
                                                className="img-thumbnail"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "25%",
                                                }}
                                                onError={(e) => {
                                                    e.target.src = "/placeholder.png"; // Fallback image
                                                }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{emp.employeeId}</td>
                                    <td>{emp.title}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>
                                        {editingEmployee?.employeeId === emp.employeeId ? (
                                            <EditEmployeeForm
                                                employee={editingEmployee}
                                                onSave={handleSaveEdit}
                                                onCancel={handleCancelEdit}
                                            />
                                        ) : (
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => handleEditClick(emp)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteEmployee(emp.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No employees in this department.</p>
                )}
            </div>
            <div style={{height: "50px"}}></div>
        </div>
    );
}

function EditEmployeeForm({ employee, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        title: employee.title,
        employeeId: employee.employeeId,
        id: employee.id,
        photo: null, // For handling new photo upload
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            photo: file, // Store the uploaded file
        }));
    };

    function refreshTable(){ 
        window.location.reload(); 
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = new FormData();
        updatedFormData.append("firstName", formData.firstName);
        updatedFormData.append("lastName", formData.lastName);
        updatedFormData.append("title", formData.title);
        updatedFormData.append("employeeIdPrefix", formData.employeeIdPrefix);
        updatedFormData.append("employeeIdNumber", formData.employeeIdNumber);
        if (formData.photo) {
            updatedFormData.append("photo", formData.photo);
        }

        try {
            await onSave(employee.id, updatedFormData); // Pass the employeeId and form data to handleSaveEdit
            refreshTable();
        } catch (err) {
            console.log(employee.id);
            console.error("Failed to update employee:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-inline">
            <div className="row mb-3">
                <div className="col-4">
                    <label className="form-label">Employee ID:</label>
                    <select
                        name="employeeIdPrefix"
                        value={formData.employeeIdPrefix}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="N/A">Select</option>
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
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter numeric part"
                    />
                </div>
            </div>
            <div className="mb-3">
            <label className="form-label">Title:</label>
                    <select
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="">Select</option>
                    </select>
            </div>
            <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Photo:</label>
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default DepartmentPage;
