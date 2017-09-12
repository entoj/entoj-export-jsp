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

            // Complex
            if (node.value &&
                node.value.is('ExpressionNode') &&
                node.value.find('ComplexVariableNode'))
            {
                const name = yield configuration.renderer.renderNode(node.variable, configuration);
                const data = node.value.find('ComplexVariableNode').value;
                result+= '<jsp:useBean id="' + name + '" class="java.util.LinkedHashMap" />';
                const render = (name, data) =>
                {
                    const promise = co(function*()
                    {
                        let result = '';
                        for (const key in data)
                        {
                            if (isPlainObject(data[key]) && !(data[key] instanceof Node))
                            {
                                result+= '<jsp:useBean id="' + name + '_' + key + '" class="java.util.LinkedHashMap" />';
                                result+= yield render(name + '_' + key, data[key]);
                                result+= '<c:set target="${ ' + name + ' }" property="' + key + '" value="${ ' + name + '_' + key + ' }" />';
                            }
                            else
                            {
                                let value = htmlspecialchars(data[key] || '');
                                if (data[key] instanceof Node)
                                {
                                    value = '${ ';
                                    value+= yield configuration.renderer.renderNode(data[key], configuration);
                                    value+= ' }';
                                }
                                result+= '<c:set target="${ ' + name + ' }" property="' + key + '" value="' + value + '" />';
                            }
                        }
                        return result;
                    });
                    return promise;
                };
                result+= yield render(name, data);
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
