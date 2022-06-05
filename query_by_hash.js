const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
});

const params = {
  TableName: "StarbucksLocations",
  KeyConditionExpression: "StoreNumber = :number",
  ExpressionAttributeValues: {
    ":number": { S: "5860-29255" },
  },
};

ddb.query(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.Items);
  }
});
