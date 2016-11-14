'use strict';

const crypto = require('crypto');

const response = (callback, statusCode, body) => {
    callback(null, {
        statusCode: statusCode,
        body: JSON.stringify(body),
    });
};

module.exports = {
    getMonthSchedule: (event, context, callback) => {
        response(callback, 200, {
            context: context,
            event: event,
        });
    },
    getRandom: (e, c, callback) => {
        response(callback, 200, { random: crypto.randomBytes(8).toString('hex') })
    },
};
