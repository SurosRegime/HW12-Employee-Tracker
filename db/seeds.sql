INSERT INTO department (name)
VALUES 
('Production'), 
('Operations'), 
('Legal'), 
('Information Technology'), 
('Management'), 
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
('Engineer', 100000, 1), 
('Accountant', 90000, 2), 
('Lawyer', 90000, 3), 
('IT Specialist', 70000, 4), 
('Project Manager', 120000, 5), 
('Telemarketer', 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Marie', 'Curie', 1, NULL),
('George','Washington', 2, 1),
('Bruce', 'Banner', 3, 2),
('Ron', 'Swanson', 4, NULL),
('John', 'Marston', 5, 4)