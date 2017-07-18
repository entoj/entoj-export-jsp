'use strict';

/**
 * Requirements
 */
const JspDefaultFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspDefaultFilterRenderer.js').JspDefaultFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspDefaultFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspDefaultFilterRenderer, 'export.renderer/JspDefaultFilterRenderer', undefined, require('./RendererHelper.js').options());
});
