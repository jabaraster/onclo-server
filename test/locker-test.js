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

describe('locker - data is empty', () => {
    let res = 'unset';
    before('before', (done) => {
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

describe('locker - mode is open', () => {
    let res = 'unset';
    before('before', (done) => {
        async.series([
            (callback) => {
                sut.deleteAllAsync(event, context, () => {
                    callback(null, {});
                });
            },
            (callback) => {
                sut.setModeClose(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
            (callback) => {
                sut.setModeOpen(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
            (callback) => {
                sut.getMode(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
        ], (err, results) => {
            res = JSON.parse(results[2].body)
            done();
        });
    });
    it('mode is open', () => {
        expect(res.mode).to.equal('open');
    });
});

describe('locker - mode is close', () => {
    let res = 'unset';
    before('before', (done) => {
        async.series([
            (callback) => {
                sut.deleteAllAsync(event, context, () => {
                    callback(null, {});
                });
            },
            (callback) => {
                sut.setModeOpen(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
            (callback) => {
                sut.setModeClose(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
            (callback) => {
                sut.getMode(event, context, (_, resp) => {
                    callback(null, resp);
                });
            },
        ], (err, results) => {
            res = JSON.parse(results[3].body)
            done();
        });
    });
    it('mode is close', () => {
        expect(res.mode).to.equal('close');
    });
});
