'use strict';

const async = require('async');
const assert = require('assert');
const expect = require('chai').expect;
const sut = require('../locker');

const event = {
    requestContext: {
        stage: 'dev',
    },
};

describe('locker', () => {
    let res = 'unset';

    res = 'unset';
    before('before mode to close', (done) => {
        async.series([
            (callback) => {
                sut.deleteAllAsync(event, () => {
                    callback(null, {});
                });
            },
            (callback) => {
                sut.getMode(event, null, (_, resp) => {
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

//    before('before mode to close', (done) => {
//        async.series([
//            (callback) => {
//                sut.setModeClose(event, null, (_, resp) => {
//                    callback(null, resp);
//                });
//            },
//            (callback) => {
//                sut.getMode(event, null, (_, resp) => {
//                    callback(null, resp);
//                });
//            },
//        ], (err, results) => {
//            res = JSON.parse(results[1].body)
//            done();
//        });
//    });
//    it('mode to close', () => {
//        expect(res.mode).to.equal('close');
//    });
//
//    res = 'unset';
//    before('before mode to open', (done) => {
//        async.series([
//            (callback) => {
//                sut.setModeOpen(event, null, (_, resp) => {
//                    callback(null, resp);
//                });
//            },
//            (callback) => {
//                sut.getMode(event, null, (_, resp) => {
//                    callback(null, resp);
//                });
//            },
//        ], (err, results) => {
//            res = JSON.parse(results[1].body)
//            done();
//        });
//    });
//    it('mode to open', () => {
//        expect(res.mode).to.equal('open');
//    });
});
