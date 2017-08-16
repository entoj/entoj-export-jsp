/**
 * @namespace export.renderer
 */
module.exports =
{
    JspInlineMacroCallTransformer: require('entoj-system').export.transformer.InlineMacroCallTransformer,
    JspRemoveLoadModelTransformer: require('entoj-system').export.transformer.RemoveLoadModelTransformer,
    JspConcatTransformer: require('./JspConcatTransformer.js').JspConcatTransformer,
    JspEmptyTransformer: require('./JspEmptyTransformer.js').JspEmptyTransformer
};
