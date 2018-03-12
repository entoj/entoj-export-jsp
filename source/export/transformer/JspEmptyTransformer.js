'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeTransformer = require('entoj-system').export.transformer.NodeTransformer;
const FilterNode = require('entoj-system').export.ast.FilterNode;
const metrics = require('entoj-system').utils.performance.metrics;


/**
 * Transforms boolean tests to their empty / not empty equivalents
 */
class JspEmptyTransformer extends NodeTransformer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.transformer/JspEmptyTransformer';
    }


    /**
     * @param variableNode
     * @returns {*|FilterNode}
     * @private
     */
    createEmptyFilterNode(variableNode)
    {
        return new FilterNode({ name: 'empty', value: variableNode });
    }


    /**
     * @param variableNode
     * @returns {*|FilterNode}
     * @private
     */
    createNotEmptyFilterNode(variableNode)
    {
        return new FilterNode({ name: 'notempty', value: variableNode });
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
                // if a -> not empty a
                if (currentNode.is('VariableNode') &&
                    (!currentNode.next || currentNode.next.is('BooleanOperandNode')) &&
                    (!currentNode.previous || !currentNode.previous.is('OperandNode')))
                {
                    node.children.insertAfter(currentNode, this.createNotEmptyFilterNode(currentNode));
                    node.children.remove(currentNode);
                    continue;
                }

                // if not a -> empty a
                if (currentNode.is('BooleanOperandNode',{ value : ['not'] }) &&
                    currentNode.next && currentNode.next.is('VariableNode'))
                {
                    const variableNode = currentNode.next;
                    node.children.insertAfter(currentNode, this.createEmptyFilterNode(variableNode) );
                    node.children.remove(variableNode);
                    node.children.remove(currentNode);
                    continue;
                }

                // '' == a -> empty a
                // '' != a -> not empty a
                // a == '' -> empty a
                // a != '' -> not empty a
                if ((currentNode.is('LiteralNode', { value: '' }) && currentNode.peek(2, 'VariableNode')) ||
                    (currentNode.is('VariableNode') && currentNode.peek(2, 'LiteralNode', { value: '' })))
                {
                    const operandNode = currentNode.next;
                    const variableNode = currentNode.is('VariableNode')
                        ? currentNode
                        : currentNode.peek(2);
                    if (operandNode.is('OperandNode', { value: [ '==', '!=' ]} ))
                    {
                        if (operandNode.is('OperandNode', { value: [ '==' ]} ))
                        {
                            node.children.insertAfter(currentNode, this.createEmptyFilterNode(variableNode) );
                        }
                        else if (operandNode.is('OperandNode', { value: [ '!=' ]} ))
                        {
                            node.children.insertAfter(currentNode, this.createNotEmptyFilterNode(variableNode) );
                        }
                        node.children.remove(currentNode);
                        node.children.remove(operandNode);
                        node.children.remove(variableNode);
                    }
                    continue;
                }
            }
        }

        metrics.stop(this.className + '::transformNode');
        return Promise.resolve(node);
    }
}

module.exports.JspEmptyTransformer = JspEmptyTransformer;
