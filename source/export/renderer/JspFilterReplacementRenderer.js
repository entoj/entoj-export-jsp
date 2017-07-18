'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('./JspFilterNodeRenderer.js').JspFilterNodeRenderer;


/**
 * Base class for a renderer that replaces the node using the filter
 */
class JspFilterReplacementRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspFilterReplacementRenderer';
    }


    /**
     * @return {Boolean}
     */
    isSet(node, configuration)
    {
        if (!node)
        {
            return false;
        }
        return node.is('SetNode') &&
               node.value &&
               node.value.is('ExpressionNode') &&
               node.value.find('FilterNode', { name: this.filterName });
    }


    /**
     * @return {Boolean}
     */
    isOutput(node, configuration)
    {
        if (!node)
        {
            return false;
        }
        return node.is('OutputNode') &&
               node.find('FilterNode', { name: this.filterName });
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(this.isSet(node, configuration) ||
            this.isOutput(node, configuration));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspFilterReplacementRenderer = JspFilterReplacementRenderer;
