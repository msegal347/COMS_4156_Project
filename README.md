# COMS_4156_Project
Project Repo for Columbia's Advanced Software Engineering course

Our preliminary idea is to develop a food redistribution service called **FoodLink**, with the intent of reducing food waste and addressing food insecurity. FoodLink will act as a redistribution service that interacts with inventory management and analytics services, and will orchestrate the equitable redistribution of resources from sources to sinks using optimization algorithms. Additionally, FoodLink will provide API endpoints for monitoring and analytics.


### **Core Functionality**

1. **Entity Registration Service**: Provides APIs for inventory management systems to register as either sources or sinks, ensuring secure and systematic onboarding of entities that supply or demand resources.

1. **Resource Listing Service**: Offers APIs that allow inventory management systems to add, update, or delete items from a resource pool. These APIs ingest structured data, including relevant metadata like resource type, quantity, and expiration date.
2. **Resource Allocation and Optimization Service**: Provides APIs that consume resource requirements from sink systems and optimally match them with available supplies from source systems.
    1. **Optimization Algorithm**: Employs algorithms such as the Hopcroft-Karp algorithm to perform efficient matching based on criteria like geographical proximity, type of resource, expiration date, and other parameters.
3. **Logistics Scheduling Service**: Exposes APIs to handle the logistics of resource transit. These operations are based on the results from the optimization algorithm.
4. **Notification Service**: Offers APIs that issue notifications to inventory management systems regarding the status of matches, transit activities, etc. Additionally, it can trigger webhooks to notify other external systems.
5. **Monitoring and Analytics Service**: Provides APIs for querying analytics and statistical data useful for monitoring and reporting.

### **Persistent Data**

The service uses MongoDB collections to store the following types of data persistently:

1. **Inventory Entity Profiles**: Stored in a **`Entity Profiles`** collection, each document holds identification details and roles (either source or sink), along with potential API keys for secure interactions.
2. **Resource Inventory**: Stored in an **`Inventory`** collection, each document contains data about resources, such as unique identifiers and relevant metadata.
3. **Transaction History**: Captured in a **`Transactions`** collection, this stores a historical log of successful resource allocations between sources and sinks.
4. **Logistics Data**: Housed in a **`Logistics`** collection, this stores data related to the logistics of resource transit, such as pickup and delivery locations, timing, and statuses.

## **FoodLink's API Documentation**

---

### **1. Entity Registration**

- **`/inventory/register`**: POST request to create a new inventory entity profile with location coordinates.
    - Input: JSON object containing entity details and location information.
    - Output: Entity ID and coordinates.
- **`/inventory/{id}`**: GET, PUT, DELETE requests to manage an inventory entity profile by a given ID.

---

### **2. Resource Management**

- **`/inventory/resource`**: POST request to add a new resource item to the database.
    - Input: JSON object containing resource item details.
    - Output: Resource item ID.
- **`/inventory/resource/{id}`**: GET, PUT, DELETE requests to manage a resource item by ID.
- **`/inventory/resource/search`**: GET request to query the database for resource items based on criteria.

---

### **3. Resource Allocation and Optimization**

- **`/allocation`**: POST request for resource allocation based on the optimization algorithm.
    - Input: JSON object containing entity IDs, resource item IDs, and any constraints.
    - Output: Optimal allocation results.

---

### **4. Transaction Management**

- **`/transactions`**: POST request to initiate a new transaction.
    - Input: JSON object containing details of the transaction.
    - Output: Transaction ID.
- **`/transactions/{id}`**: GET, PUT, DELETE requests to manage a specific transaction.

---

### **5. Logistics Management**

- **`/logistics/schedule`**: POST request to schedule resource transit.
    - Input: JSON object containing entity IDs and timing details for pickup and drop-off.
    - Output: Logistics schedule ID.
- **`/logistics/{id}`**: GET, PUT, DELETE requests to manage a specific logistics entry.
- **`/logistics/optimize-route`**: POST request for route optimization using Google Maps Directions API.
    - Input: JSON object containing multiple locations for transit.
    - Output: Optimized route details.

---

### **6. Monitoring and Analytics**

- **`/analytics/overview`**: GET request for an overview of key performance indicators.
- **`/analytics/transactions`**: GET request for detailed transaction analytics.

---

### **7. Notifications and Alerts**

- **`/notifications`**: POST request to send a notification.
    - Input: JSON object containing notification details.
    - Output: Notification ID.
- **`/notifications/{id}`**: GET request to check the status of a notification.

---

### **8. Google Maps API Integration**

1. **Location Mapping**
    - Extend **`/inventory/register`** to include a location field.
    - A Geocoding API call converts the location to coordinates.
    - Coordinates are stored in MongoDB.
2. **Transit Distance and Time**
    - **`/logistics/schedule`** accepts optional parameters for entity coordinates.
    - A Distance Matrix API call informs the logistics scheduling algorithm.
3. **Route Optimization**
    - **`/logistics/optimize-route`** accepts multiple locations.
    - A Directions API call is made with the **`waypoints=optimize:true`** parameter.
    - The optimized route is stored in MongoDB.

---

### **9. Security Verification**

- Endpoint: **`/auth/verify`**
- Request Type: POST
- Input: API Key or OAuth Token from Inventory Management System.
- Output: 200 OK if verified, allowing further API interactions.
- Middleware:
    - Role: Validates incoming API keys or tokens.
    - Operation: Validates the API key or token against a list of authorized keys or tokens.
    - Outcome: If invalid, a 401 Unauthorized response is returned; otherwise, the request proceeds.
