'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const co = require('co');


/**
 * Renders array data
 */
class JspArrayNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspArrayNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('ArrayNode'));
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
            const items = [];
            for (const child of node.children)
            {
                const item = yield configuration.renderer.renderNode(child, configuration);
                items.push(item);
            }
            return '[' + items.join(', ') + ']';
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspArrayNodeRenderer = JspArrayNodeRenderer;
