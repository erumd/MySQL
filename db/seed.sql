INSERT INTO department (department_name)
VALUES 
("Human Resources"),
("Engineering"),
("Sales")
;

INSERT INTO role (role_title, salary, department_name)
VALUES
("HR Employee", 70000.99, "Human Resources"),
("Back End Developer", 100000.99, "Engineering"),
("Front End Developer", 90000.99, "Engineering"),
("Sale Team", 60000, "Sales");

INSERT INTO manager (first_name, last_name)
VALUES
("Tom", "Jerry"),
("Sponge", "Bob"),
("Eliza", "Thornberry"),
("Patrick", "Star");

INSERT INTO employee (first_name, last_name, role_id, role_title, manager_title, manager_id)
VALUES
("Katie", "Goodman",1, "HR Employee"," Sponge Bob", 2),
("Erum", "Dhukka", 2, "Back End Develper", "Tom Jerry", 1),
("Naureen", "Bilquis", 3, "Front End Developer","Patrick Star", 4),
("Tabish", "Aseem", 4, "Sales Team"," Eliza Thornberry", 3);



