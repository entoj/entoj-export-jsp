'use strict';

/**
 * Requirements
 */
const JspVariableNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspVariableNodeRenderer.js').JspVariableNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspVariableNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspVariableNodeRenderer, 'export.renderer/JspVariableNodeRenderer', undefined, require('./RendererHelper.js').options());
});
