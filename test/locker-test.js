'use strict';

const async = require('async');
const assert = require('assert');
const AWS = require('aws-sdk');
const expect = require('chai').expect;
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
    let res = 'unset';

    res = 'unset';
    before('before mode to close', (done) => {
        async.series([
            (callback) => {
                sut.deleteAllAsync(event, context, () => {
                    callback(null, {});
                });
            },
            (callback) => {
                sut.getMode(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
        ], (err, results) => {
            res = JSON.parse(results[1].body)
            done();
        });
    });
    it('mode is close where table is empty', () => {
        expect(res.mode).to.equal('close');
    });
});
