package com.esd.mt2024038.service;

import com.esd.mt2024038.model.Employee;
import com.esd.mt2024038.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Save employee with employee_id validation and generation
    public Employee saveEmployee(String prefix, String numericPart, Employee employee) throws Exception {
        String employeeId = prefix + numericPart;

        // Validate uniqueness of employee_id
        if (employeeRepository.findByEmployeeId(employeeId).isPresent()) {
            throw new Exception("Employee ID already exists");
        }

        // Set employee_id and save employee
        employee.setEmployeeId(prefix, numericPart);
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

    // Get employee by employee_id
    public Optional<Employee> getEmployeeByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId);
    }

    // Delete employee by ID
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // Update employee details
    public Employee updateEmployee(Long id, Employee updatedEmployee) throws Exception {
        Optional<Employee> existingEmployeeOpt = employeeRepository.findById(id);
        if (!existingEmployeeOpt.isPresent()) {
            throw new Exception("Employee not found");
        }

        Employee existingEmployee = existingEmployeeOpt.get();

        // Update fields
        existingEmployee.setFirstName(updatedEmployee.getFirstName());
        existingEmployee.setLastName(updatedEmployee.getLastName());
        existingEmployee.setTitle(updatedEmployee.getTitle());
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        existingEmployee.setPhotoPath(updatedEmployee.getPhotoPath());

        return employeeRepository.save(existingEmployee);
    }
}
