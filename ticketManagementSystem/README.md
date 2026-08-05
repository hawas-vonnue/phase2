# API Reference

| Method | Route                 | Description                                | Body                                                                   |
| ------ | --------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| GET    | `/tickets`            | To get All Tickets as an array             | N/A                                                                    |
| GET    | `/tickets/:id`        | To get ticket with a given id              | N/A                                                                    |
| POST   | `/tickets`            | To create a ticket                         | {title:string,description:string,priority:"High" or "Medium" or "Low"} |
| PATCH  | `/tickets/status/:id` | To update status of a ticket with given id | {newStatus:"Completed" or "Pending"}                                   |
| PATCH  | `/tickets/assign/:id` | To add assignee to a ticket with given id  | {assignee:string}                                                      |
| DELETE | `/tickets/:id`        | To delete ticket with given id             | N/A                                                                    |

## Response status codes

- 200 : OK
- 404 : Not Found
- 400 : Bad Request
- 500 : Internal server error
