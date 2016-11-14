
const response = (callback, statusCode, body) => {
    callback(null, {
        statusCode: statusCode,
        body: JSON.stringify(body),
    });
};

module.exports = {
    getMeta: (event, context, callback) => {
        response(callback, 200, {
            context: context,
            event: event,
        });
    },
};
