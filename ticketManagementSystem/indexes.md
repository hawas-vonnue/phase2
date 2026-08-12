# Comparison with and without index

## Before Index

- `EXPLAIN ANALYSE select * from tickets where customerId= 1;`
    - Seq Scan on tickets (cost=0.00..14.12 rows=2 width=218) (actual time=0.014..0.017 rows=1 loops=1)
    - Filter: (customerid = 1)
    - Rows Removed by Filter: 1
    - Planning Time: 0.105 ms
    - Execution Time: 0.038 ms

## Creating Index

- `CREATE INDEX ticket_id ON tickets(customerId);`

## After Index

- `EXPLAIN ANALYSE select * from tickets where customerId= 1;`
    - Seq Scan on tickets (cost=0.00..1.02 rows=1 width=218) (actual time=0.015..0.017 rows=1 loops=1)
    - Filter: (customerid = 1)
    - Rows Removed by Filter: 1
    - Planning Time: 0.113 ms
    - Execution Time: 0.037 ms

# Justification For Index

- After Index the execution time is reduced. Created Index on customerId in tickets because it is the searched one in tickets.
