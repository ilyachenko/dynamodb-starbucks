const AWS = require("aws-sdk");

const fs = require("fs");

const ddb = new AWS.DynamoDB({
  region: "local",
  endpoint: "http://localhost:8000",
});

let count = 0;

async function saveLine(item) {
  const params = {
    TableName: "StarbucksLocations",
    Item: item,
    ReturnConsumedCapacity: "TOTAL",
  };

  await ddb.putItem(params).promise();

  count += 1;

  if (count % 1000 == 0) {
    console.timeEnd(count + " items written");
  }
}

const text = fs.readFileSync("./Starbucks.json", "utf8");

const items = JSON.parse(text).Items;

console.log(`Items count ${items.length}`);

items.map((item, index) => {
  if ((index + 1) % 1000 == 0) {
    console.time(index + 1 + " items written");
    console.log(index + 1 + " items were sent");
  }
  saveLine(item);
});
