//used SQL activities from class
// SQL: SELECT, INSERT, UPDATE (AND, OR to add 2 conditions. example employee first and last name)
//DID study group and got help from Will, Jasmine, amd Gregory

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
          "View All Department",
          "View All Role",
          "View All Employees",
          "Add Role",
          "Add Department",
          "Add Employees",
          "Update Role",
          "Update Manager",
          "Done",
        ],
      },
    ])

    .then((answers) => {
      if (answers.main === "View All Department") {
        viewDepartment();
        // whatToDo();
      } else if (answers.main === "View All Role") {
        viewRole();
      } else if (answers.main === "View All Employees") {
        viewEmployee();
      } else if (answers.main === "Add Employees") {
        addEmployee();
      } else if (answers.main === "Add Department") {
        addDepartment();
      } else if (answers.main === "Add Role") {
        addRole();
      } else if (answers.main === "Update Role") {
        updateRole();
      } else if (answers.main === "Update Manager") {
        updateManager();
      } else if (answers.main === "Done") {
        connection.end();
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
    whatToDo();
  });
}

// const viewRole = () => {};
function viewRole() {
  const queryRole = "SELECT * FROM role";
  connection.query(queryRole, (err, res) => {
    if (err) throw err;
    console.table(res);
    whatToDo();
  });
}

function viewEmployee() {
  const queryEmployee = "SELECT * FROM employee";
  connection.query(queryEmployee, (err, res) => {
    if (err) throw err;
    console.table(res);
    whatToDo();
  });
}

// const viewEmployee = () => {};

async function addEmployee() {
  await inquirer
    .prompt([
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
        name: "role_title",
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
        name: "manager_name",
        message: "Add Employee's Manager",
        type: "list",
        choices: [
          "Tom Jerry",
          "Sponge Bob",
          "Eliza Thornberry",
          "Patrick Star",
        ],
      },
    ])

    .then((answers) => {
      const queryAddEmployee =
        "INSERT INTO employee (first_name, last_name, role_title, manager_name) VALUES (?,?,?,?)";
      connection.query(
        queryAddEmployee,
        [
          answers.first_name,
          answers.last_name,
          answers.role_title,
          answers.manager_name,
        ],
        (err, res) => {
          if (err) throw err;
          console.log(answers);
          //   console.table(res);

          const queryEmployeeTable = "SELECT * FROM employee";
          connection.query(queryEmployeeTable, (err, res) => {
            if (err) throw err;
            console.log();
            console.table(res);
            whatToDo();
          });
        }

        //take in role_id nad manger_id and output number
      );
    });
}

// ____________________________________________________________________________________________________add department_
//Will helped
//trying WITHOUT ASYNCH AND WAIT
async function addDepartment() {
  //   const queryAddDepartment =
  // "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"; //W3 Schools
  //   connection.query(queryAddDepartment, [title, salary, department_id,],(err, res) => {
  //       if (err) throw err;
  //       console.table(res);
  //     }
  //   );
  await inquirer
    .prompt([
      {
        name: "department_name",
        message: "Which department you want to add?",
        type: "input",
      },
    ])
    .then((answers) => {
      const queryAddDepartment =
        "INSERT INTO department (department_name) VALUES (?)"; //W3 Schools
      connection.query(
        queryAddDepartment,
        [answers.department_name],
        (err, res) => {
          if (err) throw err;
          // console.table(res);

          // function addDepartmentTable() {
          const queryDepartmentTable = "SELECT * FROM department";
          connection.query(queryDepartmentTable, (err, res) => {
            if (err) throw err;

            console.table(res);
            whatToDo();
          });
          //   }
          //   console.table(queryDepartmentTable);
        }
      );
    });
}

//tryin to add query to generate dep table

// ________________________________________________________________________________________________

