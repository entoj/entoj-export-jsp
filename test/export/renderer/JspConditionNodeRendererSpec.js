'use strict';

/**
 * Requirements
 */
const JspConditionNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspConditionNodeRenderer.js').JspConditionNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspConditionNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspConditionNodeRenderer, 'export.renderer/JspConditionNodeRenderer', undefined, require('./RendererHelper.js').options());
});
