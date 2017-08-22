'use strict';

/**
 * Requirements
 */
const JspSvgViewBoxFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspSvgViewBoxFilterRenderer.js').JspSvgViewBoxFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


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
});
