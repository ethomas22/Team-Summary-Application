const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeCount = [{
    type: 'input',
    message: 'How many employees do you have?',
    name: 'employeeCount'
},
]
const managerQuestions = [{
    type: 'input',
    message: 'What is your office number?',
    name: 'officeNumber'

},
]

const employeeQuestions = [{
    type: 'input',
    message: 'What is your role?',
    name: 'role'
},

{
    type: 'input',
    message: 'What is your name?',
    name: 'name'
},

{
    type: 'input',
    message: 'What is your id?',
    name: 'id'
},

{
    type: 'input',
    message: 'What is your email?',
    name: 'email'
},
]

const internQuestions = [{
    type: 'input',
    message: 'What is the name of your school? ',
    name: 'school'
},
]

const engineerQuestions = [{
    type: 'input',
    message: 'What is the name of your github username? ',
    name: 'github'
},
]
var employeeData = []
inquirer
        .prompt(employeeCount)
        .then(async function (data) {
            for (let i = 0; i < data.employeeCount; i++) {
                await inquirer
                .prompt(employeeQuestions)
                .then(async function (employee){
                    if (employee.role.toLowerCase() === "manager") {
                        await inquirer
                        .prompt(managerQuestions)
                        .then(function (officeNumber){
                            employeeData .push (new Manager (employee.name, employee.id, employee.email, officeNumber.officeNumber)) 
                        })
                    } else if (employee.role.toLowerCase()=== "engineer") {     
                        await inquirer
                        .prompt(engineerQuestions)
                        .then(function (gitHub){
                            employeeData .push (new Engineer (employee.name, employee.id, employee.email, gitHub.github))
                        })
                    } else if (employee.role.toLowerCase() === "intern"){
                        await inquirer
                        .prompt(internQuestions)
                        .then(function (school){
                            employeeData .push (new Intern (
                                employee.name, employee.id, employee.email, school.school
                            ))
                        })
                        
                    }
                })

            }
            writeToFile (render(employeeData))
        })

        async function writeToFile (employeeHtml) {
            if (!fs.existsSync(OUTPUT_DIR)) {
                await fs.promises.mkdir(OUTPUT_DIR).catch(console.error);
            }
                fs.writeFile(outputPath, employeeHtml, (err) => {
                    if (err) throw err;
                });
        }


