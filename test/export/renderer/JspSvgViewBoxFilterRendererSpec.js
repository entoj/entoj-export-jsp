'use strict';

/**
 * Requirements
 */
const JspSvgViewBoxFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspSvgViewBoxFilterRenderer.js').JspSvgViewBoxFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;
const projecFixture = require('entoj-system/test').fixture.project;
const co = require('co');


/**
 * Spec
 */
describe(JspSvgViewBoxFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [global.fixtures.pathesConfiguration];
    };
    const fixtureConfiguration =
    {
        settings:
        {
            jsp:
            {
                svgBaseUrl: '/base/global/assets/icons'
            }
        }
    };
    nodeRendererSpec(JspSvgViewBoxFilterRenderer,
        'export.renderer/JspSvgViewBoxFilterRenderer', prepareParameters,
        require('./RendererHelper.js').options(false, fixtureConfiguration));

    /**
     * JspSvgViewBoxFilterRenderer Test
     */
    describe('#createAdditionalFiles', function()
    {
        it('should create a map of the viewBoxes of all found svgs', function()
        {
            const promise = co(function*()
            {
                const fixture = projecFixture.createDynamic(
                    {
                        settings:
                        {
                            jsp:
                            {
                                svgBasePath: '/base/global/assets/svg'
                            }
                        }
                    });
                const configuration = fixture.context.di.create(require(JSP_SOURCE + '/export/JspConfiguration.js').JspConfiguration);
                const testee = new JspSvgViewBoxFilterRenderer(fixture.pathesConfiguration);
                const files = yield testee.createAdditionalFiles(configuration, 'prepare');
                expect(files).to.have.length(1);
                expect(files[0].contents.toString()).to.contain('{"arrow":"0 0 82.42 154.57"}');
            });
            return promise;
        });
    });
});
