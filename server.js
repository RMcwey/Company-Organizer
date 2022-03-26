const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'TentTree@3',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Create a movie
app.post('/api/new-movie', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// BONUS: Update review name
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


CURENT CODE 
const inquirer = require('inquirer');
// const fs = require('fs');
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
       

      console.log(rolesArr);
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
          choices: mgmtArr,
        },
      ]).then((answers) => {
        console.log(answers);
        let newFName = answers.first_name
        let newLName = answers.last_name
        let newRole = answers.roles
        let newManager = answers.managers 
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${newFName}", "${newLName}", (SELECT id FROM roles WHERE job_title = "${newRole}"), null)`, function (err, results) {
        if (err) {
        console.log(err)
        return;
        } else {
        console.log("new employee added!")
        pressAnyKey("Press any key to continue", {
          ctrlC: "reject"
        })
          .then(() => {
            mainOptions();
          })
          .catch(() => {
            console.log('You pressed CTRL+C')
          })
        return
      }
      })
      });
    }
    });
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
  }
};

// {
//   type: 'input',
//   message: "What would you like your title to be named?",
//   name: "title",
// }

db.query(`SELECT id FROM employees WHERE first_name = "${mFName}" and last_name = "${mLName}"`), function (err, results) {
  if (err) {
    console.log(err)
    return;
  } else {
    theTits = results
  }
}