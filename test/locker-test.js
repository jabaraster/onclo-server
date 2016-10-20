'use strict';
const async = require('async');
const assert = require('assert');
const sut = require('../locker');

const event = {
    requestContext: {
        stage: 'dev',
    },
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
            sut.setModeOpen(event, null, (_, resp) => {
                callback();
            });
        },
        (callback) => {
                    console.log(555);
            sut.getMode(event, null, (_, resp) => {
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
        console.log(3333);
        console.log(err);
        console.log(result);
    });
    return ret;
};
