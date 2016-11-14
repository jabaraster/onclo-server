const AWS = require('aws-sdk');
const sut = require('./locker');

const tableName = 'dev-locker';

const event = {
    requestContext: {
        stage: 'dev',
    },
};
const context = {
    DynamoDB: new AWS.DynamoDB({
        region: 'ap-northeast-1',
        endpoint: 'http://localhost:8000',
    }),
};

sut.getAll(event, context, (err, data) => {
    console.log(data);
});
