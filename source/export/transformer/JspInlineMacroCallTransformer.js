'use strict';

/**
 * Requirements
 * @ignore
 */
const InlineMacroCallTransformer = require('entoj-system').export.transformer.InlineMacroCallTransformer;
const prepareParameters = require('entoj-system').export.renderer.helper.prepareParameters;


/**
 *
 */
class JspInlineMacroCallTransformer extends InlineMacroCallTransformer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.transformer/JspInlineMacroCallTransformer';
    }


    /**
     * @inheritDocs
     */
    prepareParameters(callNode, macroNode, macroConfiguration, configuration)
    {
        const parameters = prepareParameters(macroNode, macroConfiguration, configuration, 'nodes');

        // Add call values
        for (const parameter of callNode.arguments)
        {
            parameters[parameter.name].value = parameter.value;
        }

        return parameters;
    }
}

module.exports.JspInlineMacroCallTransformer = JspInlineMacroCallTransformer;
