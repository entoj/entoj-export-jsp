'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeListRenderer = require('entoj-system').export.renderer.NodeListRenderer;
const co = require('co');
const EOL = '\n';


/**
 * Renders a macro
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
     * @return {mixed}
     */
    prepareParameterValue(value, addQuotes)
    {
        let result = value;
        if (result == 'false' || result === false || typeof result === 'undefined')
        {
            result = 'null';
        }
        else if (addQuotes && typeof value === 'string')
        {
            result = '\'' + value + '\'';
        }
        return result;
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
        const scope = this;
        const promise = co(function*()
        {
            // Prepare
            let result = '';
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);
            const parameters = {};

            // Get default parameters from docblock
            if (macroConfiguration && macroConfiguration.macro)
            {
                for (const parameter of macroConfiguration.macro.parameters)
                {
                    parameters[parameter.name] = '${ ' + scope.prepareParameterValue(parameter.defaultValue) + ' }';
                }
            }

            // Add parsed default values
            for (const parameter of node.parameters)
            {
                const defaultValue = parameter.value
                    ? yield configuration.renderer.renderNode(parameter.value, configuration)
                    : false;
                parameters[parameter.name] = scope.prepareParameterValue(defaultValue);
            }

            // Override configured arguments
            if (macroConfiguration.parameters)
            {
                for (const param in macroConfiguration.parameters)
                {
                    parameters[param] = scope.prepareParameterValue(macroConfiguration.parameters[param], true);
                }
            }

            // Render parameters
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' parameters');
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
