'use strict';

/**
 * Requirements
 */
const JspGroupNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspGroupNodeRenderer.js').JspGroupNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspGroupNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspGroupNodeRenderer, 'export.renderer/JspGroupNodeRenderer', undefined, require('./RendererHelper.js').options());
});
