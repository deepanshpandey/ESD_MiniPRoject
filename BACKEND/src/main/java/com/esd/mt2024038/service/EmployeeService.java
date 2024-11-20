package com.esd.mt2024038.service;

import com.esd.mt2024038.model.Department;
import com.esd.mt2024038.model.Employee;
import com.esd.mt2024038.repository.DepartmentRepository;
import com.esd.mt2024038.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Save employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Delete employee by ID
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