async function addRole() {
  //   const inputDepartment = [];
  //   const queryAddRole = "SELECT * FROM department";
  //   connection.query(queryAddRole, (err, res) => {
  //     if (err) throw err;
  //     // console.table(res);

  //     //   add loop, not sure if it goes here
  //     for (let i = 0; i < res.length; i++) {
  //       inputDepartment.push(res[i].name);
  //     }
  //   });

  await inquirer
    .prompt([
      {
        name: "role_title",
        message: "Which new role do you want to add?",
        type: "input",
      },
      {
        name: "salary",
        message: "Salary for new role selected",
        type: "input",
      },
      {
        name: "department_name",
        message: "Department to add new role?",
        type: "list",
        choices: ["Human Resources", "Engineering", "Sales"],
        // choices: [inputDepartment],
      },
    ])
    .then((answers) => {
      const queryAddRole2 =
        "INSERT INTO role (role_title, salary, department_name) VALUES (?,?,?)";
      connection.query(
        queryAddRole2,
        [answers.role_title, answers.salary, answers.department_name],
        (err, res) => {
          if (err) throw err;
          //   console.table(res);

          const queryRoleTable = "SELECT * FROM role";
          connection.query(queryRoleTable, (err, res) => {
            if (err) throw err;
            console.table(res);
            whatToDo();
          });
        }
      );
    });
}
// __________________________________________________________________________ UPDATE ROLE
async function updateRole() {
  await inquirer
    .prompt([
      {
        name: "first_name",
        message: "First name of person to update role?",
        type: "input",
      },
      {
        name: "last_name",
        message: "Last name of person to update role?",
        type: "input",
      },
      {
        name: "update_role",
        message: "Which role to update?",
        type: "list",
        choices: [
          "HR Employee",
          "Back End Developer",
          "Front End Developer",
          "Sale Team",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      const queryUpdateRole =
        "UPDATE employee SET role_title=? WHERE first_name=? AND last_name=?";
      connection.query(
        queryUpdateRole,
        [answers.update_role, answers.first_name, answers.last_name], //no answers.department_id
        (err, res) => {
          if (err) throw err;
          //   var roleUpdate = [];
          //   for (let i = 0; i < res.length; i++) {
          //     roleUpdate.push(res[i].title);
          //W3 school /nodejs_mysql_update.asp
          //   var sql = "UPDATE ";
          //   console.log(result.affectedRows + " record(s) updated");

          const queryUpdateRoleTable = "SELECT * FROM employee";
          connection.query(queryUpdateRoleTable, (err, res) => {
            if (err) throw err;
            console.table(res);
            whatToDo();
          });
        }
      );
    });
}

// ___________________________________________________________________________ UPDATE MANAGER ROLE
async function updateManager() {
  await inquirer
    .prompt([
      {
        name: "first_name",
        message: "First name of person to update role?",
        type: "input",
      },
      {
        name: "last_name",
        message: "Last name of person to update role?",
        type: "input",
      },
      {
        name: "update_manager_role",
        message: "Which manager role to update?",
        type: "list",
        choices: [
          "Sponge Bob",
          "Tom Jerry",
          "Patrick Star",
          "Eliza Thornberry",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      const queryUpdateManager =
        "UPDATE employee SET manager_name=? WHERE first_name=? AND last_name=?";
      connection.query(
        queryUpdateManager,
        [answers.update_manager_role, answers.first_name, answers.last_name], //no answers.department_id
        (err, res) => {
          if (err) throw err;
          //   var roleUpdate = [];
          //   for (let i = 0; i < res.length; i++) {
          //     roleUpdate.push(res[i].title);
          //W3 school /nodejs_mysql_update.asp
          //   var sql = "UPDATE ";
          //   console.log(result.affectedRows + " record(s) updated");

          const queryUpdateManagerTable = "SELECT * FROM employee";
          connection.query(queryUpdateManagerTable, (err, res) => {
            if (err) throw err;
            console.table(res);
            whatToDo();
          });
        }
      );
    });
}

// ADD ROLE INSTRUCTION:
// 1. query the db for the departments table (select * )
// 2. In the promise for the query create a new array of objects that have a "name" and "value"
// New
// the name will be the department name
// value will be the id
// 3. in your followup inquirer questions use that array for the choices on the question for departments
// this will make it so that the choices shown are the department names
// but the actual value is the departments id
// 4. perform the query to add the new role

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
