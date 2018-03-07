'use strict';

/**
 * Requirements
 */
const JspGetFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspGetFilterRenderer.js').JspGetFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspGetFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspGetFilterRenderer, 'export.renderer/JspGetFilterRenderer', undefined, require('./RendererHelper.js').options());
});
