CREATE TABLE class (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    module INT NOT NULL
);

CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE teacher (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    class_id INT(255) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE hobby (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE speciality (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL
);

INSERT INTO speciality VALUES(1,"React");
INSERT INTO speciality VALUES(2,"Redux");
INSERT INTO speciality VALUES(3,"CSS");
INSERT INTO speciality VALUES(4,"Testes");
INSERT INTO speciality VALUES(5,"Typescript");
INSERT INTO speciality VALUES(6,"Programação Orientada a Objetos");
INSERT INTO speciality VALUES(7,"Backend");

CREATE TABLE student_hobby (
    student_id INT NOT NULL,
    hobby_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (hobby_id) REFERENCES hobby(id)
);

CREATE TABLE teacher_speciality (
    teacher_id INT NOT NULL,
    speciality_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (speciality_id) REFERENCES speciality(id)
);