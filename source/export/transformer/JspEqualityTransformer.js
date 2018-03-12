'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeTransformer = require('entoj-system').export.transformer.NodeTransformer;
const OperandNode = require('entoj-system').export.ast.OperandNode;
const metrics = require('entoj-system').utils.performance.metrics;


/**
 * Transforms boolean tests to their empty / not empty equivalents
 */
class JspEqualityTransformer extends NodeTransformer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.transformer/JspEqualityTransformer';
    }


    /**
     * @inheritDoc
     */
    transformNode(node, transformer, options)
    {
        metrics.start(this.className + '::transformNode');

        if (node.is('ConditionNode'))
        {
            for (const currentNode of node.children)
            {
                if (currentNode.is('OperandNode', {value: ['===']}))
                {
                    node.children.insertAfter(currentNode, new OperandNode({value: '=='}));
                    node.children.remove(currentNode);
                    continue;
                }
                else if (currentNode.is('OperandNode', {value: ['!==']}))
                {
                    node.children.insertAfter(currentNode, new OperandNode({value: '!='}));
                    node.children.remove(currentNode);
                    continue;
                }
            }
        }

        metrics.stop(this.className + '::transformNode');
        return Promise.resolve(node);
    }
}

module.exports.JspEqualityTransformer = JspEqualityTransformer;
