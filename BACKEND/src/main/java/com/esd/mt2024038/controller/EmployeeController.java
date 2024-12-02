package com.esd.mt2024038.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.esd.mt2024038.model.Employee;
import com.esd.mt2024038.repository.DepartmentRepository;
import com.esd.mt2024038.repository.EmployeeRepository;
import com.esd.mt2024038.service.DepartmentService;
import com.esd.mt2024038.JwtUtil;  // Ensure you have JwtUtil class to decode the JWT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    @Autowired
    private DepartmentRepository departmentRepository;

    // Utility method to validate JWT and extract username
    private String getUsernameFromJwt(String token) {
        try {
            return JwtUtil.extractUsername(token);  // Ensure JwtUtil handles decoding
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired JWT token");
        }
    }

    // Register a new employee (protected by JWT)
    @PostMapping("/register")
    public String registerEmployee(
            @RequestHeader("Authorization") String authorization,  // Expecting token in Authorization header
            @RequestParam("employeeIdPrefix") String employeeIdPrefix,
            @RequestParam("employeeIdNumber") String employeeIdNumber,
            @RequestParam("firstName") String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam("title") String title,
            @RequestParam("departmentId") Long departmentId,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            String token = authorization.replace("Bearer ", "");
            String username = getUsernameFromJwt(token);  // Validate and extract username from token

            // Create employee ID by combining prefix and number
            String employeeId = employeeIdPrefix + employeeIdNumber;

            // Check if the employee ID already exists
            Optional<Employee> existingEmployee = employeeRepository.findByEmployeeId(employeeId);
            if (existingEmployee.isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee ID already exists");
            }


            // Upload photo to Cloudinary if provided
            String photoUrl = null;
            if (photo != null && !photo.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
                photoUrl = (String) uploadResult.get("secure_url");
            }

            // Create new employee object
            Employee employee = new Employee();
            employee.setEmployeeId(employeeIdPrefix, employeeIdNumber);
            employee.setFirstName(firstName);
            employee.setLastName(lastName);
            employee.setTitle(title);
            employee.setPhotoPath(photoUrl);

            // Add employee to department
            // Check if the department has capacity
            if (departmentService.getEmployeeCountByDepartmentId(departmentId) >= departmentService.getEmployeeCapacityByDepartmentId(departmentId)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department capacity reached");
            }
            departmentService.addEmployeeToDepartment(departmentId, employee);

            return "Employee registered successfully!";
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Photo upload failed");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Get employees by department ID (protected by JWT)
    @GetMapping("/by-department/{departmentId}")
    public List<Employee> getEmployeesByDepartment(
            @RequestHeader("Authorization") String authorization,  // Expecting token in Authorization header
            @PathVariable Long departmentId
    ) {
        try {
            String token = authorization.replace("Bearer ", "");
            getUsernameFromJwt(token);  // Validate token

            return employeeRepository.findByDepartmentId(departmentId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired JWT token");
        }
    }

    // Update an existing employee's details (protected by JWT)
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @RequestHeader("Authorization") String authorization,  // Expecting token in Authorization header
            @PathVariable Long id,
            @RequestParam("employeeIdPrefix") String employeeIdPrefix,
            @RequestParam("employeeIdNumber") String employeeIdNumber,
            @RequestParam("firstName") String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam("title") String title,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            String token = authorization.replace("Bearer ", "");
            getUsernameFromJwt(token);  // Validate token

            return employeeRepository.findById(id).map(employee -> {
                try {
                    // Combine the prefix and number to form the new employee ID
                    String employeeId = employeeIdPrefix + employeeIdNumber;

                    // Check if the new employee ID already exists
                    if (!employee.getEmployeeId().equals(employeeId) && employeeRepository.findByEmployeeId(employeeId).isPresent()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee ID already exists");
                    }

                    // Update employee details
                    employee.setEmployeeId(employeeIdPrefix, employeeIdNumber);
                    employee.setFirstName(firstName);
                    employee.setLastName(lastName);
                    employee.setTitle(title);

                    // Update photo if provided
                    if (photo != null && !photo.isEmpty()) {
                        Map uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
                        String photoUrl = (String) uploadResult.get("secure_url");
                        employee.setPhotoPath(photoUrl);
                    }

                    return employeeRepository.save(employee);
                } catch (IOException e) {
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Photo upload failed");
                }
            }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired JWT token");
        }
    }

    // Delete an employee by ID (protected by JWT)
    @DeleteMapping("/{id}")
    public String deleteEmployee(
            @RequestHeader("Authorization") String authorization,  // Expecting token in Authorization header
            @PathVariable Long id
    ) {
        try {
            String token = authorization.replace("Bearer ", "");
            getUsernameFromJwt(token);  // Validate token

            Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found")
            );

            // If the employee has a photo, delete it from Cloudinary
            if (employee.getPhotoPath() != null) {
                try {
                    String publicId = employee.getPhotoPath().substring(employee.getPhotoPath().lastIndexOf("/") + 1, employee.getPhotoPath().lastIndexOf("."));
                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                } catch (IOException e) {
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete photo from Cloudinary");
                }
            }

            // Delete the employee from the repository
            employeeRepository.deleteById(id);
            return "Employee deleted successfully!";
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired JWT token");
        }
    }
}
