'use strict';

/**
 * Requirements
 */
const JspAttributesFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspAttributesFilterRenderer.js').JspAttributesFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspAttributesFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspAttributesFilterRenderer, 'export.renderer/JspAttributesFilterRenderer', undefined, require('./RendererHelper.js').options());
});
