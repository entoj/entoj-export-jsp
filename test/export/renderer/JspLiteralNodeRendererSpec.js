'use strict';

/**
 * Requirements
 */
const JspLiteralNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspLiteralNodeRenderer.js').JspLiteralNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspLiteralNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspLiteralNodeRenderer, 'export.renderer/JspLiteralNodeRenderer', undefined, require('./RendererHelper.js').options());
});
