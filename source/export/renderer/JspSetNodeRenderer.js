'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const Node = require('entoj-system').export.ast.Node;
const isPlainObject = require('lodash.isplainobject');
const htmlspecialchars = require('htmlspecialchars');
const co = require('co');


/**
 *
 */
class JspSetNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspSetNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('SetNode'));
    }


    /**
     * @return {Promise<String>}
     */
    render(node, configuration)
    {
        if (!node || !configuration)
        {
            return Promise.resolve('');
        }
        const promise = co(function*()
        {
            let result = '';

            // Complex - Make use of JavaEE EL3 JSON to Object Feature
            if (node.value &&
                node.value.is('ExpressionNode') &&
                node.value.find('ComplexVariableNode'))
            {
                const name = yield configuration.renderer.renderNode(node.variable, configuration);
                const data = node.value.find('ComplexVariableNode').value;
                result+= '<c:set var="' + name + '" value=\'${' + JSON.stringify(data) + '}\' />';
            }
            // Standard
            else
            {
                result+= '<c:set';
                result+= ' var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '"';
                result+= ' value="${ ';
                result+= yield configuration.renderer.renderNode(node.value, configuration);
                result+= ' }"';
                result+= ' />';
            }

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspSetNodeRenderer = JspSetNodeRenderer;
