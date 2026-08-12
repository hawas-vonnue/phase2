
BEGIN;

SET search_path TO equipment_booking;


INSERT INTO categories(category) VALUES('General'),('Electric'),('Mechanical') RETURNING *;

INSERT INTO equipments(name,categoryId) VALUES('hammer',3),('camera',2),('Pick axe',3) RETURNING *;

INSERT INTO employees(name,email,role) VALUES('Employee 1','employee1@gmail.com','Employee'),('Employee 2','employee2@gmail.com','Employee'),('Admin 1','admin1@gmail.com','Admin'),('Employee 3','employee3@gmail.com','Employee'),('Admin 2','admin2@gmail.com','Admin') RETURNING *;

INSERT INTO bookings(equipmentId,bookedBy) VALUES(1,1),(1,2),(2,3) RETURNING *;

INSERT INTO approvals(text,bookingId,approvedBy) VALUES('Approved',1,3), ('Approved',3,5) RETURNING *;

INSERT INTO maintenance_records(equipmentId,employeeId) VALUES(3,5),(3,5),(2,4) RETURNING *;

COMMIT;