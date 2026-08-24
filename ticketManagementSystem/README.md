# Ticket support system

## Prerequisites

- Node.js 20+
- npm
- postgreSQL

## Run locally

```
cp .env.example .env
npm install
npm run setup:db
npm run dev
```

go to `http://127.0.0.1:8080/docs`

<!-- # API Reference


## For file based API

| Method | Route                 | Description                                | Body                                                                   |
| ------ | --------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| GET    | `/tickets`            | To get All Tickets as an array             | N/A                                                                    |
| GET    | `/tickets/:id`        | To get ticket with a given id              | N/A                                                                    |
| POST   | `/tickets`            | To create a ticket                         | {title:string,description:string,priority:"High" or "Medium" or "Low"} |
| PATCH  | `/tickets/status/:id` | To update status of a ticket with given id | {newStatus:"Completed" or "Pending"}                                   |
| PATCH  | `/tickets/assign/:id` | To add assignee to a ticket with given id  | {assignee:string}                                                      |
| DELETE | `/tickets/:id`        | To delete ticket with given id             | N/A                                                                    |

## For DB based API

| Method | Route                 | Description                                | Body                                                                                                         |
| ------ | --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| GET    | `/tickets`            | To get All Tickets as an array             | N/A                                                                                                          |
| GET    | `/tickets/:id`        | To get ticket with a given id              | N/A                                                                                                          |
| POST   | `/tickets`            | To create a ticket                         | {title:string,description:string,priority:"High" or "Medium" or "Low","categoryId":number,customerId:number} |
| PATCH  | `/tickets/status/:id` | To update status of a ticket with given id | {newStatus:"Completed" or "Pending"}                                                                         |
| PATCH  | `/tickets/assign/:id` | To add assignee to a ticket with given id  | {assignee:number}                                                                                            |
| DELETE | `/tickets/:id`        | To delete ticket with given id             | N/A                                                                                                          |

## Response status codes

- 200 : OK
- 404 : Not Found
- 400 : Bad Request
- 500 : Internal server error -->

## API Documentation

The Ticket Support API provides technical endpoints to manage customer support tickets, authenticate users, handle account registrations, manage ticket categories, and handle agent assignments.

## Base Information

- API Version: 1.0.0
- Request & Response Format: JSON (application/json)

## Authentication

Endpoints other than login and health require a JSON Web Token (JWT) passed in the HTTP headers using Bearer Authentication:

Authorization: Bearer <your_jwt_token>

---

## ️ System Health

GET /health
Verifies that the API service is active and running correctly.

- Authentication: None.
- Responses:
- 200 OK: Service is operational.

---

## User and Customer Login

`POST /login`
Authenticates an internal team user or external customer and returns a JWT access token.

- Authentication: BearerAuth required.
- Request Body: (application/json)

```
{
"email": "user1@gmail.com",
"password": "default",
"type": "user"
}
```

- email (string, required): The account email address.
- password (string, required): The password for verification.
- type (string, required): Type of account. Allowed values: "user", "customer".
- Responses:
    - 200 OK: Login successful.

    ```{
    "status": "string",
    "token": "string",
    "user": {}
    }
    ```

    - 400 Bad Request: Request payload is missing required fields.
    - 403 Forbidden: Invalid email or password.

---

## Customer Management

### Register a Customer Account

`POST /customers/register`
Creates a new external customer profile in the system.

- Authentication: None.
- Request Body: (application/json)

```
{
"email": "customer@gmail.com",
"password": "default",
"name": "customer 1"
}
```

- email (string, required)
- password (string, required)
- name (string, required)
- Responses:
    - 200 OK: Customer account created successfully.
    - 400 Bad Request: Validation error or missing fields.
    - 401 Unauthorized: Token error validation.

## Get current User

`GET /users`-fetch current user details

- Authentication: BearerAuth required.
- Responses:
    - 200 OK: Successfully retrieved the list of internal users.
    - 401 Unauthorized: Missing or invalid token.

## Register a User Account

POST /users/register
Creates a new internal system user account.

- Authentication: BearerAuth required.
- Request Body: (application/json)

