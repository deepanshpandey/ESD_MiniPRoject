-- Insert data into the department table
INSERT INTO department (id, name, capacity) VALUES
(1, 'Admissions', 50),
(2, 'Faculty', 100),
(3, 'Placement', 10);

-- Insert data into the employee table
INSERT INTO employee (id, employee_id, first_name, last_name, department_id, title, photo_path) VALUES
(1, 'EMP001', 'John', 'Doe', 1, 'Mr.', '/photos/john_doe.jpg'),
(2, 'EMP002', 'Jane', 'Smith', 1, 'Ms.', '/photos/jane_smith.jpg'),
(3, 'EMP003', 'Bob', 'Johnson', 2, 'Mr.', '/photos/bob_johnson.jpg'),
(4, 'EMP004', 'Alice', 'Williams', 2, 'Ms.', '/photos/alice_williams.jpg'),
(5, 'EMP005', 'Charlie', 'Brown', 3, 'Mr.', '/photos/charlie_brown.jpg');

-- Insert data into the user table
--ALTHOUGH NOT IN USE in the current Project
INSERT INTO user (id, username, password, role) VALUES
(1, 'john_doe', 'password123', 'admin'),
(2, 'jane_smith', 'password456', 'staff'),
(3, 'bob_johnson', 'password789', 'staff'),
(4, 'alice_williams', 'password101', 'faculty'),
(5, 'charlie_brown', 'password102', 'student');

