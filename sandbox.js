const sut = require('./locker');

const tableName = 'dev-locker';

const event = {
    requestContext: {
        stage: 'dev',
    },
};

sut.deleteAllAsync(event, (e,d) => {
    console.log(e);
    console.log(d);
});

//const event ={
//    requestContext: {
//        stage: 'dev',
//    },
//};
//
//sut.deleteAll(event);
//
//sut.getAll(event, (err, data) => {
//    console.log(data);
//});
