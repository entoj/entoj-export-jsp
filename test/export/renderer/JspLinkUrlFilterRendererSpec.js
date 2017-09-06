'use strict';

/**
 * Requirements
 */
const JspLinkUrlFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspLinkUrlFilterRenderer.js').JspLinkUrlFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspLinkUrlFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [['url']];
    };
    nodeRendererSpec(JspLinkUrlFilterRenderer, 'export.renderer/JspLinkUrlFilterRenderer', prepareParameters, require('./RendererHelper.js').options());
});
