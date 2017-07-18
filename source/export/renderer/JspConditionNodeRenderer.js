'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeListRenderer = require('entoj-system').export.renderer.NodeListRenderer;


/**
 *
 */
class JspConditionNodeRenderer extends NodeListRenderer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export.renderer/JspConditionNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('ConditionNode'));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspConditionNodeRenderer = JspConditionNodeRenderer;
