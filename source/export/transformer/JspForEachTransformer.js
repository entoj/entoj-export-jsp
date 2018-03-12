'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeTransformer = require('entoj-system').export.transformer.NodeTransformer;
const metrics = require('entoj-system').utils.performance.metrics;


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
        metrics.start(this.className + '::transformNode');

        if (node.is('VariableNode'))
        {
            // loop.length
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'length')
            {
                node.fields[1] = 'count';
            }
            // loop.index0
            if (node.fields.length === 2 &&
                node.fields[0] === 'loop' &&
                node.fields[1] === 'index0')
            {
                node.fields[1] = 'index';
            }
        }

        metrics.stop(this.className + '::transformNode');
        return Promise.resolve(node);
    }
}

module.exports.JspForEachTransformer = JspForEachTransformer;
