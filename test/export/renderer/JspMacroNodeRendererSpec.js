'use strict';

/**
 * Requirements
 */
const JspMacroNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspMacroNodeRenderer.js').JspMacroNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspMacroNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspMacroNodeRenderer, 'export.renderer/JspMacroNodeRenderer', undefined, require('./RendererHelper.js').options());
});
