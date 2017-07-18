'use strict';

/**
 * Requirements
 */
const JspOutputNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspOutputNodeRenderer.js').JspOutputNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspOutputNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspOutputNodeRenderer, 'export.renderer/JspOutputNodeRenderer', undefined, require('./RendererHelper.js').options());
});
