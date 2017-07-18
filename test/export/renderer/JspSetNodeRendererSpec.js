'use strict';

/**
 * Requirements
 */
const JspSetNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspSetNodeRenderer.js').JspSetNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspSetNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspSetNodeRenderer, 'export.renderer/JspSetNodeRenderer', undefined, require('./RendererHelper.js').options());
});
