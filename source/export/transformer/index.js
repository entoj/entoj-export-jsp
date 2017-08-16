/**
 * @namespace export.renderer
 */
module.exports =
{
    JspConcatTransformer: require('./JspConcatTransformer.js').JspConcatTransformer,
    JspEmptyTransformer: require('./JspEmptyTransformer.js').JspEmptyTransformer,

    transformerList:
    [
        require('entoj-system').export.transformer.RemoveLoadModelTransformer,
        require('./JspConcatTransformer.js').JspConcatTransformer,
        require('./JspEmptyTransformer.js').JspEmptyTransformer,
        require('./JspInlineMacroCallTransformer.js').JspInlineMacroCallTransformer
    ]
};
