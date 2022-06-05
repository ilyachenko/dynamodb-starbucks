const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "local",
});

const params = {
  TableName: "StarbucksLocations",
  Key: {
    StoreNumber: { S: "5860-29255" },
  },
};

ddb.getItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data.Item);
  }
});
