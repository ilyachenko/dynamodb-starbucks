const AWS = require("aws-sdk");

const fs = require("fs");

const ddb = new AWS.DynamoDB({
  region: "local",
  endpoint: "http://localhost:8000",
});

async function saveLine(item) {
  const params = {
    TableName: "StarbucksLocations",
    Item: item,
    ReturnConsumedCapacity: "TOTAL",
  };

  const res = await ddb.putItem(params).promise();
  count += 1;
  if (count % 1000 == 0) {
    console.log(count + " locations written...");
  }
}

const text = fs.readFileSync("./Starbucks.json", "utf8");

const items = JSON.parse(text).Items;

let count = 0;

items.map(async (item) => {
  await saveLine(item);
});
