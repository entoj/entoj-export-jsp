'use strict';

/**
 * Requirements
 */
const JspImageUrlFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspImageUrlFilterRenderer.js').JspImageUrlFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspImageUrlFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [['url']];
    };
    nodeRendererSpec(JspImageUrlFilterRenderer, 'export.renderer/JspImageUrlFilterRenderer', prepareParameters, require('./RendererHelper.js').options());
});
