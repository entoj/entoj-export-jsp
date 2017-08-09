'use strict';

// Requirements
const Transformer = require('entoj-system').export.Transformer;


/**
 * @memberOf export
 * @extends export.Transformer
 */
class JspTransformer extends Transformer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/JspTransformer';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': ['export/JspTransformer.nodeTransformers'] };
    }
}


// Exports
module.exports.JspTransformer = JspTransformer;
