'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    region: 'ap-northeast-1',
});

const db = (context) => {
    const c = context.DynamoDB;
    return c ? c : dynamodb;
};

const response = (callback, statusCode, body) => {
    callback(null, {
        statusCode: statusCode,
        body: JSON.stringify(body),
    });
};

const setMode = (event, context, mode, callback) => {
    const param = {
        TableName: `${event.requestContext.stage}-locker`,
        Item: {
            partition: {'S': 'mode'},
            created: {'N': (+new Date())+''},
            mode: {'S': mode},
        },
    };
    db(context).putItem(param, (err, data) => {
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

const getAll = (event, context, callback) => {
    const param = {
        TableName: `${event.requestContext.stage}-locker`,
    };
    db(context).scan(param, callback);
};

module.exports = {
    setModeOpen: (event, context, callback) => {
        setMode(event, context, 'open', callback);
    },
    setModeClose: (event, context, callback) => {
        setMode(event, context, 'close', callback);
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
        db(context).query(param, (err, data) => {
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
    getAll: getAll,
    deleteAll: (event, context) => {
        getAll(event, context, (err, data) => {
            if (err) throw err;
            data.Items.forEach((item) => {
                    console.log(item);
                const param = {
                    TableName: `${event.requestContext.stage}-locker`,
                    Key: {
                        partition: item.partition,
                        created: item.created,
                    },
                };
                db(context).deleteItem(param, (err, data) => {
                    console.log(err);
                    console.log(data);
                });
            });
        });
    },
    deleteAllAsync: (event, context, callback) => {
        const tableName = `${event.requestContext.stage}-locker`;
        db(context).scan({TableName:tableName}, (err, data) => {
            const fs = data.Items.map((item) => {
                return (callback) => {
                    db(context).deleteItem({
                        TableName: tableName,
                        Key: {
                            partition: item.partition,
                            created: item.created,
                        },
                    }, () => {callback(null, {});});
                };
            });
            require('async').series(fs, (err, results) => {
                callback(err, results);
            });
        });
    },
};
