
SET search_path TO equipment_booking;
-- Before index

EXPLAIN ANALYSE SELECT * FROM employees WHERE name = 'Employee 1';
--  Seq Scan on employees  (cost=0.00..12.12 rows=1 width=444) (actual time=0.015..0.018 rows=1 loops=1)
--    Filter: ((name)::text = 'Employee 1'::text)
--    Rows Removed by Filter: 4
--  Planning Time: 0.098 ms
--  Execution Time: 0.038 ms


EXPLAIN ANALYSE SELECT * FROM equipments WHERE name = 'hammer';
--  Seq Scan on equipments  (cost=0.00..14.00 rows=2 width=226) (actual time=0.019..0.021 rows=1 loops=1)
--    Filter: ((name)::text = 'hammer'::text)
--    Rows Removed by Filter: 2
--  Planning Time: 0.089 ms
--  Execution Time: 0.041 ms

-- After index on employee.name

CREATE INDEX employee_name ON employees(name);

EXPLAIN ANALYSE SELECT * FROM employees WHERE name = 'Employee 1';
--  Seq Scan on employees  (cost=0.00..1.06 rows=1 width=444) (actual time=0.014..0.017 rows=1 loops=1)
--    Filter: ((name)::text = 'Employee 1'::text)
--    Rows Removed by Filter: 4
--  Planning Time: 0.287 ms
--  Execution Time: 0.036 ms


CREATE INDEX equipment_name ON equipments(name);

EXPLAIN ANALYSE SELECT * FROM equipments WHERE name = 'hammer';
--  Seq Scan on equipments  (cost=0.00..1.04 rows=1 width=226) (actual time=0.015..0.017 rows=1 loops=1)
--    Filter: ((name)::text = 'hammer'::text)
--    Rows Removed by Filter: 2
--  Planning Time: 0.104 ms
--  Execution Time: 0.035 ms