'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const co = require('co');


/**
 * Renders variable assigments
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
            result+= '<c:set';
            result+= ' var="';
            result+= yield configuration.renderer.renderNode(node.variable, configuration);
            result+= '"';
            result+= ' value="${ ';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            result+= ' }"';
            result+= ' />';
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
