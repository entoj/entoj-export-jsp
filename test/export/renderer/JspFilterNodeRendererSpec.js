'use strict';

/**
 * Requirements
 */
const JspFilterNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspFilterNodeRenderer.js').JspFilterNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspFilterNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspFilterNodeRenderer, 'export.renderer/JspFilterNodeRenderer', undefined, require('./RendererHelper.js').options());
});
