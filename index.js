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
        // addEmployeeQuestions();
        // whatToDo(); DONT NEED TO CALL IT AGAIN
      } else if (answers.main === "Add Department") {
        addDepartment();
        // whatToDo();
      } else if (answers.main === "Add Role") {
        addRole();
        // whatToDo();
      } else if (answers.main === "Update Role") {
        updateRole();
        // whatToDo();
      }
    });
}

whatToDo(); //have to call, duh!

// console.log("What to do function works", whatToDo);

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

async function addEmployee() {
  const queryAddEmployee = "SELECT * FROM role";
  connection.query(queryAddEmployee, (err, res) => {
    if (err) throw err;
    console.table(res);
  });

  await inquirer.prompt([
    {
      name: "first_name",
      message: "Add Employee's first name",
      type: "input",
    },
    {
      name: "last_name",
      message: "Add Employee's last name",
      type: "input",
    },
    {
      name: "role",
      message: "Add Employee's role",
      type: "list",
      choices: [
        "HR Employee",
        "Back End Developer",
        "Front End Developer",
        "Sale Team",
      ],
    },
    {
      name: "manager",
      message: "Add Employee's Manager",
      type: "list",
      choices: ["Tom Jerry", "Sponge Bob", "Eliza Thornberry", "Patrick Star"],
    },
  ]);
}
//Will helped
//trying WITHOUT ASYNCH AND WAIT
function addDepartment() {
  //   const queryAddDepartment =
  // "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"; //W3 Schools
  //   connection.query(queryAddDepartment, [title, salary, department_id,],(err, res) => {
  //       if (err) throw err;
  //       console.table(res);
  //     }
  //   );
  inquirer
    .prompt([
      {
        name: "department",
        message: "Add department",
        type: "list",
        choices: ["Human Resources", "Engineering", "Sales"],
      },
    ])
    .then((answers) => {
      const queryAddDepartment = "INSERT INTO department (name) VALUES (?)"; //W3 Schools
      connection.query(queryAddDepartment, [answers.department], (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    });
}

async function addRole() {
  //   const queryAddRole = "SELECT * FROM department";
  //   connection.query(queryAddRole, (err, res) => {
  //     if (err) throw err;
  //     console.table(res);

  //add loop
  // var department = [];
  // for (let i = 0; i < res.length; i++) {
  //   department.push(res[i].name);
  // }
  //   });

  await inquirer
    .prompt([
      {
        name: "title",
        message: "Name of Role?",
        type: "list",
        choices: [
          "HR Employee",
          "Back End Developer",
          "Front End Developer",
          "Sale Team",
        ],
      },
      {
        name: "salary",
        message: "Salary for role selected",
        type: "input",
      },
      {
        name: "department",
        message: "Department for role?",
        type: "list",
        choices: ["Human Resources", "Engineering", "Sales"],
      },
    ])
    .then((answers) => {
      const queryAddRole =
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
      connection.query(
        queryAddRole,
        [answers.title, answers.salary, answers.department_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
      );
    });
}

async function updateRole() {
  await inquirer
    .prompt([
      {
        name: "title",
        message: "Name of Role?",
        type: "list",
        choices: [
          "HR Employee",
          "Back End Developer",
          "Front End Developer",
          "Sale Team",
        ],
      },
      {
        name: "salary",
        message: "Salary for role selected",
        type: "input",
      },
      {
        name: "department",
        message: "Department for role?",
        type: "list",
        choices: ["Human Resources", "Engineering", "Sales"],
      },
    ])
    .then((answers) => {
      const queryAddRole = "UPDATE role SET  WHERE";
      connection.query(
        queryAddRole,
        [answers.title, answers.salary, answers.department_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
      );
    });
}

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
