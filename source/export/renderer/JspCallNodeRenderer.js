'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const MissingConfigurationError = require('entoj-system').error.MissingConfigurationError;
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
     * @return {mixed}
     */
    prepareArgumentValue(value)
    {
        let result = value;
        if (result == 'false' || result === false || typeof result === 'undefined')
        {
            result = 'null';
        }
        return result;
    }


    /**
     * @return {Promise<Array>}
     */
    prepareArguments(node, macroConfiguration, configuration)
    {
        const scope = this;
        const promise = co(function*()
        {
            const result = {};

            // Get default params from inline docs
            for (const param of macroConfiguration.macro.parameters)
            {
                result[param.name] = '${ ' + scope.prepareArgumentValue(param.defaultValue) + ' }';
            }

            // Get arguments
            for (const arg of node.arguments)
            {
                result[arg.name] = '${ ' + scope.prepareArgumentValue(yield configuration.renderer.renderNode(arg.value, configuration)) + ' }';
            }

            // Get overrides
            if (configuration.arguments)
            {
                for (const arg in configuration.arguments)
                {
                    result[arg] = '${ ' + scope.prepareArgumentValue(configuration.arguments[arg]) + ' }';
                }
            }

            return result;
        });
        return promise;
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
        const scope = this;
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
            const args = yield scope.prepareArguments(node, macroConfiguration, configuration);

            // Render
            result+= '<jsp:include page="' + macroConfiguration.filename + '">';
            for (const arg in args)
            {
                result+= '<jsp:param name="' + arg + '" value="' + args[arg] + '" />';
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
