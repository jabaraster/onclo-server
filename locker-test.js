'use strict';
const async = require('async');
const sut = require('./locker');

const event = {
    requestContext: {
        stage: 'dev',
    },
};

async.series([
    (callback) => {
        sut.setModeOpen(event, null, (_, resp) => {
            console.log(resp);
            callback();
        });
    },
    (callback) => {
        sut.getMode(event, null, (_, resp) => {
            // openでないといけない
            console.log(resp);
            callback();
        });
    },
    (callback) => {
        sut.setModeOpen(event, null, (_, resp) => {
            console.log(resp);
            callback();
        });
    },
    (callback) => {
        sut.getMode(event, null, (_, resp) => {
            // openでないといけない
            console.log(resp);
            callback();
        });
    },
    (callback) => {
        sut.setModeClose(event, null, (_, resp) => {
            console.log(resp);
            callback();
        });
    },
    (callback) => {
        sut.getMode(event, null, (_, resp) => {
            // closeでないといけない
            console.log(resp);
            callback();
        });
    },
]);
