
\set ON_ERROR_STOP ON

BEGIN;

DROP SCHEMA IF EXISTS equipment_booking CASCADE;

DROP TYPE IF EXISTS employeeType CASCADE;
CREATE TYPE employeeType AS ENUM('Employee','Admin');

CREATE SCHEMA equipment_booking

CREATE TABLE categories(categoryId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,category VARCHAR(100) NOT NULL UNIQUE)

CREATE TABLE equipments(equipmentId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(100) NOT NULL,categoryId INT,FOREIGN KEY(categoryId) REFERENCES categories(categoryId))

CREATE TABLE employees(employeeId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE,role employeeType)

CREATE TABLE bookings(bookingId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,equipmentId INT,bookedBy INT,bookedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(equipmentId) REFERENCES equipments(equipmentId),FOREIGN KEY(bookedBy) REFERENCES employees(employeeId))

CREATE TABLE approvals(approvalId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,text TEXT,bookingId INT,approvedBy INT,FOREIGN KEY(bookingId) REFERENCES bookings(bookingId),FOREIGN KEY(approvedBy) REFERENCES employees(employeeId))


CREATE TABLE maintenance_records(maintenanceId INT GENERATED ALWAYS AS IDENTITY,equipmentId INT,employeeId INT,maintenanceTime TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(equipmentId) REFERENCES equipments(equipmentId),FOREIGN KEY(employeeId) REFERENCES employees(employeeId));


COMMIT;