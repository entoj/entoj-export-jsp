'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeListRenderer = require('entoj-system').export.renderer.NodeListRenderer;
const co = require('co');
const EOL = '\n';


/**
 *
 */
class JspMacroNodeRenderer extends NodeListRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspMacroNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('MacroNode'));
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
            // Prepare
            let result = '';

            // Get all default parameters
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' parameters');
            const config = yield configuration.getMacroConfiguration(node.name);
            const parameters = {};
            if (config && config.macro)
            {
                // Add documented default values
                for (const parameter of config.macro.parameters)
                {
                    parameters[parameter.name] = parameter.defaultValue;
                }
            }
            // Add parsed default values
            for (const parameter of node.parameters)
            {
                const defaultValue = parameter.value
                    ? yield configuration.renderer.renderNode(parameter.value, configuration)
                    : 'null';
                parameters[parameter.name] = defaultValue;
            }
            for (const paramName in parameters)
            {
                result+= '<c:set var="' + paramName + '" ';
                result+= 'value="${ not empty param.' + paramName + ' ? param.' + paramName + ' : ' + parameters[paramName] + ' }" />' + EOL;
            }
            result+= yield configuration.renderer.renderComment('/macro ' + node.name + ' parameters', configuration);

            // Children
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' body', configuration);
            const children = Array.isArray(node) ? node : node.children;
            for (const child of children)
            {
                result+= yield configuration.renderer.renderNode(child, configuration);
            }
            result+= yield configuration.renderer.renderComment('/macro ' + node.name + ' body', configuration);

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspMacroNodeRenderer = JspMacroNodeRenderer;
