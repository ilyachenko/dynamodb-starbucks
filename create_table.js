const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
});

const params = {
  AttributeDefinitions: [
    {
      AttributeName: "Country",
      AttributeType: "S",
    },
    {
      AttributeName: "StateCityPostcode",
      AttributeType: "S",
    },
    {
      AttributeName: "StoreNumber",
      AttributeType: "S",
    },
  ],
  TableName: "StarbucksLocations",
  KeySchema: [
    {
      AttributeName: "StoreNumber",
      KeyType: "HASH",
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "StoreLocationIndex",
      KeySchema: [
        {
          AttributeName: "Country",
          KeyType: "HASH",
        },
        {
          AttributeName: "StateCityPostcode",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

ddb.createTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table created successfully!");
  }
});
