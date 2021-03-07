//used SQL activities from class
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
          "Done",
        ],
      },
    ])

    .then((answers) => {
      if (answers.main === "View All Department") {
        viewDepartment();
        whatToDo();
      } else if (answers.main === "View All Role") {
        viewRole();
        whatToDo();
      } else if (answers.main === "View All Employees") {
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
        // inputDepartment();
        // whatToDo();
      } else if (answers.main === "Update Role") {
        updateRole();
        // whatToDo();
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
  // const inputDepartment = [];
  // const queryAddEmployee = "SELECT * FROM manager";
  // connection.query(queryAddEmployee, (err, res) => {
  //   if (err) throw err;
  //   // console.table(res);

  //   //   add loop
  //   for (let i = 0; i < res.length; i++) {
  //     inputDepartment.push(res[i].name);
  //   }
  // });
  //   const queryAddEmployee = "SELECT * FROM role";
  //   connection.query(queryAddEmployee, (err, res) => {
  //     if (err) throw err;
  //     console.table(res);
  //   });

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
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
      connection.query(
        queryAddEmployee,
        [
          answers.first_name,
          answers.last_name,
          answers.role_id,
          answers.manager_id,
        ],
        (err, res) => {
          if (err) throw err;
          console.log(answers);
          //   console.table(res);

          const queryEmployeeTable = "SELECT * FROM employee";
          connection.query(queryEmployeeTable, (err, res) => {
            if (err) throw err;
            console.table(res);
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
          });
          //   }
          console.table(queryDepartmentTable);
        }
      );
    });
}

//tryin to add query to generate dep table

// ________________________________________________________________________________________________
// 1. query the db for the departments table (select * )

// 2. In the promise for the query create a new array of objects that have a "name" and "value"
// New

// the name will be the department name

// value will be the id

// 3. in your followup inquirer questions use that array for the choices on the question for departments

// this will make it so that the choices shown are the department names

// but the actual value is the departments id

// 4. perform the query to add the new role

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
        name: "department",
        message: "Department to add new role?",
        type: "list",
        choices: ["Human Resources", "Engineering", "Sales"],
        // choices: [inputDepartment],
      },
    ])
    .then((answers) => {
      const queryAddRole2 =
        "INSERT INTO role (role_title, salary, department_id) VALUES (?,?,?)";
      connection.query(
        queryAddRole2,
        [answers.role_title, answers.salary, answers.department_id],
        (err, res) => {
          if (err) throw err;
          //   console.table(res);

          const queryRoleTable = "SELECT * FROM role";
          connection.query(queryRoleTable, (err, res) => {
            if (err) throw err;
            console.table(res);
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
      //   { I DON'T THINK NEED TO UPDATE SALARY
      //     name: "salary",
      //     message: "Salary for role selected",
      //     type: "input",
      //   },
      //   { DONT NEED TO CHANGE DEPARTMENT
      //     name: "department",
      //     message: "Department for role?",
      //     type: "list",
      //     choices: ["Human Resources", "Engineering", "Sales"],
      //   },
    ])
    .then((answers) => {
      const queryUpdateRole = "SELECT * FROM employee";
      //   "UPDATE role SET  WHERE";
      connection.query(
        queryUpdateRole,
        [answers.first_name, answers.last_name, answers.update_role], //no answers.department_id
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
          });
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
