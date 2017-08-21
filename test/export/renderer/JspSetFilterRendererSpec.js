'use strict';

/**
 * Requirements
 */
const JspSetFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspSetFilterRenderer.js').JspSetFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspSetFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspSetFilterRenderer, 'export.renderer/JspSetFilterRenderer', undefined, require('./RendererHelper.js').options());
});
