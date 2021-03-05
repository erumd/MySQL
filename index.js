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
const questions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "What do you want to do?",
        choices: [
          "Add role",
          "Add department",
          "Add employee",
          "View department",
          "View role",
          "View Employees",
          "Update Role",
        ],
        // validate(value) {
        //     if (isNaN(value) === false) {
        //       return true;
        //     }
        //     return false;
        //   },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO table?",
        // QUESTION: What does the || 0 do?
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0,
        },
        (err) => {
          if (err) throw err;
          console.log("Your item was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};
const viewDepartment = () => {};

const viewRole = () => {};

const viewEmployees = () => {};

const addEmployee = () => {};

const addDepartment = () => {};

const addRole = () => {};

const updateRole = () => {};

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
