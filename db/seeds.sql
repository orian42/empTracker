--Seeds for departments table
INSERT INTO departments (id, name) VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

--Seeds for roles table
INSERT INTO roles (id, title, salary, dept_id) VALUES
(101, 'Salesperson', 80000, 1),
(102, 'Lead Engineer', 150000, 2),
(103, 'Software Engineer', 120000, 2),
(104, 'Account Manager', 160000, 3),
(105, 'Accountant', 125000, 3),
(106, 'Legal Team Lead', 250000, 4),
(107, 'Lawyer', 190000, 4);

--Seeds for employees table
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
(1001, 'Mike', 'Chan', 101, 1002),
(1002, 'Ashley', 'Rodriguez', 102, null), 
(1003, 'Kevin', 'Tupik', 103, 1002),
(1004, 'Kunal', 'Singh', 104, null),
(1005, 'Malia', 'Brown', 105, 1004),
(1006, 'Sarah', 'Lourde', 106, null),
(1007, 'Tom', 'Allen', 107, 1006);