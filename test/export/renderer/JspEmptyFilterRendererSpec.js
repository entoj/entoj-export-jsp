'use strict';

/**
 * Requirements
 */
const JspEmptyFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspEmptyFilterRenderer.js').JspEmptyFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspEmptyFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspEmptyFilterRenderer, 'export.renderer/JspEmptyFilterRenderer', undefined, require('./RendererHelper.js').options());
});
