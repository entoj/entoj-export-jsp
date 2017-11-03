'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;


/**
 *
 */
class JspLiteralNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspLiteralNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('LiteralNode'));
    }


    /**
     * @return {Promise<String>}
     */
    render(node, configuration)
    {
        if (!node)
        {
            return Promise.resolve('');
        }
        let result = '';
        if (node.valueType === 'string')
        {
            result+= '\'' + node.value.replace(/"/g, '\\"') + '\'';
        }
        else
        {
            result+= node.value;
        }
        return Promise.resolve(result);
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspLiteralNodeRenderer = JspLiteralNodeRenderer;
