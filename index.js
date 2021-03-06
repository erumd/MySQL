//used SQL activities from class

const { questions, department, role, employee } = require("./questions"); //not sure if I did this part right
require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, //sql port i
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "team_db",
});

//class activity Great Bay
function whatToDo() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "What do you want to do?",
        choices: [
          "Add Role",
          "Add Department",
          "Add Employee",
          "View Department",
          "View Role",
          "View Employees",
          "Update Role",
          "Done",
        ],
      },
    ])

    .then((answers) => {
      if (answers.main === "View Department") {
        viewDepartment();
        whatToDo();
      } else if (answers.main === "View Role") {
        viewRole();
        whatToDo();
      } else if (answers.main === "View Employees") {
        viewEmployee();
        whatToDo();
      } else if (answers.main === "Add Employees") {
        addEmployee();
        whatToDo();
      } else if (answers.main === "Add Department") {
        addDepartment;
        whatToDo();
      } else if (answers.main === "Add Role") {
        addRole;
        whatToDo();
      } else if (answers.main === "Update Role") {
        updateRole;
        whatToDo();
      }
    });
}

whatToDo(); //have to call, duh!

console.log("What to do function works", whatToDo);

function viewDepartment() {
  const queryDepartment = "SELECT * FROM department";
  connection.query(queryDepartment, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

// const viewRole = () => {};
function viewRole() {
  const queryRole = "SELECT * FROM role";
  connection.query(queryRole, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function viewEmployee() {
  const queryEmployee = "SELECT * FROM employee";
  connection.query(queryEmployee, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

// const viewEmployee = () => {};

function addEmployee () {
    
};

const addDepartment = () => {};

const addRole = () => {};

const updateRole = () => {};

//tried to do switch statement
// .then((answer) => {
//   switch (answer.action) {
//     case "View Department":
//       viewDepartment();
//       break;

//     case "View Role":
//       viewRole();
//       break;

//     case "View Employees":
//       viewEmployees();
//       break;

//     case "Add Role":
//       addRole();
//       break;

//     case "Add Department":
//       addDepartment();
//       break;

//     case "Add Employee":
//       addEmployee();
//       break;

//     case "Update Roles":
//       updateRoles();
//       break;

//     case "Done":
//       connection.end();
//       break;
//   }
// });

//   ANOTHER CLASS ACTIVITY
//   const questions = () => {
//     connection.query('What do you want to do', (err, res) => {
//         if (err) throw err;

//         console.log(res);
//         connection.end();
// });
// }

// connection.connect((err) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}\n`);
//     readColleges();
//   });
