'use strict';

/**
 * Requirements
 */
const JspMarkupFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspMarkupFilterRenderer.js').JspMarkupFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspMarkupFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspMarkupFilterRenderer, 'export.renderer/JspMarkupFilterRenderer', undefined, require('./RendererHelper.js').options());
});
