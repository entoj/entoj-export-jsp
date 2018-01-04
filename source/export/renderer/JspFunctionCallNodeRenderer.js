'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const prepareArguments = require('entoj-system').export.renderer.helper.prepareArguments;
const co = require('co');


/**
 * Renders a function call
 */
class JspFunctionCallNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspFunctionCallNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('FunctionCallNode'));
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

            // Render
            result+= yield configuration.renderer.renderNode(node.name, configuration);
            result+= '(';
            const args = prepareArguments(node, undefined, configuration);
            result+= Object.values(args).map((item) => item.value).join(', ');
            result+= ')';

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspFunctionCallNodeRenderer = JspFunctionCallNodeRenderer;
