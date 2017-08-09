'use strict';

/**
 * Requirements
 */
const JspEscapeFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspEscapeFilterRenderer.js').JspEscapeFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspEscapeFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspEscapeFilterRenderer, 'export.renderer/JspEscapeFilterRenderer', undefined, require('./RendererHelper.js').options());
});
