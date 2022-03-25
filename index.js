const inquirer = require('inquirer');
// const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
const pressAnyKey = require('press-any-key');
const Font = require('ascii-art-font');

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
    db.query("SELECT * FROM employees", function (err, results) {
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
      inquirer.prompt([
        {
          type: 'input',
          message: "What is your new Employee's First Name?",
          name: "first_name",
        },
        {
          type: 'input',
          message: "What is your new Employee's First Name?",
          name: "first_name",
        }
       
      ]).then((answers) => {
        var initialize = answers.initialize;
        executeCommand(initialize);
      });

      db.query("SELECT * FROM employees", function (err, results) {
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
        
    // } else if (license === 'GNU GPL v2') {
        

    // } else if (license === 'GNU GPL v3') {
        
    // }
  }
};

// {
//   type: 'input',
//   message: "What would you like your title to be named?",
//   name: "title",
// }