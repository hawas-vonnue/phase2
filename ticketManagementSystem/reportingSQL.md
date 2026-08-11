# Reporting SQL Pack

## Ticket count by status

```
SELECT status,COUNT(*) FROM tickets GROUP BY status;
```

## Ticket count by assignee

```
SELECT assignments.userId,users.name,COUNT(*) FROM assignments JOIN users ON users.userId = assignments.userId GROUP BY assignments.userId,users.name ORDER BY assignments.userId;
```

## Customers with more than five open tickets

```
SELECT tickets.customerId,customers.name, COUNT(*) FROM tickets JOIN customers ON customers.customerId = tickets.customerId WHERE tickets.status = 'open' GROUP BY tickets.customerId,customers.name HAVING COUNT(*)>5;
```

## Users with no assigned tickets

- Left join users with assignments so for all users without an assigned ticket the ticketId will be NULL so we query to find it

```
SELECT users.userId,users.name FROM users LEFT JOIN assignments ON users.userId = assignments.userId WHERE ticketId IS NULL;
```

## Oldest unresolved ticket

```
SELECT * FROM tickets WHERE status != 'completed' and created_at = (SELECT min(created_at) FROM tickets);
```

OR

```
SELECT * FROM tickets WHERE status != 'completed' ORDER BY created_at LIMIT 1;
```

## Ticket Counts by category

```
SELECT tickets.categoryId,categories.category,COUNT(*) FROM categories JOIN tickets USING(categoryId) GROUP BY tickets.categoryId,categories.category ORDER BY tickets.categoryId;
```

## Ticket Counts by priority

```
SELECT priority,COUNT(*) FROM tickets GROUP BY priority;
```
