\set ON_ERROR_STOP ON
BEGIN;


DROP SCHEMA IF EXISTS support_ticket CASCADE;

CREATE SCHEMA support_ticket

CREATE TABLE customers(customerId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(36) NOT NULL,email VARCHAR(36) NOT NULL UNIQUE)

CREATE TABLE categories(categoryId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, category VARCHAR(36) NOT NULL)

CREATE TABLE tickets(ticketId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,title varchar(36),description TEXT,priority VARCHAR(10),status VARCHAR(10),customerId INT NOT NULL,categoryId INT NOT NULL,created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(customerId) REFERENCES customers(customerId),FOREIGN KEY(categoryId) REFERENCES categories(categoryId))

CREATE TABLE users(userId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(36),email VARCHAR(36) NOT NULL UNIQUE)

CREATE TABLE comments(commentId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,text TEXT,ticketId INT, FOREIGN KEY(ticketId) REFERENCES tickets(ticketId)ON DELETE CASCADE) 

CREATE TABLE assignments(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ticketId INT,userId INT ,FOREIGN KEY(ticketId) REFERENCES tickets(ticketId) ON DELETE CASCADE, FOREIGN KEY(userId) REFERENCES users(userId)ON DELETE CASCADE)

CREATE TABLE status_history(statusId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,ticketId INT,currentStatus VARCHAR(10),previousStatus VARCHAR(10),updatedBy INT, FOREIGN KEY(ticketId) REFERENCES tickets(ticketId) ON DELETE CASCADE,FOREIGN KEY(updatedBy) REFERENCES users(userId)ON DELETE CASCADE);


SET search_path TO support_ticket, public;


INSERT INTO categories(category) VALUES ('TECHNICAL'),('GENERAL') RETURNING *;

INSERT INTO customers(name,email) VALUES ('Customer1','customer1@gmail.com'), ('Customer2','customer2@gmail.com'), ('Customer3','customer3@gmail.com') RETURNING *;

INSERT INTO tickets(title,description,priority,status,customerId,categoryId) VALUES ('ticket 1','description of ticket 1','High','open',1,1) , ('ticket 2','description of ticket 2','Low','open',2,2) RETURNING *;

INSERT INTO users(name,email) VALUES ('user 1','user1@gmail.com'),('user 2','user2@gmail.com'),('user 3','user3@gmail.com') RETURNING *;

INSERT INTO comments(text,ticketId) VALUES ('this is comment on ticket with id 1',1),('this is second comment on ticket with id 1',1),('this is comment on ticket with id 2',2) RETURNING *;

INSERT INTO assignments(ticketId,userId) VALUES(1,1),(1,2),(2,3) RETURNING *;

INSERT INTO status_history(ticketId,currentStatus,previousStatus,updatedBy) VALUES (2,'completed','open',2) RETURNING *;


COMMIT;

