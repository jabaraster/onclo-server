'use strict';
const async = require('async');
const assert = require('assert');
const AWS = require('aws-sdk');
const sut = require('../locker');

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

describe('locker', () => {
    it ('mode', () => {
        console.log(done());
    });
});

const done = () => {
    var ret = 'unset';
    const test = [
        (callback) => {
            sut.setModeOpen(event, context, (_, resp) => {
                callback(null, {});
            });
        },
        (callback) => {
            sut.getMode(event, context, (_, resp) => {
                callback(null, resp);
            });
        }
//
//        (callback) => {
//            sut.setModeOpen(event, null, (_, resp) => {
//                callback();
//            });
//        },
//        (callback) => {
//            sut.getMode(event, null, (_, resp) => {
//                assert.equal('open', JSON.parse(resp.body).mode);
//                callback();
//            });
//        },
//
//        (callback) => {
//            sut.setModeClose(event, null, (_, resp) => {
//                callback();
//            });
//        },
//        (callback) => {
//            sut.getMode(event, null, (_, resp) => {
//                assert.equal('close', JSON.parse(resp.body).mode);
//                callback();
//            });
//        },
    ];
    async.series(test, (err, results) => {
        ret = results;
    });
    return ret;
};
