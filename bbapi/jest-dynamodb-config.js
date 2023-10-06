module.exports = {
  tables: [
    {
      TableName: "dev-bumblebee-serverless-single-table",
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
      TimeToLiveSpecification: {
        AttributeName: "ttl",
        Enabled: true,
      },
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
    },
  ],
};
