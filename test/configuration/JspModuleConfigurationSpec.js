'use strict';

/**
 * Requirements
 */
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const baseSpec = require('entoj-system/test').BaseShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(JspModuleConfiguration.className, function()
{
    /**
     * Base Test
     */
    baseSpec(JspModuleConfiguration, 'configuration/JspModuleConfiguration', () =>
    {
        return [global.fixtures.globalConfiguration, global.fixtures.buildConfiguration];
    });


    beforeEach(function()
    {
        global.fixtures = projectFixture.createStatic();
    });
});
