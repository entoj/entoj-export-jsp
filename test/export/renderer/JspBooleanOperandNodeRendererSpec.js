'use strict';

/**
 * Requirements
 */
const JspBooleanOperandNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspBooleanOperandNodeRenderer.js').JspBooleanOperandNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspBooleanOperandNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspBooleanOperandNodeRenderer, 'export.renderer/JspBooleanOperandNodeRenderer', undefined, require('./RendererHelper.js').options());
});
