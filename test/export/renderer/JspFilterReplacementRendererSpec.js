'use strict';

/**
 * Requirements
 */
const JspFilterReplacementRenderer = require(JSP_SOURCE + '/export/renderer/JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspFilterReplacementRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspFilterReplacementRenderer, 'export.renderer/JspFilterReplacementRenderer', undefined, require('./RendererHelper.js').options());
});
