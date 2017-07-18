'use strict';

/**
 * Requirements
 */
const JspModuleClassesFilterRenderer = require(JSP_SOURCE + '/export/renderer/JspModuleClassesFilterRenderer.js').JspModuleClassesFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(JspModuleClassesFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(JspModuleClassesFilterRenderer, 'export.renderer/JspModuleClassesFilterRenderer', undefined, require('./RendererHelper.js').options());
});
