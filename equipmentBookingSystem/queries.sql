SET search_path TO equipment_booking;

-- 1.Query to get unapproved bookings id

SELECT 'pending bookings id:' as query;
SELECT  bookingId FROM bookings LEFT JOIN approvals USING(bookingId) WHERE approvalId IS NULL;

-- 2.Query to get count of approvals per employee

SELECT 'Count of approvals per employee:' as query;
SELECT employeeId,name,COUNT(*) FROM employees JOIN approvals ON employees.employeeId = approvals.approvedBy GROUP BY employees.employeeId;

-- 3.Query to get Bookings per employee

SELECT 'Bookings per employee: ' as query;
SELECT employeeId,name,COUNT(*) FROM employees JOIN bookings ON employees.employeeId = bookings.bookedBy GROUP BY employees.employeeId;

-- 4. Query to get equipment with maximum number of maintenance

SELECT 'Equipment with maximum number of maintenance:' as query;
SELECT equipmentId,name,COUNT(*) FROM equipments JOIN maintenance_records USING(equipmentId)  GROUP BY equipments.equipmentId ORDER BY COUNT(*) DESC LIMIT 1; 

-- 5. Query to get equipments with no bookings

SELECT 'Equipments with no bookings:' as query;
SELECT equipmentId,name FROM equipments LEFT JOIN bookings USING(equipmentId) WHERE bookingId IS NULL;

--6. Query to get category with no equipments

SELECT 'Category with no equipments:' as query;
SELECT categoryId,category FROM categories LEFT JOIN equipments USING(categoryId) WHERE equipmentId IS NULL;        

--7. Query to get count of bookings per category

SELECT 'Count of bookings per category:' as query;
SELECT category,COUNT(*) FROM equipments JOIN bookings USING(equipmentId) JOIN categories USING(categoryId) GROUP BY category;   

--8. Query to get Latest maintained Equipment

SELECT 'latest maintained Equipment:' as query;
SELECT equipmentId,name FROM maintenance_records JOIN equipments USING(equipmentId) ORDER BY maintenanceTime DESC LIMIT 1;

--9. Query to get count of bookings per equpiment 

SELECT 'Bookings per equipment:' as query;
SELECT equipmentId,name ,COUNT(*) as bookings FROM equipments JOIN bookings USING(equipmentId) GROUP BY equipmentId;



--10. Query to get number of bookings for equipment 'hammer' 

SELECT 'Bookings of hammer' as query;
SELECT COUNT(*) as bookings FROM bookings WHERE equipmentId =(SELECT equipmentId FROM equipments WHERE name = 'hammer');