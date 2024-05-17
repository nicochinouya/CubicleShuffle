-- Drop the existing database if it exists
DROP DATABASE IF EXISTS employee_DB;

-- Create a new database called employee_DB
CREATE DATABASE employee_DB;

-- Use the employee_DB database
USE employee_DB;

-- Create a table called department
-- This table stores information about different departments in the company
CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

-- Create a table called role
-- This table stores information about different roles in the company
-- Each role is associated with a department through the department_id foreign key
CREATE TABLE role(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create a table called employee
-- This table stores information about employees in the company
-- Each employee is associated with a role through the role_id foreign key
-- Each employee can have a manager, which is represented by the manager_id foreign key
CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Retrieve all records from the department table
SELECT * FROM department;

-- Retrieve all records from the role table
SELECT * FROM role;

-- Retrieve all records from the employee table
SELECT * FROM employee;