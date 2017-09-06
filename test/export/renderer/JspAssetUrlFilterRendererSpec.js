'use strict';

/**
 * Requirements
 */
const JspAssetUrlFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspAssetUrlFilterRenderer.js').JspAssetUrlFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspAssetUrlFilterRenderer.className, function()
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
                assetBaseUrl: '/base/global/assets'
            }
        }
    };
    nodeRendererSpec(JspAssetUrlFilterRenderer,
        'export.renderer/JspAssetUrlFilterRenderer', undefined,
        require('./RendererHelper.js').options(false, fixtureConfiguration));
});
