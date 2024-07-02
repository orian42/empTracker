--Creates business database
DROP DATABASE IF EXISTS business;
CREATE DATABASE business;

\c business;

--Creates departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR (30)
);

--Creates roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

--Creates employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);