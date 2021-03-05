const role = require("/.index");

const questions = [
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
  },
];

const department = [
  {
    type: "input",
    name: "name",
    message: "Which Department?",
  },
];

const role = [
  {
    type: "input",
    name: "name",
    message: "Role?",
  },
];

const employee = [
  {
    type: "input",
    name: "first_name",
    message: "Employee's first name",
  },
  {
    type: "input",
    name: "last_name",
    message: "Employee's last name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "Employee's Role?",
    choices: ["Manager", "Intern", "Engineer", "HR", "Sales"],
  },
  {
    type: "input",
    name: "Manager",
    message: "Employee's Manager?",
    choices: ["Tome Jerry", "Sponge Bob", "Eliz Thornberry", "Patrick Star"],
  },
];

//not sure if did this correctly 
module.export = {
  questions: questions,
  department: department,
  role: role,
  employee: employee,
};
