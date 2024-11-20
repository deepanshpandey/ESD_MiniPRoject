import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import DepartmentPage from "./DepartmentPage";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBuilding, faHome } from '@fortawesome/free-solid-svg-icons';

import Login from './Login';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const handleLogin = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem("isLoggedIn", status);
    };
    const [content, setContent] = useState("Welcome to the IIITB EMS");
    const [paragraphs] = useState([
        { label: "Roll No", value: "MT2024038" },
        { label: "Name", value: "Deepansh Pandey" },
        { label: "Email", value: <a href="mailto:Deepansh.Pandey@iiitb.ac.in">Deepansh.Pandey@iiitb.ac.in</a> },
        { label: "Module", value: "4.2 Employee CRUD"},
        { label: "Description", value: "During registration ask for employee details including photograph(do not save as blob), and the department(Drop Down Selection), also check for department capacity. Assign a unique employee id. Allow modification of all details including employee id, photograph and department."}
    ]);

    return (
        <Router>
            <div>
                {isLoggedIn ? (
                    <div className="App container mt-5">
                        <h1 className="display-4 font-weight-bold text-center mb-4">Employee Management System</h1>
                        <nav className="d-flex justify-content-center mb-4">
                            <Link to="/" className="btn btn-primary mx-2" onClick={() => setContent("Welcome to the IIITB EMS")}>
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                            <Link to="/register" className="btn btn-primary mx-2" onClick={() => setContent("")}>
                                <FontAwesomeIcon icon={faUserPlus} /> Register Employee
                            </Link>
                            <Link to="/department" className="btn btn-primary mx-2" onClick={() => setContent("")}>
                                <FontAwesomeIcon icon={faBuilding} /> View Employees by Department
                            </Link>
                            <button className="btn btn-danger mx-2" onClick={() => handleLogin(false)}>
                            Logout
                            </button>
                        </nav>
                        <hr/>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {content && (
                                    <div className="text-center mb-4">
                                        <h2>{content}</h2>
                                        <table className="table table-bordered">
                                            <tbody>
                                                {paragraphs.map((paragraph, index) => (
                                                    <tr key={index}>
                                                        <th>{paragraph.label}</th>
                                                        <td>{paragraph.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <Routes>
                                    <Route path="/register" element={<EmployeeForm />} />
                                    <Route path="/department" element={<DepartmentPage />} />
                                    <Route path="/" element={<div>{content}</div>} />
                                </Routes>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </Router>
    );
}

export default App;
