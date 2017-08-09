'use strict';

/**
 * Requirements
 */
const JspExporter = require(JSP_SOURCE + '/export/JspExporter.js').JspExporter;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const JspRenderer = require(JSP_SOURCE + '/export/JspRenderer.js').JspRenderer;
const JspTransformer = require(JSP_SOURCE + '/export/JspTransformer.js').JspTransformer;
const exporterSpec = require('entoj-system/test').export.ExporterShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(JspExporter.className, function()
{
    /**
     * Configuration Test
     */
    function prepareParameters(parameters)
    {
        const fixture = projectFixture.createStatic(true);
        const moduleConfiguration = new JspModuleConfiguration(fixture.globalConfiguration);
        const jspRenderer = new JspRenderer();
        const jspTransformer = new JspTransformer();
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration, jspRenderer, jspTransformer);
            return parameters;
        }
        else
        {
            return [fixture.globalRepository, fixture.buildConfiguration, moduleConfiguration, jspRenderer, jspTransformer];
        }
    }

    exporterSpec(JspExporter, 'export/JspExporter', prepareParameters);
});
