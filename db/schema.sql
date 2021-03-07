DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;
USE team_db;

CREATE TABLE department (
     id INTEGER auto_increment NOT NULL,
     department_name VARCHAR (30),
     primary key (id)
);

CREATE TABLE role  (
    id INTEGER auto_increment NOT NULL,
    role_title VARCHAR (30),
    salary DECIMAL (10,2),
    department_id INTEGER,
	department_name VARCHAR (30),
    -- foreign key bc taking in from department table
    foreign key (department_id) references department(id),
    primary key (id)
);


CREATE TABLE manager (
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
primary key (id)
);

CREATE TABLE employee(
id INTEGER auto_increment NOT NULL,
first_name VARCHAR(30), 
last_name VARCHAR(30),
role_id  INTEGER, 
manager_id INTEGER,
 -- foreign key bc taking in from role and department table
foreign key (role_id) REFERENCES role(id),
foreign key (manager_id) references manager (id),
primary key (id) 
);











