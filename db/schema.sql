-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_db;

-- Create a new database
CREATE DATABASE employee_db;

-- Use the newly created database
USE employee_db;

-- Create the department table
-- department: id as PRIMARY KEY, name as VARCHAR(30) to hold department name
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Create the role table
-- role: id as PRIMARY KEY, title as VARCHAR(30) to hold role title, salary as DECIMAL to hold role salary, department_id as INT to hold reference to department role belongs to
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table
-- employee: id as PRIMARY KEY, first_name as VARCHAR(30) to hold employee first name, last_name as VARCHAR(30) to hold employee last name, role_id as INT to hold reference to employee role, manager_id as INT to hold reference to another employee that manages the current employee (null if the employee has no manager)
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);