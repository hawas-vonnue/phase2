# PostgreSQL queries

## Creating tables

### Customers table

```
CREATE TABLE customers(customerId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(36) NOT NULL);
```

### Category table

```
CREATE TABLE categories(categoryId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, category VARCHAR(36) NOT NULL);
```

### Tickets table

```
CREATE TABLE tickets(ticketId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,title varchar(36),description TEXT,priority VARCHAR(10) CHECK(priority IN('High','Medium','Low')),status VARCHAR(10),customerId INT NOT NULL,categoryId INT NOT NULL,FOREIGN KEY(customerId) REFERENCES customers(customerId) ON DELETE CASCADE,FOREIGN KEY(categoryId) REFERENCES categories(categoryId)ON DELETE CASCADE);
```

### users table

```
CREATE TABLE users(userId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,name VARCHAR(36) UNIQUE);
```

### Comments table

```
CREATE TABLE comments(commentId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,text TEXT,ticketId INT, FOREIGN KEY(ticketId) REFERENCES tickets(ticketId)) ON DELETE CASCADE;
```

### assignments table

```
CREATE TABLE assignments(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ticketId INT,userId INT ,FOREIGN KEY(ticketId) REFERENCES tickets(ticketId) ON DELETE CASCADE, FOREIGN KEY(userId) REFERENCES users(userId)ON DELETE CASCADE);
```

### status_history table

```
CREATE TABLE status_history(statusId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,ticketId INT,currentStatus VARCHAR(10),previousStatus VARCHAR(10),updatedBy INT, FOREIGN KEY(ticketId) REFERENCES tickets(ticketId) ON DELETE CASCADE,FOREIGN KEY(updatedBy) REFERENCES users(userId)ON DELETE CASCADE);
```
