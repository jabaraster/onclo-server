'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
        region: 'ap-northeast-1',
        endpoint: 'http://localhost:8000',
});

const response = (callback, statusCode, body) => {
    callback(null, {
        statusCode: statusCode,
        body: JSON.stringify(body),
    });
};

const setMode = (event, mode, callback) => {
    const param = {
        TableName: `${event.requestContext.stage}-locker`,
        Item: {
            partition: {'S': 'mode'},
            created: {'N': (+new Date())+''},
            mode: {'S': mode},
        },
    };
    dynamodb.putItem(param, (err, data) => {
        if (err) {
            response(callback, 500, {
                error: err,
            });
            return;
        }
        response(callback, 201, {
            message: 'created',
            mode: mode,
        });
    });
};

module.exports = {
    setModeOpen: (event, context, callback) => {
        setMode(event, 'open', callback);
    },
    setModeClose: (event, context, callback) => {
        setMode(event, 'close', callback);
    },
    getMode: (event, context, callback) => {
        const param = {
            TableName: `${event.requestContext.stage}-locker`,
            KeyConditionExpression: '#part = :partition',
            ExpressionAttributeNames: {
                '#part': 'partition',
            },
            ExpressionAttributeValues: {
                ':partition': {S:'mode'},
            },
            ScanIndexForward: false,
            Limit: 1,
        };
        dynamodb.query(param, (err, data) => {
            if (err) {
                response(callback, 500, {
                    error: err,
                });
                return;
            }
            if (data.Items.length == 0) {
                response(callback, 200, {
                    mode: 'close',
                });
                return;
            }
            response(callback, 200, {
                mode: data.Items[0].mode.S,
            });
        });
    },
};
