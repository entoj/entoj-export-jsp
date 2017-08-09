'use strict';

/**
 * Requirements
 */
const JspUniqueFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspUniqueFilterRenderer.js').JspUniqueFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspUniqueFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspUniqueFilterRenderer, 'export.renderer/JspUniqueFilterRenderer', undefined, require('./RendererHelper.js').options());
});
