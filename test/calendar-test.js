'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sut = require('../calendar');

sut.getRandom(null,null,(_, response) => {
    console.log(response);
});
