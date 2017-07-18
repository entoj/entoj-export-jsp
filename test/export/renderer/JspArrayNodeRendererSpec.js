'use strict';

/**
 * Requirements
 */
const JspArrayNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspArrayNodeRenderer.js').JspArrayNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspArrayNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspArrayNodeRenderer, 'export.renderer/JspArrayNodeRenderer', undefined, require('./RendererHelper.js').options());
});
