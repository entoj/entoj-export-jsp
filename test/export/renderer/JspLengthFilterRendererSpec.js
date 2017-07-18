'use strict';

/**
 * Requirements
 */
const JspLengthFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspLengthFilterRenderer.js').JspLengthFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspLengthFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspLengthFilterRenderer, 'export.renderer/JspLengthFilterRenderer', undefined, require('./RendererHelper.js').options());
});
