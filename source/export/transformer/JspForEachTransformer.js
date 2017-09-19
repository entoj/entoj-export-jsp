'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeTransformer = require('entoj-system').export.transformer.NodeTransformer;


/**
 * Transforms iteration status to jsp names
 */
class JspForEachTransformer extends NodeTransformer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.transformer/JspForEachTransformer';
    }


    /**
     * @inheritDoc
     */
    transformNode(node, transformer, options)
    {
        if (node.is('VariableNode'))
        {
            // loop.length
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'length')
            {
                node.fields[1] = 'count';
            }
            // loop.isFirst
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'isFirst')
            {
console.log('WTF....', node.fields);
                node.fields[1] = 'first';
            }
            // loop.isLast
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'isLast')
            {
                node.fields[1] = 'last';
            }
            // loop.index0
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'index0')
            {
                node.fields[1] = 'index';
            }
        }
        return Promise.resolve(node);
    }
}

module.exports.JspForEachTransformer = JspForEachTransformer;
