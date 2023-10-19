# API Documentation

## Table of Contents

- [Allocation API](#allocation-api)
- [Analytics API](#analytics-api)
- [Entity API](#entity-api)
- [Logistics API](#logistics-api)
- [Notification API](#notification-api)
- [Resource API](#resource-api)
- [Transaction API](#transaction-api)

### Allocation API

#### Create Allocation

- **Method**: POST
- **Endpoint**: `/api/allocations/`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "resourceId": "123", "entityId": "456", "quantity": 10 }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new allocation.
  - `400 Bad Request`: Invalid request payload.

#### Get All Allocations

- **Method**: GET
- **Endpoint**: `/api/allocations/`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved all allocations.
  - `404 Not Found`: No allocations exist.

#### Get Allocation by ID

- **Method**: GET
- **Endpoint**: `/api/allocations/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the allocation.
  - `404 Not Found`: Allocation with the given ID does not exist.

#### Update Allocation by ID

- **Method**: PUT
- **Endpoint**: `/api/allocations/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "quantity": 12 }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the allocation.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Allocation with the given ID does not exist.

#### Delete Allocation by ID

- **Method**: DELETE
- **Endpoint**: `/api/allocations/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the allocation.
  - `404 Not Found`: Allocation with the given ID does not exist.



### Analytics API

#### Create Record

- **Method**: POST
- **Endpoint**: `/analytics`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "key1": "value1", "key2": "value2" }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new analytics record.
  - `400 Bad Request`: Invalid request payload.

#### Get Record by ID

- **Method**: GET
- **Endpoint**: `/analytics/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the analytics record.
  - `404 Not Found`: Record with the given ID does not exist.

#### Update Record by ID

- **Method**: PUT
- **Endpoint**: `/analytics/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "key1": "new_value1", "key2": "new_value2" }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the analytics record.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Record with the given ID does not exist.

#### Delete Record by ID

- **Method**: DELETE
- **Endpoint**: `/analytics/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the analytics record.
  - `404 Not Found`: Record with the given ID does not exist.

### Entity API

#### Create Entity

- **Method**: POST
- **Endpoint**: `/api/entities/`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "name": "EntityName", "type": "Type1" }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new entity.
  - `400 Bad Request`: Invalid request payload.

#### Get All Entities

- **Method**: GET
- **Endpoint**: `/api/entities/`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved all entities.
  - `404 Not Found`: No entities exist.

#### Get Entity by ID

- **Method**: GET
- **Endpoint**: `/api/entities/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the entity.
  - `404 Not Found`: Entity with the given ID does not exist.

#### Update Entity by ID

- **Method**: PUT
- **Endpoint**: `/api/entities/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "name": "UpdatedEntityName", "type": "UpdatedType" }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the entity.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Entity with the given ID does not exist.

#### Delete Entity by ID

- **Method**: DELETE
- **Endpoint**: `/api/entities/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the entity.
  - `404 Not Found`: Entity with the given ID does not exist.

### Logistics API

#### Create Route

- **Method**: POST
- **Endpoint**: `/logistics`
- **Headers**: `Content-Type: application/json`
- **Body**: `{ "start": "A", "end": "B", "distance": 10 }`
- **Status Codes**: `201 Created`, `400 Bad Request`

#### Get Route by ID

- **Method**: GET
- **Endpoint**: `/logistics/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Status Codes**: `200 OK`, `404 Not Found`

#### Update Route by ID

- **Method**: PUT
- **Endpoint**: `/logistics/:id`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
- **Body**: `{ "end": "C", "distance": 12 }`
- **Status Codes**: `200 OK`, `400 Bad Request`, `404 Not Found`

#### Delete Route by ID

- **Method**: DELETE
- **Endpoint**: `/logistics/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Status Codes**: `204 No Content`, `404 Not Found`

#### Get Optimal Route

- **Method**: POST
- **Endpoint**: `/logistics/optimize`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
- **Body**: `{ "routeIds": ["1", "2", "3"] }`
- **Status Codes**: `200 OK`, `400 Bad Request`

#### Get Coordinates

- **Method**: GET
- **Endpoint**: `/logistics/coordinates/:address`
- **Headers**: `Authorization: Bearer <token>`
- **Status Codes**: `200 OK`, `404 Not Found`

### Notification API

#### Create Notification

- **Method**: POST
- **Endpoint**: `/api/notifications/`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "title": "NotificationTitle", "message": "NotificationMessage" }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new notification.
  - `400 Bad Request`: Invalid request payload.

#### Get All Notifications

- **Method**: GET
- **Endpoint**: `/api/notifications/`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved all notifications.
  - `404 Not Found`: No notifications exist.

#### Get Notification by ID

- **Method**: GET
- **Endpoint**: `/api/notifications/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the notification.
  - `404 Not Found`: Notification with the given ID does not exist.

#### Update Notification by ID

- **Method**: PUT
- **Endpoint**: `/api/notifications/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "title": "UpdatedNotificationTitle", "message": "UpdatedNotificationMessage" }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the notification.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Notification with the given ID does not exist.

#### Delete Notification by ID

- **Method**: DELETE
- **Endpoint**: `/api/notifications/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the notification.
  - `404 Not Found`: Notification with the given ID does not exist.

### Resource API

#### Create Resource

- **Method**: POST
- **Endpoint**: `/api/resources/`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "resourceName": "ResourceName", "quantity": 100 }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new resource.
  - `400 Bad Request`: Invalid request payload.

#### Get All Resources

- **Method**: GET
- **Endpoint**: `/api/resources/`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved all resources.
  - `404 Not Found`: No resources exist.

#### Get Resource by ID

- **Method**: GET
- **Endpoint**: `/api/resources/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the resource.
  - `404 Not Found`: Resource with the given ID does not exist.

#### Update Resource by ID

- **Method**: PUT
- **Endpoint**: `/api/resources/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "resourceName": "UpdatedResourceName", "quantity": 120 }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the resource.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Resource with the given ID does not exist.

#### Delete Resource by ID

- **Method**: DELETE
- **Endpoint**: `/api/resources/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the resource.
  - `404 Not Found`: Resource with the given ID does not exist.

### Transaction API

#### Create Transaction

- **Method**: POST
- **Endpoint**: `/api/transactions/`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "senderId": "123", "receiverId": "456", "amount": 1000 }`
- **Status Codes**: 
  - `201 Created`: Successfully created a new transaction.
  - `400 Bad Request`: Invalid request payload.

#### Get All Transactions

- **Method**: GET
- **Endpoint**: `/api/transactions/`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved all transactions.
  - `404 Not Found`: No transactions exist.

#### Get Transaction by ID

- **Method**: GET
- **Endpoint**: `/api/transactions/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `200 OK`: Successfully retrieved the transaction.
  - `404 Not Found`: Transaction with the given ID does not exist.

#### Update Transaction by ID

- **Method**: PUT
- **Endpoint**: `/api/transactions/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <authToken>`
- **Body**: `{ "amount": 1100 }`
- **Status Codes**: 
  - `200 OK`: Successfully updated the transaction.
  - `400 Bad Request`: Invalid request payload.
  - `404 Not Found`: Transaction with the given ID does not exist.

#### Delete Transaction by ID

- **Method**: DELETE
- **Endpoint**: `/api/transactions/:id`
- **Headers**: 
  - `Authorization: Bearer <authToken>`
- **Status Codes**: 
  - `204 No Content`: Successfully deleted the transaction.
  - `404 Not Found`: Transaction with the given ID does not exist.