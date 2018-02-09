'use strict';

/**
 * Requirements
 */
const JspComplexVariableNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspComplexVariableNodeRenderer.js').JspComplexVariableNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspComplexVariableNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspComplexVariableNodeRenderer, 'export.renderer/JspComplexVariableNodeRenderer', undefined, require('./RendererHelper.js').options(true));
});
