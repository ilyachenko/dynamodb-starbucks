const AWS = require("aws-sdk");

const fs = require("fs");

const ddb = new AWS.DynamoDB({
  region: "local",
  endpoint: "http://localhost:8000",
});

const text = fs.readFileSync("./Starbucks.json", "utf8");

const items = JSON.parse(text).Items;

const chunkSize = 25;

let count = 0;

const chunks = [];

for (let i = 0; i < items.length; i += chunkSize) {
  const chunk = items.slice(i, i + chunkSize);
  chunks.push(chunk);
}

console.log(`${chunks.length} chunks of 25 items each`);

async function saveItems(items) {
  const params = {
    RequestItems: {
      StarbucksLocations: items.map((item) => {
        return {
          PutRequest: {
            Item: { ...item },
          },
        };
      }),
    },
  };

  await ddb.batchWriteItem(params).promise();

  count += 25;

  if (count % 1000 == 0) {
    console.timeEnd(count + " items written");
  }
}

chunks.map((chunk, index) => {
  if (index !== 0 && (index * 25) % 1000 == 0) {
    console.time(index * 25 + " items written");
    console.log(index * 25 + " items were sent ");
  }
  saveItems(chunk);
});
