DROP TABLE full_employees;

CREATE TABLE full_employees
AS
SELECT
  employees.id, employees.first_name, employees.last_name, roles.job_title, roles.salary, employees.role_id, manager_id
FROM roles
JOIN employees ON employees.role_id = roles.id;