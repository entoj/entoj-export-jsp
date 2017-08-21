'use strict';

/**
 * Requirements
 */
const JspConfiguration = require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const configurationSpec = require('entoj-system/test').export.ConfigurationShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(JspConfiguration.className, function()
{
    /**
     * Configuration Test
     */
    function prepareParameters(parameters)
    {
        const fixture = projectFixture.createStatic(true);
        const moduleConfiguration = new JspModuleConfiguration(fixture.globalConfiguration, fixture.buildConfiguration);
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration);
            return parameters;
        }
        else
        {
            return [undefined, undefined, {}, undefined, undefined, undefined, fixture.globalRepository, fixture.buildConfiguration, moduleConfiguration];
        }
    }

    configurationSpec(JspConfiguration, 'export/JspConfiguration', prepareParameters, { identifier: 'jsp' });
});
