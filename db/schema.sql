




CREATE TABLE department {
     id INTEGER auto_increment NOT NULL,
     name VARCHAR (30),
     primary key (id),
};



CREATE TABLE role  {
    id INTEGER auto_increment NOT NULL,
    title VARCHAR (30),
    salary DECIMAL (10,2),
    department_id INTEGER,
    primary key (id)

};