```
{
"email": "user@gmail.com",
"password": "default",
"name": "user 1"
}
```

- email (string, required)
- password (string, required)
- name (string, required)
- Responses:
    - 200 OK: User account created successfully.
    - 400 Bad Request: Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Restricted registration permissions.

---

## Categories

### Create Ticket Category

`POST /categories/create`
Registers a new categorization label to organize support requests.

- Authentication: BearerAuth required.
- Request Body: (application/json)

```
{
"category": "Hardware support"
}
```

- category (string, required): The name of the category.
- Responses:
    - 200 OK: Category created successfully.
    - 400 Bad Request:Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Account credentials lack category creation rights.

---

## Tickets Management## List Tickets

`GET /tickets`
Retrieves all support tickets filterable by pagination and sort ordering rules.

- Authentication: BearerAuth required.
- Query Parameters:
    - page (integer, optional): Current target page number.
    - pageSize (integer, optional): Number of items per page (Maximum limit: 100).
    - sortField (string, optional): Field to organize records. Allowed values: assigned_to, created_at, created_by, description, priority, status, title.
    - sortDirection (string, optional): Sorting progression logic. Allowed values: asc, desc.
- Responses:
    - 200 OK: Successfully retrieved the list of tickets.

    ```
    {
    "pageMetadata": {
    "count": 150,
    "page": 1,
    "pageSize": 10,
    "totalPages": 15
    },
    "result": [{},{}]
    }
    ```

    - 400 Bad Request: Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Profile does not have reading rights.

## Create a Support Ticket

`POST /tickets/create`
create a new ticket

- Authentication: BearerAuth required.
- Request Body: (application/json)

```
{
"title": "Laptop won't boot",
"description": "Screen remains black when holding power key",
"priority": "Low",
"categoryId": 1,
"customerId": 1
}
```

- title (string, required): Summary of the technical problem.
- description (string, required): Full contextual description of the problem.
- priority (string, required): Initial urgency rating.
- categoryId (number, required): Target category identifier link.
- customerId (number, required): Requester customer unique ID.
- Responses:
    - 201 Created: Ticket created successfully.
    - 400 Bad Request:Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Prohibited from creating requests.

## View Ticket Details

`GET /tickets/{id}`
Extracts details for a specific individual ticket.

- Authentication: BearerAuth required.
- Path Parameters:
    - id (number, required): Unique identifier of the ticket.
- Responses:
    - 200 OK: Ticket details retrieved successfully.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Access configuration constraints.
    - 404 Not Found: Target ticket ID does not match any entry.

## Update Ticket Status

`PATCH /tickets/status/{id}`
Modifies the current status of an active ticket.

- Authentication: BearerAuth required.
- Path Parameters:
    - id (number, required): Unique identifier of the ticket.
- Request Body: (application/json)

```
{
"newStatus": "resolved"
}
```

- newStatus (string, required): The new progress status value.
- Responses:
    - 200 OK: Status updated successfully.
    - 400 Bad Request:Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Profile lacks ticket alteration authority.
    - 404 Not Found: No resource matching the provided ID found.

## Assign Ticket to User

`POST /tickets/assign/{id}`
Links an internal support user to an unresolved ticket.

- Authentication: BearerAuth required.
- Path Parameters:
    - id (number, required): Unique identifier of the ticket.
- Request Body: (application/json)

```
{
"assignee": 1
}
```

- assignee (number, required): Unique ID number of the assigned team member.
- Responses:
    - 200 OK: Ticket assigned successfully.
    - 400 Bad Request:Validation error or missing fields.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Operation privileges missing.
    - 404 Not Found: Target ticket or employee reference matching the criteria missing.

## Delete a Ticket

`DELETE /tickets/{id}`
Permanently deletes an existing ticket logging from the support records database.

- Authentication: BearerAuth required.
- Path Parameters:
    - id (number, required): Unique ticket identifier code.
- Responses:
    - 200 OK: Ticket deleted successfully.
    - 401 Unauthorized: Session token expired or invalid.
    - 403 Forbidden: Access level profile does not permit deletion tasks.
    - 404 Not Found: Target ticket reference not found.
