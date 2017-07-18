'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;


/**
 *
 */
class JspVariableNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspVariableNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('VariableNode'));
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
        let result = '';
        if (node.fields && node.fields.length > 0)
        {
            // Loop variables
            if (node.fields[0] === 'loop' && node.fields.length === 2)
            {
                result+= 'loop.';
                if (node.fields[1] === 'length')
                {
                    result+= 'count';
                }
                else if (node.fields[1] === 'first')
                {
                    result+= 'isFirst';
                }
                else if (node.fields[1] === 'last')
                {
                    result+= 'isLast';
                }
                else
                {
                    result+= node.fields[1];
                }
            }
            // Default
            else
            {
                for (const field of node.fields)
                {
                    if (typeof field == 'number')
                    {
                        result = result.substring(0, result.length - 1);
                        result+= '[' + field + '].';
                    }
                    else
                    {
                        result+= field + '.';
                    }
                }
                result = result.substring(0, result.length - 1);
            }
        }
        return Promise.resolve(result);
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspVariableNodeRenderer = JspVariableNodeRenderer;
