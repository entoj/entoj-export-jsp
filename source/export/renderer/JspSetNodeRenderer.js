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
const LINEBREAK = '\n         ';

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
                result+= '<c:set var="' + name + '" value=\'${{';
                const render = (name, data) =>
                {
                    const promise = co(function*()
                    {
                        let result = '';
                        for (const key in data)
                        {
                            if (result != '')
                            {
                                result += ', ';
                            }

                            if (isPlainObject(data[key]) && !(data[key] instanceof Node))
                            {
                                result+= LINEBREAK + '"' + key + '":{';
                                result+= yield render(key, data[key]);
                                result+= '}';
                            }
                            else
                            {
                                if (data[key] instanceof Node)
                                {
                                    let value = yield configuration.renderer.renderNode(data[key], configuration);
                                    result += '"' + key + '": ' + value + '';
                                } else {
                                    let value = htmlspecialchars(data[key] || '');
                                    result += '"' + key + '": "' + value + '"';
                                }
                            }
                        }
                        return result;
                    });
                    return promise;
                };
                result+= yield render(name, data);
                result+= LINEBREAK + '}}\' />';
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
