package com.esd.mt2024038.controller;

import com.esd.mt2024038.model.Department;
import com.esd.mt2024038.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend access from localhost:3000
@RequestMapping("/departments")  // This is the base URL for the controller
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // Endpoint to fetch all departments
    @GetMapping  // This will map to /departments (no need for "/all" if it's the default)
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();  // Fetching all departments from DB
    }
}
