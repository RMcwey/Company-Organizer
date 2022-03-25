const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'initialize',
    message: 'What would you like to do? (Use arrow keys)',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
  },
  {
      type: 'input',
      message: "What would you like your title to be named?",
      name: "title",
  },
]).then((answers) => {
  var initialize = answers.initialize;
  var year = answers.year;
  var licenseCollaborators = answers.licenseCollaborators
  var licenseResults = '';
  var licenseBadge = '';
  executeCommand(answers);
  function generateLicense(answers) {
      if (initialize === 'View All Employees'){
        // sequelize show employees
          licenseBadge = ""

          licenseResults = `Copyright (c) [${year}] [${licenseCollaborators}]
          `;

      } else if (initialize === 'Add Employee') {
        // sequelize but also run new inquirer prompts to gather input.
          licenseBadge = ""

          licenseResults = `

          Copyright [${year}] [${licenseCollaborators}]
          `;
         
      } else if (license === 'GNU GPL v2') {
          licenseBadge = ""

          licenseResults = `Please refer to this link for the GNU General Public Licences https://www.gnu.org/licenses/gpl-2.0.txt
          Copyright (C) [${year}]  [${licenseCollaborators}]
          `;
         
          // console.log(license)
      } else if (license === 'GNU GPL v3') {
          licenseBadge = ""

          licenseResults = `Please refer to this link for the GNU General Public Licences http://www.gnu.org/licenses/gpl-3.0.txt
          Copyright (C) [${year}]  [${licenseCollaborators}]
          `;
          
      }
  }

const generateREADME = ({title, motivation, why, solve, learn, installation, url, collaborators, test, license, year, licenseCollaborators, github, email}, licenseResults) => {
  return `# ${title}

${licenseBadge}

  `;
}
fs.writeFile('sampleREADME.md', generateREADME(answers, licenseResults), (err) =>
  err ? console.error(err) : console.log('README successfully generated!'));
});