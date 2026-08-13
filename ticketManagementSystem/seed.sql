
\set ON_ERROR_STOP ON
BEGIN;

SET search_path TO support_ticket, public;


INSERT INTO categories(category) VALUES ('TECHNICAL'),('GENERAL') RETURNING *;

INSERT INTO customers(name,email) VALUES ('Customer1','customer1@gmail.com'), ('Customer2','customer2@gmail.com'), ('Customer3','customer3@gmail.com') RETURNING *;

INSERT INTO tickets(title,description,priority,status,customerId,categoryId) VALUES ('ticket 1','description of ticket 1','High','open',1,1) , ('ticket 2','description of ticket 2','Low','open',2,2) RETURNING *;

INSERT INTO users(name,email) VALUES ('user 1','user1@gmail.com'),('user 2','user2@gmail.com'),('user 3','user3@gmail.com') RETURNING *;

INSERT INTO comments(text,ticketId) VALUES ('this is comment on ticket with id 1',1),('this is second comment on ticket with id 1',1),('this is comment on ticket with id 2',2) RETURNING *;

INSERT INTO assignments(ticketId,userId) VALUES(1,1),(1,2),(2,3) RETURNING *;

INSERT INTO status_history(ticketId,currentStatus,previousStatus,updatedBy) VALUES (2,'completed','open',2) RETURNING *;


COMMIT;