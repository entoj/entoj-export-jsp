'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const MissingConfigurationError = require('entoj-system').error.MissingConfigurationError;
const prepareArguments = require('entoj-system').export.renderer.helper.prepareArguments;
const co = require('co');


/**
 * Renders a macro call
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

            // Get macro
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);
            if (!macroConfiguration)
            {
                throw new MissingConfigurationError('CallNodeRenderer::render - no configuration for macro ' + node.name + ' found.');
            }

            // Get arguments
            const args = prepareArguments(node, macroConfiguration, configuration, 'nodes');

            // Render
            result+= '<jsp:include page="' + macroConfiguration.includePath + '">';
            for (const arg in args)
            {
                result+= '<jsp:param name="' + arg + '" value="${ ';
                result+= yield configuration.renderer.renderNode(args[arg].value, configuration);
                result+= ' }" />';
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
