'use strict';

/**
 * Requirements
 */
const JspTranslateFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspTranslateFilterRenderer.js').JspTranslateFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspTranslateFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspTranslateFilterRenderer,
        'export.renderer/JspTranslateFilterRenderer', undefined,
        require('./RendererHelper.js').options());
});
