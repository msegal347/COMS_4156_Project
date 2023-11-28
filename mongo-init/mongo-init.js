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

// Users Collection
db.createCollection('Users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'role'],
      properties: {
        email: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        role: {
          enum: ['source', 'sink', 'auditor', 'admin'],
          description: 'can only be one of the enumerated values and is required'
        },
      },
    },
  },
  validationLevel: 'moderate',
  validationAction: 'warn',
});

// Entity Profiles Collection
db.createCollection('EntityProfiles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['entityID', 'role', 'apiKey', 'coordinates'],
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
        coordinates: {
          bsonType: 'object',
          required: ['latitude', 'longitude'],
          properties: {
            latitude: {
              bsonType: 'double',
            },
            longitude: {
              bsonType: 'double',
            },
          },
        },
      },
    },
  },
  validationLevel: 'moderate',
  validationAction: 'warn',
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
          required: ['type', 'quantity', 'expirationDate'],
          properties: {
            type: {
              bsonType: 'string',
            },
            quantity: {
              bsonType: 'int',
              minimum: 0, 
            },
            expirationDate: {
              bsonType: 'date',
            },
          },
        },
      },
    },
  },
  validationLevel: 'moderate',
  validationAction: 'warn',
});


// Transaction History Collection
db.createCollection('Transactions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['transactionID', 'sourceID', 'sinkID', 'resourceID', 'timestamp'],
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
        timestamp: {
          bsonType: 'date',
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
          required: ['latitude', 'longitude'],
          properties: {
            latitude: {
              bsonType: 'double',
            },
            longitude: {
              bsonType: 'double',
            },
          },
        },
        dropOffLocation: {
          bsonType: 'object',
          required: ['latitude', 'longitude'],
          properties: {
            latitude: {
              bsonType: 'double',
            },
            longitude: {
              bsonType: 'double',
            },
          },
        },
        status: {
          enum: ['scheduled', 'in_transit', 'completed', 'cancelled'],
          description: 'status can be one of the enum values',
        },
      },
    },
  },
});

// API Keys Collection
db.createCollection('APIKeys', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['apiKey', 'entityID'],
      properties: {
        apiKey: {
          bsonType: 'string',
        },
        entityID: {
          bsonType: 'string',
        },
      },
    },
  },
});

// Notifications Collection
db.createCollection('Notifications', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['notificationID', 'type', 'status'],
      properties: {
        notificationID: {
          bsonType: 'string',
        },
        type: {
          bsonType: 'string',
        },
        status: {
          enum: ['sent', 'pending', 'failed'],
          description: 'status can be one of the enum values',
        },
      },
    },
  },
});

// Analytics Data Collection
db.createCollection('Analytics', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['analyticsID', 'data'],
      properties: {
        analyticsID: {
          bsonType: 'string',
        },
        data: {
          bsonType: 'object',
        },
      },
    },
  },
});

// Creating indexes for optimization
db.EntityProfiles.createIndex({ coordinates: '2dsphere' });
db.Inventory.createIndex({ 'metadata.type': 1 });
db.Transactions.createIndex({ timestamp: -1 });
db.Logistics.createIndex({ 'pickupLocation.latitude': 1, 'pickupLocation.longitude': 1 });
db.Logistics.createIndex({ 'dropOffLocation.latitude': 1, 'dropOffLocation.longitude': 1 });

// Seed the database
db.EntityProfiles.insertOne({ entityID: 'test_entity', role: 'source', apiKey: 'key', coordinates: { latitude: 0.5, longitude: 0.5 } });
db.Inventory.insertOne({
  resourceID: 'test_resource',
  metadata: {
    type: 'Apples',
    quantity: 100, 
    expirationDate: new Date()
  }
});
db.Transactions.insertOne({ transactionID: 'test_transaction', sourceID: 'test_entity', sinkID: 'test_entity', resourceID: 'test_resource', timestamp: new Date() });
db.Logistics.insertOne({ logisticsID: 'test_logistics', pickupLocation: { latitude: 0.5, longitude: 0.5 }, dropOffLocation: { latitude: 0.5, longitude: 0.5 }, status: 'scheduled' });
db.APIKeys.insertOne({ apiKey: 'test_apikey', entityID: 'test_entity' });
db.Notifications.insertOne({ notificationID: 'test_notification', type: 'type', status: 'sent' });
db.Analytics.insertOne({ analyticsID: 'test_analytics', data: {} });
