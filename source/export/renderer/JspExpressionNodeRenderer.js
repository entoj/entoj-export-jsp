'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeListRenderer = require('entoj-system').export.renderer.NodeListRenderer;


/**
 *
 */
class JspExpressionNodeRenderer extends NodeListRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspExpressionNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, context)
    {
        return Promise.resolve(node && node.is('ExpressionNode'));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspExpressionNodeRenderer = JspExpressionNodeRenderer;
