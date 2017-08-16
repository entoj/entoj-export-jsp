'use strict';

/**
 * Requirements
 */
const JspSvgUrlFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspSvgUrlFilterRenderer.js').JspSvgUrlFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspSvgUrlFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
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
    nodeRendererSpec(JspSvgUrlFilterRenderer,
        'export.renderer/JspSvgUrlFilterRenderer', undefined,
        require('./RendererHelper.js').options(false, fixtureConfiguration));
});
