INSERT INTO departments (department_name)
VALUES
  ("Sales"),
  ("Managment"),
  ("Customer Service"),
  ("C-suite");

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ("Sales Rep", 40000, 1),
  ("Sales Specialist", 60000, 1),
  ("Sales Manager", 75000, 2),
  ("Customer Service Rep", 30000, 3),
  ("CEO", 150000, 4),
  ("CFO", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Ross", "Mcwey", 1, NULL),
  ("John", "Jacob", 1, 1);
