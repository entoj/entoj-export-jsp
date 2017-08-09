'use strict';

/**
 * Requirements
 */
const JspEmptyTransformer = require(JSP_SOURCE + '/export/transformer/JspEmptyTransformer.js').JspEmptyTransformer;
const nodeTransformerSpec = require('entoj-system/test').export.NodeTransformerShared;


/**
 * Spec
 */
describe(JspEmptyTransformer.className, function()
{
    /**
     * NodeTransformer Test
     */
    const options =
    {
        basePath: JSP_FIXTURES + '/transformer'
    };
    const testFixtures =
    {
        'should decorate variables': 'JspEmptyTransformer'
    };
    nodeTransformerSpec(JspEmptyTransformer, 'export.transformer/JspEmptyTransformer', undefined, testFixtures, options);
});
