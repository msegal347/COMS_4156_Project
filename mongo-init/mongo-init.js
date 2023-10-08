// Select the FoodLink database. If it doesn't exist, it will be created.
db = db.getSiblingDB('foodlink');

// Create a user for the FoodLink database
db.createUser(
  {
    user: 'foodlinkUser',
    pwd: 'foodlinkPassword',
    roles: [
      {
        role: 'readWrite',
        db: 'foodlink',
      },
    ],
  },
);

// Create collections

// Entity Profiles Collection
db.createCollection('EntityProfiles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['entityID', 'role', 'apiKey'],
      properties: {
        entityID: {
          bsonType: 'string',
        },
        role: {
          enum: ['source', 'sink'],
          description: 'role can only be "source" or "sink"',
        },
        apiKey: {
          bsonType: 'string',
        },
      },
    },
  },
});

// Resource Inventory Collection
db.createCollection('Inventory', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['resourceID', 'metadata'],
      properties: {
        resourceID: {
          bsonType: 'string',
        },
        metadata: {
          bsonType: 'object',
        },
      },
    },
  },
});

// Transaction History Collection
db.createCollection('Transactions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['transactionID', 'sourceID', 'sinkID', 'resourceID'],
      properties: {
        transactionID: {
          bsonType: 'string',
        },
        sourceID: {
          bsonType: 'string',
        },
        sinkID: {
          bsonType: 'string',
        },
        resourceID: {
          bsonType: 'string',
        },
      },
    },
  },
});

// Logistics Data Collection
db.createCollection('Logistics', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['logisticsID', 'pickupLocation', 'dropOffLocation', 'status'],
      properties: {
        logisticsID: {
          bsonType: 'string',
        },
        pickupLocation: {
          bsonType: 'object',
        },
        dropOffLocation: {
          bsonType: 'object',
        },
        status: {
          enum: ['scheduled', 'in_transit', 'completed', 'cancelled'],
          description: 'status can be one of the enum values',
        },
      },
    },
  },
});
