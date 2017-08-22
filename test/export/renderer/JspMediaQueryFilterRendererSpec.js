'use strict';

/**
 * Requirements
 */
const JspMediaQueryFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspMediaQueryFilterRenderer.js').JspMediaQueryFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspMediaQueryFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    const prepareParameters = () =>
    {
        return [global.fixtures.globalConfiguration];
    };
    nodeRendererSpec(JspMediaQueryFilterRenderer, 'export.renderer/JspMediaQueryFilterRenderer', prepareParameters, require('./RendererHelper.js').options());
});
