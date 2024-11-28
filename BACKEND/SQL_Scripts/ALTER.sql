-- Add a foreign key constraint between the employee and department tables
ALTER TABLE employee
ADD CONSTRAINT fk_employee_department
FOREIGN KEY (department_id)
REFERENCES department(id);

-- Add a foreign key constraint between the user and employee tables
ALTER TABLE user
ADD CONSTRAINT fk_user_employee
FOREIGN KEY (id) -- Assuming the `id` in `user` maps to `id` in `employee`
REFERENCES employee(id);

