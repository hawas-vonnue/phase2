# Comparison with and without index

## Before Index

- `EXPLAIN ANALYSE select * from tickets;`
    - Seq Scan on tickets (cost=0.00..13.30 rows=330 width=218) (actual time=0.016..0.019 rows=2 loops=1)
    - Planning Time: 0.106 ms
    - Execution Time: 0.040 ms
    - (3 rows)

- `EXPLAIN ANALYSE select * from tickets where ticketId = 2;`
    - Index Scan using tickets_pkey on tickets (cost=0.15..8.17 rows=1 width=218) (actual time=0.008..0.009 rows=1 loops=1)
    - Index Cond: (ticketid = 2)
    - Planning Time: 0.146 ms
    - Execution Time: 0.054 ms
    - (4 rows)

## After Index

- `CREATE INDEX ticket_id ON tickets(ticketId);`

- `EXPLAIN ANALYSE select * from tickets;`
    - Seq Scan on tickets (cost=0.00..1.02 rows=2 width=218) (actual time=0.009..0.011 rows=2 loops=1)
    - Planning Time: 0.379 ms
    - Execution Time: 0.029 ms
    - (3 rows)

- `EXPLAIN ANALYSE select * from tickets where ticketId = 2;`
    - Seq Scan on tickets (cost=0.00..1.02 rows=1 width=218) (actual time=0.023..0.025 rows=1 loops=1)
    - Filter: (ticketid = 2)
    - Rows Removed by Filter: 1
    - Planning Time: 0.151 ms
    - Execution Time: 0.049 ms
    - (5 rows)

# Justification For Index

- After Index the execution time is reduced. Created Index on ticketId becasue it is the searched one in tickets.
