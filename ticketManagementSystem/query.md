# Ticket managenement Queries

## Open tickets

```
SELECT * FROM tickets where status = 'open';
```

## High-priority tickets

```
SELECT * FROM tickets where priority = 'High';
```

### status updates

```
UPDATE tickets SET status = 'completed' where ticketId = 1;
INSERT INTO status_history(ticketId,currentStatus,previousStatus,updatedBy) VALUES (1,'completed','open',1);

```

## safe deletion

- Add ON DELETE CASCADE on every foregin key reference of tickets

```
DELETE FROM tickets where ticketId = 2;
```
