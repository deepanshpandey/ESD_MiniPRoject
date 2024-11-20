package com.esd.mt2024038.service;

import com.esd.mt2024038.model.Department;
import com.esd.mt2024038.model.Employee;
import com.esd.mt2024038.repository.DepartmentRepository;
import com.esd.mt2024038.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Department addEmployeeToDepartment(Long departmentId, Employee employee) throws Exception {
        Optional<Department> deptOptional = departmentRepository.findById(departmentId);

        if (!deptOptional.isPresent()) {
            throw new Exception("Department not found");
        }

        Department department = deptOptional.get();

        if (department.getEmployees().size() >= department.getCapacity()) {
            throw new Exception("Department capacity reached");
        }

        employee.setDepartment(department);
        department.getEmployees().add(employee);
        employeeRepository.save(employee);

        return departmentRepository.save(department);
    }
}
