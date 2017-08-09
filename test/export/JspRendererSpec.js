'use strict';

/**
 * Requirements
 */
const JspRenderer = require(JSP_SOURCE + '/export/JspRenderer.js').JspRenderer;
const JspConfiguration = require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspModuleConfiguration.js').JspModuleConfiguration;
const JspNodeRenderers = require(JSP_SOURCE + '/export/renderer/index.js');
const rendererSpec = require('entoj-system/test').export.RendererShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(JspRenderer.className, function()
{
    /**
     * Renderer Test
     */
    const fixtureConfiguration =
    {
        settings:
        {
            jsp:
            {
                assetsBaseUrl: '/base/global/assets'
            }
        }
    };
    const testFixtures =
    {
        'should render conditions': 'conditions',
        'should render loops': 'loops',
        'should render filter': 'filter',
        'should render assignments': 'assignments',
        'should render calls': 'calls'
    };
    const options =
    {
        configurationCreator: function(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration)
        {
            const jspModuleConfiguration = new JspModuleConfiguration(global.fixtures.globalConfiguration);
            return new JspConfiguration(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, jspModuleConfiguration);
        },
        basePath: JSP_FIXTURES + '/renderer',
        createFixture: () => projectFixture.createDynamic(fixtureConfiguration)
    };
    const prepareParameters = (parameters) =>
    {
        const classes = Object.keys(JspNodeRenderers).map((name) => JspNodeRenderers[name]);
        const nodeRenderers = global.fixtures.context.createInstances(classes);
        return [nodeRenderers];
    };
    rendererSpec(JspRenderer, 'export/JspRenderer', prepareParameters, testFixtures, options);
});
