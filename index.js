const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const pressAnyKey = require('press-any-key');
const Font = require('ascii-art-font');

let roles = ""
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TentTree@3',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

Font.create('Company   Organizer', 'Doom', function(err, result) {
  if (err) {
    console.log(err)
      return;
  } else {
  console.log(result);
  mainOptions()
  }
});

function updateFullEmployees() {
  db.query(`DROP TABLE full_employees;`);
  db.query(`CREATE TABLE full_employees SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, roles.salary, employees.role_id, manager_id FROM roles JOIN employees ON employees.role_id = roles.id;`)
}

function mainOptions () {
inquirer.prompt([
  {
    type: 'rawlist',
    name: 'initialize',
    message: 'What would you like to do? (Use arrow keys)',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
  },
 
]).then((answers) => {
  var initialize = answers.initialize;
  executeCommand(initialize);
});
}

function executeCommand(initialize) {
  if (initialize === 'View All Employees') {
    // sequelize show employees
    // const sql = "SELECT * FROM employees",;
    db.query("SELECT * FROM full_employees", function (err, results) {
      if (err) {
      console.log(err)
      return;
      } else {
        let employeesTable = cTable.getTable(results) 
        console.log(employeesTable);
        pressAnyKey("Press any key to continue", {
          ctrlC: "reject"
        })
          .then(() => {
            mainOptions();
          })
          .catch(() => {
            console.log('You pressed CTRL+C')
          })
      }
    });

    } else if (initialize === 'Add Employee') {
      // var rolesArr = [];
      getEmployeeInfo();
      function getEmployeeInfo () {
      db.query("SELECT job_title FROM roles", function (err, results) {
        if (err) {
        console.log(err)
        return;
        } else {
          roles = results;
          var rolesArr = []

          for (let i = 0; i < roles.length; i++) {
            rolesArr[i] = roles[i].job_title
            
          }
          db.query(" SELECT first_name, last_name FROM employees", function (err, mResults) {
            if (err) {
            console.log(err)
            return;
            } else {
              managers = mResults;
              // managers = namesR.first_name + namesR.last_name
              console.log(managers)
              
              var managerArr = []
    
              for (let i = 0; i < managers.length; i++) {
                managerArr[i] = managers[i].first_name + " " + managers[i].last_name
              }
            }
            addNewEmployee(rolesArr, managerArr)
          })
          // addNewEmployee(rolesArr)
        };
      });  

      // this is getnew info function bracket. 
    };
      
      function addNewEmployee(rolesArr, managerArr) {
        console.log(rolesArr, managerArr);
      inquirer.prompt([
        {
          type: 'input',
          message: "What is your new Employee's First Name?",
          name: "first_name",
        },
        {
          type: 'input',
          message: "What is your new Employee's Last Name?",
          name: "last_name",
        },
        {
          type: 'rawlist',
          name: 'roles',
          message: "What is the employee's role? (Use arrow keys)",
          choices: rolesArr,
        },
        {
          type: 'rawlist',
          name: 'managers',
          message: "Who is the employee's manager? (Use arrow keys)",
          choices: managerArr,
        },
      ]).then((answers) => {
        console.log(answers);
        let newFName = answers.first_name
        let newLName = answers.last_name
        let newRole = answers.roles
        let newManager = answers.managers 
        let themang = newManager.split(' ')
        let mFName= themang[0]
        let mLName= themang[1]
        // console.log(mFName)       
        // console.log(mLName)
        updateFullEmployees();
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${newFName}", "${newLName}", (SELECT id FROM roles WHERE job_title = "${newRole}"), (SELECT id from full_employees where first_name = '${mFName}' and last_name='${mLName}'))`, function (err, results) {
          if (err) {
          console.log(err)
          return;
          } else {
          console.log("new employee added!")
          pressAnyKey("Press any key to continue", {
            ctrlC: "reject"
          }).then(() => {
              
              mainOptions();
            })
            .catch(() => {
              console.log('You pressed CTRL+C')
            })
          return
          };
        });
      
        // first db bracket
      
      });
    };
