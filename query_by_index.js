const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
});

const params = {
  TableName: "StarbucksLocations",
  // IndexName: "StoreLocationIndex",
  KeyConditionExpression: "Country = :country",
  // KeyConditionExpression: 'Country = :country AND begins_with(StateCityPostcode, :state)',
  ExpressionAttributeValues: {
    ":country": { S: "US" },
    // ':state': { "S": "CA" },
  },
  //   ProjectionExpression: "StoreName, State, Country",
  //   ExpressionAttributeNames: { "#state": "State" },
};

ddb.query(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.Items);
  }
});
