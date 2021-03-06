INSERT INTO department (name)
VALUES 
("Human Resources"),
("Engineering"),
("Sales")
;

INSERT INTO role (title, salary, department_id)
VALUES
("HR Employee", 70000.99, 1),
("Back End Developer", 100000.99, 2),
("Front End Developer", 90000.99, 2),
("Sale Team", 60000, 3);

INSERT INTO manager (first_name, last_name)
VALUES
("Tom", "Jerry"),
("Sponge", "Bob"),
("Eliza", "Thornberry"),
("Patrick", "Star");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Katie", "Goodman", 1,2),
("Erum", "Dhukka", 2,1),
("Naureen", "Bilquis", 3,4),
("Tabish", "Aseem", 4,3);



