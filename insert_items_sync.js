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

  await ddb.putItem(params).promise();
}

const text = fs.readFileSync("./Starbucks.json", "utf8");

const items = JSON.parse(text).Items;

console.log(`Items count ${items.length}`);

(async function () {
  console.time("Time");
  for (let i = 0; i < items.length; ) {
    await saveLine(items[i]);
    if (++i % 1000 == 0) {
      console.log(`${i} items written`);
    }
  }
  console.timeEnd("Time");
})();
