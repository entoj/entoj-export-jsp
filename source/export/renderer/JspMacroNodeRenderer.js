'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeListRenderer = require('entoj-system').export.renderer.NodeListRenderer;
const prepareParameters = require('entoj-system').export.renderer.helper.prepareParameters;
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
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);

            // Render parameters
            const parameters = prepareParameters(node, macroConfiguration, configuration, 'literals');
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' parameters');
            for (const paramName in parameters)
            {
                if (parameters[paramName].value === null)
                {
                    continue;
                }
                result+= '<c:set var="' + paramName + '" ';
                result+= 'value="${ not empty param.' + paramName + ' ? param.' + paramName + ' : ' + parameters[paramName].value + ' }" />' + EOL;
            }
            result+= yield configuration.renderer.renderComment('/macro ' + node.name + ' parameters', configuration);

            // Render children
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' body', configuration);
            result+= yield configuration.renderer.renderList(node.children, configuration);
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
