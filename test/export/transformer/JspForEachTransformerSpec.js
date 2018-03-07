'use strict';

/**
 * Requirements
 */
const JspForEachTransformer = require(JSP_SOURCE + '/export/transformer/JspForEachTransformer.js').JspForEachTransformer;
const nodeTransformerSpec = require('entoj-system/test').export.NodeTransformerShared;


/**
 * Spec
 */
describe(JspForEachTransformer.className, function()
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
        'should replace loop variables': 'JspForEachTransformer'
    };
    nodeTransformerSpec(JspForEachTransformer, 'export.transformer/JspForEachTransformer', undefined, testFixtures, options);
});
