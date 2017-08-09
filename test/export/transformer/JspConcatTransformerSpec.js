'use strict';

/**
 * Requirements
 */
const JspConcatTransformer = require(JSP_SOURCE + '/export/transformer/JspConcatTransformer.js').JspConcatTransformer;
const nodeTransformerSpec = require('entoj-system/test').export.NodeTransformerShared;


/**
 * Spec
 */
describe(JspConcatTransformer.className, function()
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
        'should replace string concats with concat() calls': 'JspConcatTransformer'
    };
    nodeTransformerSpec(JspConcatTransformer, 'export.transformer/JspConcatTransformer', undefined, testFixtures, options);
});
