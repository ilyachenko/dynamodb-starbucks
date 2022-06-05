# Modeling Hierarchical Data with DynamoDB

This example was rewritten from Python to NodeJs. The original idea belongs to [dynamodbguide.com](https://www.dynamodbguide.com/hierarchical-data). It uses a real dataset with 25,000 Starbucks locations.

[Set up DynamoDB Local](https://www.dynamodbguide.com/environment-setup#optional-use-dynamodb-local).

Delete table:

1. Create table (`create_table.js`)
2. Insert items (`insert_items.js`)
3. Get item by Store Number (`get_item.js`)
4. Query store by Primary Key (`query_by_hash.js`)
5. Query store by Index (`query_by_index.js`)
6. Delete table `aws dynamodb delete-table --table-name StarbucksLocations --endpoint-url http://localhost:8000`