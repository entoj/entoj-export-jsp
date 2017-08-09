'use strict';

/**
 * Requirements
 */
const JspFormatDateFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspFormatDateFilterRenderer.js').JspFormatDateFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspFormatDateFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [global.fixtures.globalConfiguration];
    };
    nodeRendererSpec(JspFormatDateFilterRenderer, 'export.renderer/JspFormatDateFilterRenderer', prepareParameters, require('./RendererHelper.js').options());
});
