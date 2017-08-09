'use strict';

/**
 * Exports
 * @ignore
 */
module.exports.options = function(dynamic, fixtureConfiguration)
{
    const result =
    {
        configurationCreator: function(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration)
        {
            const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
            const JspConfiguration = require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration;
            const fluidModuleConfiguration = new JspModuleConfiguration(global.fixtures.globalConfiguration);
            return new JspConfiguration(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, fluidModuleConfiguration);
        },
        basePath: JSP_FIXTURES + '/nodeRenderer'
    };
    if (dynamic === true)
    {
        result.createFixture = () => require('entoj-system/test').fixture.project.createDynamic(fixtureConfiguration);
    }
    else
    {
        result.createFixture = () => require('entoj-system/test').fixture.project.createStatic(fixtureConfiguration);
    }
    result.resultExtension = '.jsp';
    return result;
};
