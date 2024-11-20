package com.esd.mt2024038.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.esd.mt2024038.model.Employee;
import com.esd.mt2024038.repository.EmployeeRepository;
import com.esd.mt2024038.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private Cloudinary cloudinary;

    // Register a new employee
    @PostMapping("/register")
    public String registerEmployee(
            @RequestParam("name") String name,
            @RequestParam("position") String position,
            @RequestParam("departmentId") Long departmentId,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            // Upload photo to Cloudinary if provided
            String photoUrl = null;
            if (photo != null && !photo.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
                photoUrl = (String) uploadResult.get("secure_url");
            }

            // Create new employee object
            Employee employee = new Employee();
            employee.setName(name);
            employee.setPosition(position);
            employee.setPhotoPath(photoUrl); // Save the photo URL in the employee

            // Add employee to department
            departmentService.addEmployeeToDepartment(departmentId, employee);
            return "Employee registered successfully!";
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Photo upload failed");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Get employees by department ID
    @GetMapping("/by-department/{departmentId}")
    public List<Employee> getEmployeesByDepartment(@PathVariable Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    // Update an existing employee's details
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("position") String position,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        return employeeRepository.findById(id).map(employee -> {
            try {
                // Update photo if provided
                if (photo != null && !photo.isEmpty()) {
                    Map uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
                    String photoUrl = (String) uploadResult.get("secure_url");
                    employee.setPhotoPath(photoUrl); // Update the photo URL
                }

                // Update other employee details
                employee.setName(name);
                employee.setPosition(position);
                return employeeRepository.save(employee);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Photo upload failed");
            }
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    // Delete an employee by ID
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found")
        );

        // If the employee has a photo, delete it from Cloudinary
        if (employee.getPhotoPath() != null) {
            try {
                // Extract the public ID from the URL to delete the image from Cloudinary
                String publicId = employee.getPhotoPath().substring(employee.getPhotoPath().lastIndexOf("/") + 1, employee.getPhotoPath().lastIndexOf("."));
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete photo from Cloudinary");
            }
        }

        // Delete the employee from the repository
        employeeRepository.deleteById(id);
        return "Employee deleted successfully!";
    }
}
