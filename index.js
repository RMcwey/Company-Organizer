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

      // db.query("SELECT SELECT id FROM roles WHERE job_title = ")

      
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
      });
    };
      // this is else for initialize
    }
  // this is execute funtion.
};

// {
//   type: 'input',
//   message: "What would you like your title to be named?",
//   name: "title",
// }

      // db.query("SELECT * FROM employees", function (err, results) {
      //   if (err) {
      //   console.log(err)
      //   return;
      //   } else {
      //     let employeesTable = cTable.getTable(results) 
      //     console.log(employeesTable);
      //     pressAnyKey("Press any key to continue", {
      //       ctrlC: "reject"
      //     })
      //       .then(() => {
      //         mainOptions();
      //       })
      //       .catch(() => {
      //         console.log('You pressed CTRL+C')
      //       })
      //   }
      // });
        
    // } else if (license === 'GNU GPL v2') {
        

    // } else if (license === 'GNU GPL v3') {
        
    // }