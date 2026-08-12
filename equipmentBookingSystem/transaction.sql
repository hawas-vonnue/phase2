-- Deleting an entry in approvals with booking id must be deleted from bookings too
BEGIN;

SET search_path TO equipment_booking;

DELETE FROM approvals WHERE bookingId = 1 RETURNING *;
DELETE FROM bookings WHERE bookingId = 1 RETURNING *;

COMMIT;