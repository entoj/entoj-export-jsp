'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const MissingConfigurationError = require('entoj-system').error.MissingConfigurationError;
const co = require('co');


/**
 *
 */
class JspCallNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspCallNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('CallNode'));
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
            const config = yield configuration.getMacroConfiguration(node.name);
            if (!config)
            {
                throw new MissingConfigurationError('CallNodeRenderer::render - no configuration for macro ' + node.name + ' found.');
            }
            result+= '<jsp:include page="' + config.filename + '">';
            if (node.arguments)
            {
                for (const arg of node.arguments)
                {
                    result+= '<jsp:param name="' + arg.name + '" ';
                    result+= 'value="${ ';
                    result+= yield configuration.renderer.renderNode(arg.value, configuration);
                    result+= ' }"/>';
                }
            }
            result+= '</jsp:include>';
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspCallNodeRenderer = JspCallNodeRenderer;
