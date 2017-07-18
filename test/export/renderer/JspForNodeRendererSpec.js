'use strict';

/**
 * Requirements
 */
const JspForNodeRenderer = require(JSP_SOURCE + '/export/renderer/JspForNodeRenderer.js').JspForNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspForNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspForNodeRenderer, 'export.renderer/JspForNodeRenderer', undefined, require('./RendererHelper.js').options());
});
