'use strict';

/**
 * Requirements
 */
const JspOperandNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspOperandNodeRenderer.js').JspOperandNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspOperandNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspOperandNodeRenderer, 'export.renderer/JspOperandNodeRenderer', undefined, require('./RendererHelper.js').options());
});
