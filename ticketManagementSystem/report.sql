BEGIN;
--  Ticket count by status

SELECT 'Ticket Count by status: ' as question;
SELECT status,COUNT(*) FROM tickets GROUP BY status;

--  Ticket count by assignee


SELECT 'Ticket Count by assignee: ' as question;
SELECT assignments.userId,users.name,COUNT(*) FROM assignments JOIN users ON users.userId = assignments.userId GROUP BY assignments.userId,users.name ORDER BY assignments.userId;

-- Customers with more than five open tickets

SELECT 'Customers with more than five open tickets: ' as question;
SELECT tickets.customerId,customers.name, COUNT(*) FROM tickets JOIN customers ON customers.customerId = tickets.customerId WHERE tickets.status = 'open' GROUP BY tickets.customerId,customers.name HAVING COUNT(*)>5;

-- Users with no assigned tickets
-- Left join users with assignments so for all users without an assigned ticket the ticketId will be NULL so we query to find it

SELECT 'Users with no assigned tickets: ' as question;
SELECT users.userId,users.name FROM users LEFT JOIN assignments ON users.userId = assignments.userId WHERE ticketId IS NULL;

-- Oldest unresolved ticket
SELECT 'Oldest unresolved ticket: ' as question;
SELECT * FROM tickets WHERE status != 'completed' ORDER BY created_at LIMIT 1;

-- Ticket Counts by category

SELECT 'Ticket Counts by category: ' as question;
SELECT tickets.categoryId,categories.category,COUNT(*) FROM categories JOIN tickets USING(categoryId) GROUP BY tickets.categoryId,categories.category ORDER BY tickets.categoryId;

-- Ticket Counts by priority

SELECT 'Ticket Counts by priority: ' as question;
SELECT priority,COUNT(*) FROM tickets GROUP BY priority;

COMMIT;