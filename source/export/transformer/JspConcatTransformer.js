'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeTransformer = require('entoj-system').export.transformer.NodeTransformer;
const FilterNode = require('entoj-system').export.ast.FilterNode;
const ArgumentNode = require('entoj-system').export.ast.ArgumentNode;


/**
 * Transforms string concatenations in expressions to .concat calls
 */
class JspConcatTransformer extends NodeTransformer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.transformer/JspConcatTransformer';
    }


    /**
     * @inheritDoc
     */
    transformNode(node, transformer, options)
    {
        if (node.is('ExpressionNode'))
        {
            let index = 0;
            let count = node.children.length;
            for (; index < count; index++)
            {
                const currentNode = node.children[index];
                if (currentNode.is('OperandNode', { value: ['+']}) &&
                    ((currentNode.previous && (currentNode.previous.is('LiteralNode', { valueType: 'string'}) || currentNode.previous.is('FilterNode', { name: 'concat'}))) ||
                     (currentNode.next && currentNode.next.is('LiteralNode', { valueType: 'string'}))))
                {
                    // Get nodes
                    const leftNode = currentNode.previous;
                    const rightNode = currentNode.next;

                    // Create filter
                    const filter = new FilterNode({ name: 'concat', value: leftNode, arguments: [new ArgumentNode({ value: rightNode })] });
                    node.children.insertBefore(leftNode, filter);

                    // Remove nodes
                    node.children.remove(leftNode);
                    node.children.remove(currentNode);
                    node.children.remove(rightNode);

                    // Reset iteration
                    count = node.children.length;
                    index = 0;
                }
            }
        }
        return Promise.resolve(node);
    }
}

module.exports.JspConcatTransformer = JspConcatTransformer;
