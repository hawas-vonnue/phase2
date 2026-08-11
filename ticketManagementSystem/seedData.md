# Insert Seed Data

## Categories table

```
INSERT INTO categories(category) VALUES ('TECHNICAL'),('GENERAL') RETURNING *;

```

## Customers table

```
INSERT INTO customers(name) VALUES ('Customer1'), ('Customer2'), ('Customer3') RETURNING *;
```

## Tickets table

```
INSERT INTO tickets(title,description,priority,status,customerId,categoryId) VALUES ('ticket 1','description of ticket 1','High','open',1,1) , ('ticket 2','description of ticket 2','Low','open',2,2) RETURNING *;
```

## Users table

```
INSERT INTO users(name) VALUES ('user 1'),('user 2'),('user 3') RETURNING *;
```

## comments table

```
INSERT INTO comments(text,ticketId) VALUES ('this is comment on ticket with id 1',1),('this is second comment on ticket with id 1',1),('this is comment on ticket with id 2',2) RETURNING *;
```

## Assignments table

```
INSERT INTO assignments(ticketId,userId) VALUES(1,1),(1,2),(2,3) RETURNING *;
```

## status_history

```
INSERT INTO status_history(ticketId,currentStatus,previousStatus,updatedBy) VALUES (2,'completed','open',2) RETURNING *;
```

# clear tables

```
DELETE FROM assignments;
DELETE FROM comments;
DELETE FROM status_history;
DELETE FROM tickets;
DELETE FROM categories;
DELETE FROM customers;
DELETE FROM users;
```

or

```
DROP TABLE IF EXISTS assignments, comments,status_history,tickets,categories,customers,users;
```
