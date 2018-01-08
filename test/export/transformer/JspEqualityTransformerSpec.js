'use strict';

/**
 * Requirements
 */
const JspEqualityTransformer = require(JSP_SOURCE + '/export/transformer/JspEqualityTransformer.js').JspEqualityTransformer;
const nodeTransformerSpec = require('entoj-system/test').export.NodeTransformerShared;


/**
 * Spec
 */
describe(JspEqualityTransformer.className, function()
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
        'should decorate variables': 'JspEqualityTransformer'
    };
    nodeTransformerSpec(JspEqualityTransformer, 'export.transformer/JspEqualityTransformer', undefined, testFixtures, options);
});
