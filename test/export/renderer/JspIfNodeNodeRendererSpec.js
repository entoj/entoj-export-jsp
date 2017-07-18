'use strict';

/**
 * Requirements
 */
const JspIfNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspIfNodeRenderer.js').JspIfNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspIfNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspIfNodeRenderer, 'export.renderer/JspIfNodeRenderer', undefined, require('./RendererHelper.js').options());
});
