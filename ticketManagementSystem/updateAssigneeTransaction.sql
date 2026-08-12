BEGIN;

UPDATE tickets SET status = 'completed' where ticketId = 1;

INSERT INTO status_history(ticketId,currentStatus,previousStatus,updatedBy) VALUES (1,'completed','open',1);

INSERT INTO comments(text,ticketId) VALUES('status changed from open to completed',1);

COMMIT;

-- intentionally created error for ROLLBACK then verified the updated change is back to before transaction.

-- BEGIN;

-- UPDATE tickets SET status = 'completed' where ticketId = 2;

-- ROLLBACK;

