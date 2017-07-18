'use strict';

/**
 * Requirements
 */
const JspExpressionNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspExpressionNodeRenderer.js').JspExpressionNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspExpressionNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspExpressionNodeRenderer, 'export.renderer/JspExpressionNodeRenderer', undefined, require('./RendererHelper.js').options());
});