// this is else for adding employee
    } else if (initialize === "Update Employee Role") {
      getEmployeeInfoAgain();
      function getEmployeeInfoAgain () {
        db.query("SELECT job_title FROM roles", function (err, results) {
          if (err) {
          console.log(err)
          return;
          } else {
            roles = results;
            var rolesArr = []

            for (let i = 0; i < roles.length; i++) {
              rolesArr[i] = roles[i].job_title
              
            }
            db.query(" SELECT first_name, last_name FROM employees", function (err, mResults) {
              if (err) {
              console.log(err)
              return;
              } else {
                managers = mResults;
                // managers = namesR.first_name + namesR.last_name
                console.log(managers)
                
                var managerArr = []
      
                for (let i = 0; i < managers.length; i++) {
                  managerArr[i] = managers[i].first_name + " " + managers[i].last_name
                }
              }
              updateEmployeeRole(managerArr, rolesArr)
              // this is the end of the 2nd db query
            })
            // this is first else in first db query
          };
          // this is first db query
        });  

        // this is the function container
      }
      function updateEmployeeRole(managerArr, rolesArr) {
        console.log(managerArr, rolesArr);
      inquirer.prompt([
        {
          type: 'rawlist',
          name: 'employees',
          message: "Which employee would you like to update? (Use arrow keys)",
          choices: managerArr,
        },
        {
          type: 'rawlist',
          name: 'roles',
          message: "What is the new role? (Use arrow keys)",
          choices: rolesArr,
        },
      ]).then((answers) => {
        console.log(answers);
        let updateRole = answers.roles;
        let updateEmployee = answers.employees;
        let theEmp = updateEmployee.split(' ');
        let eFName= theEmp[0];
        let eLName= theEmp[1];
        db.query(`UPDATE employees SET role_id = (SELECT id FROM roles WHERE job_title = "${updateRole}") WHERE id = (SELECT id from full_employees where first_name = '${eFName}' and last_name='${eLName}')`, function (err, results) {
          if (err) {
          console.log(err)
          return;
          } else {
          updateFullEmployees();
          console.log("Employee Role Updated!")
          pressAnyKey("Press any key to continue", {
            ctrlC: "reject"
          }).then(() => {
              mainOptions();
            })
            .catch(() => {
              console.log('You pressed CTRL+C')
            })
          return
          };
        });
        // then bracket
      });
    };
      // this is else for initialize
    } else if (initialize === "View All Roles") {
      db.query("SELECT * FROM roles", function (err, results) {
        if (err) {
        console.log(err)
        return;
        } else {
          let rolesTable = cTable.getTable(results) 
          console.log(rolesTable);
          pressAnyKey("Press any key to continue", {
            ctrlC: "reject"
          })
            .then(() => {
              mainOptions();
            })
            .catch(() => {
              console.log('You pressed CTRL+C')
            })
        }
      });
      // this is else bracket
    } else if (initialize === "Add Role") {
      getRoleInfo();
      function getRoleInfo () {
      db.query("SELECT department_name FROM departments", function (err, results) {
        if (err) {
        console.log(err)
        return;
        } else {
          departments = results;
          var departmentsArr = []

          for (let i = 0; i < departments.length; i++) {
            departmentsArr[i] = departments[i].department_name
            
          }
            addRole(departmentsArr)
          // this is else
        };
        // this is db
      });
      // this is function
    };
      // this is getnew info function bracket. 
    


      function addRole(departmentsArr) {
        // console.log(managerArr, rolesArr);
      inquirer.prompt([
        {
          type: 'input',
          name: 'role',
          message: "What is the role you would like to add?",
        },
        {
          type: 'input',
          name: 'salary',
          message: "How much will this role make?",
        },
        {
          type: 'rawlist',
          name: 'department',
          message: "Which department does this role belong to? (Use arrow keys)",
          choices: departmentsArr,
        },     
      ]).then((answers) => {
        console.log(answers);
        let role = answers.role;
        let salary = answers.salary;
        let department = answers.department;
      //   let updateRole = answers.roles;
      //   let updateEmployee = answers.employees;
      //   let theEmp = updateEmployee.split(' ');
      //   let eFName= theEmp[0];
      //   let eLName= theEmp[1];
        db.query(`INSERT INTO roles (job_title, salary, department_id) VALUES ("${role}", "${salary}", (SELECT id FROM departments WHERE department_name = "${department}"))`, function (err, results) {
          if (err) {
          console.log(err)
          return;
          } else {
          updateFullEmployees();
          console.log("Role Added!")
          pressAnyKey("Press any key to continue", {
            ctrlC: "reject"
          }).then(() => {
              mainOptions();
            })
            .catch(() => {
              console.log('You pressed CTRL+C')
            })
          return
          };
        });
      //   // then bracket
      });
      // this is function
    }
    // this is the else bracket
  } else if (initialize === "View All Departments") {
    db.query("SELECT * FROM departments", function (err, results) {
      if (err) {
      console.log(err)
      return;
      } else {
        let departmentsTable = cTable.getTable(results) 
        console.log(departmentsTable);
        pressAnyKey("Press any key to continue", {
          ctrlC: "reject"
        })
          .then(() => {
            mainOptions();
          })
          .catch(() => {
            console.log('You pressed CTRL+C')
          })
      }
    });
  // this is execute funtion.
  } else if (initialize === "Add Department") {
      addDepartment()
      function addDepartment() {
        // console.log(managerArr, rolesArr);
      inquirer.prompt([
        {
          type: 'input',
          name: 'department',
          message: "What is the name of the new department?",
        },
      ]).then((answers) => {
        console.log(answers);
        let department = answers.department;
        db.query(`INSERT INTO departments (department_name) VALUES ("${department}")`, function (err, results) {
          if (err) {
          console.log(err)
          return;
          } else {
          updateFullEmployees();
          console.log("Department Added!")
          pressAnyKey("Press any key to continue", {
            ctrlC: "reject"
          }).then(() => {
              mainOptions();
            })
            .catch(() => {
              console.log('You pressed CTRL+C')
            })
          return
          };
        });
      //   // then bracket
      });
      // this is function
      }
    // this is the else bracket
  } else if (initialize === "Quit") {
    return console.log('You have exited the program. Thank you for using Company Organizer! Enter ctrl + c to exit, then enter node index to run again')
  }
}
