'use strict';

/**
 * Requirements
 */
const JspRenderer = require(JSP_SOURCE + '/export/JspRenderer.js').JspRenderer;
const JspConfiguration = require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration;
const JspModuleConfiguration = require(JSP_SOURCE + '/configuration/JspConfiguration.js').JspConfiguration;
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
        //'should render conditions': 'conditions',
        //'should render loops': 'loops',
        'should render filter': 'filter'
        //'should render assignments': 'assignments',
        //'should render calls': 'calls'
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
    rendererSpec(JspRenderer, 'export/JspRenderer', undefined, testFixtures, options);
});
