'use strict';

/**
 * Configure path
 */
const path = require('path');
global.JSP_SOURCE = path.resolve(__dirname + '/../source');
global.JSP_FIXTURES = path.resolve(__dirname + '/__fixtures__');
global.JSP_TEST = __dirname;


/**
 * Configure chai
 */
const chai = require('chai');
chai.config.includeStack = true;
global.expect = chai.expect;
