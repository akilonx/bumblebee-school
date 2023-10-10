import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB({
  endpoint: new AWS.Endpoint("http://dynamodb-local:8000"),
  sslEnabled: false,
  region: "local-env",
});

dynamodb.listTables({}, (err, data) => {
  if (err) {
    console.error("Error listing tables:", err);
  } else {
    console.log("Tables found:", data.TableNames);
    if (data.TableNames && data.TableNames.length > 0) {
      process.exit(0);
    }
  }
});

dynamodb.createTable(
  {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
      {
        AttributeName: "sk",
        AttributeType: "S",
      },
      {
        AttributeName: "pk2",
        AttributeType: "S",
      },
      {
        AttributeName: "sk2",
        AttributeType: "S",
      },
    ],

    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
    GlobalSecondaryIndexes: [
      {
        IndexName: "index1",
        KeySchema: [
          {
            AttributeName: "pk",
            KeyType: "HASH",
          },
          {
            AttributeName: "sk",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
      {
        IndexName: "index2",
        KeySchema: [
          {
            AttributeName: "pk2",
            KeyType: "HASH",
          },
          {
            AttributeName: "sk2",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
    ],
    TableName: "dev-bumblebeeapi-serverless-single-table",
  },
  (err, data) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created successfully:", data);
    }
  }
);
