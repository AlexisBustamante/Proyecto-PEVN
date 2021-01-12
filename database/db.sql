CREATE DATABASE PEVN;

CREATE TABLE profesor(
    id_p SERIAL PRIMARY KEY,
    p_name TEXT NOT NULL,
    p_email  TEXT NOT NULL,
    p_password TEXT NOT NULL
);

CREATE TABLE student(
    id_s SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    s_email TEXT NOT NULL,
    s_password TEXT NOT NULL
);


CREATE TABLE course(
    id_c SERIAL PRIMARY KEY,
    p_id INTEGER REFERENCES profesor(id_p),
    c_name TEXT NOT NULL,
    c_description TEXT NOT NULL
);


CREATE TABLE studentvscourse(
    s_id INTEGER REFERENCES student(id_s),
    c_id INTEGER REFERENCES course(id_c)
);

CREATE TABLE assignment(
    id_a SERIAL PRIMARY KEY,
    c_id INTEGER NOT NULL REFERENCES course(id_c),
    a_name TEXT NOT NULL,
    a_description TEXT,
    a_file TEXT NOT NULL 
);

CREATE TABLE delivery(
    id_d SERIAL PRIMARY KEY,
    a_id INTEGER REFERENCES assignment(id_a),
    s_id INTEGER REFERENCES student(id_s),
    d_file TEXT NOT NULL,
    d_filename TEXT
);


ALTER TABLE profesor ADD CONSTRAINT professor_p_email_key UNIQUE (p_email);
ALTER TABLE student ADD CONSTRAINT student_s_email_key UNIQUE (s_email);


--una vista es una consulta que se representa en una tabla
--se crea una consulta entre tablas con JOIN y así solo llamamos la vista.
--esta vista s epuede usar anidada en otra consulta.

--descomentar las 2 lineas siguientes pra crear la vista en la BD
--CREATE VIEW professorvscourse 
--AS 
SELECT * 
FROM course
JOIN(SELECT p_name,p_email,id_p from profesor) AS p ON p_id=id_p;


SELECT * FROM course JOIN (SELECT p_name,p_email,id_p from profesor) AS p ON p_id=id_p;