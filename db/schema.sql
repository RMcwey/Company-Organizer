DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(100) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (role_id) 
  REFERENCES roles(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);

CREATE TABLE full_employees
AS
SELECT
  employees.id, employees.first_name, employees.last_name, roles.job_title, roles.salary, employees.role_id, manager_id
FROM roles
JOIN employees ON employees.role_id = roles.id;