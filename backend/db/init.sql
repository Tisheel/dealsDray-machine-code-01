CREATE DATABASE IF NOT EXISTS db0;

USE db0;

CREATE TABLE IF NOT EXISTS t_Employee(
    f_Id SERIAL PRIMARY KEY,
    f_Image LONGBLOB NOT NULL,
    f_Name VARCHAR(25) NOT NULL,
    f_Email VARCHAR(25) NOT NULL,
    f_Mobile VARCHAR(10) NOT NULL,
    f_Designation VARCHAR(25) NOT NULL,
    f_gender CHAR(1) NOT NULL,
    f_Course CHAR(3) NOT NULL,
    f_Createdate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS t_Login(
    f_sno INT PRIMARY KEY,
    f_userName VARCHAR(25) NOT NULL,
    f_Pwd VARCHAR(25) NOT NULL
);

INSERT INTO t_Login (f_sno, f_userName, f_Pwd) VALUES (1, 'Tisheel', '1234567');