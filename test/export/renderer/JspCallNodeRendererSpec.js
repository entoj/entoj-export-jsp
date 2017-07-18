'use strict';

/**
 * Requirements
 */
const JspCallNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspCallNodeRenderer.js').JspCallNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspCallNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspCallNodeRenderer, 'export.renderer/JspCallNodeRenderer', undefined, require('./RendererHelper.js').options(true));
});
