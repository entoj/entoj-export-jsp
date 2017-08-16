'use strict';

/**
 * Requirements
 * @ignore
 */
const InlineMacroCallTransformer = require('entoj-system').export.transformer.InlineMacroCallTransformer;
const Node = require('entoj-system').export.ast.Node;
const LiteralNode = require('entoj-system').export.ast.LiteralNode;
const prepareParameters = require('../renderer/helper.js').prepareParameters;
const trimQuotes = require('entoj-system').utils.string.trimQuotes;



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
        const parameters = prepareParameters(macroNode, macroConfiguration, configuration);

        // Add call values
        for (const parameter of callNode.arguments)
        {
            parameters[parameter.name].value = parameter.value;
        }

        // Convert to LiteralNodes if necessary
        for (const parameterName in parameters)
        {
            if (!(parameters[parameterName].value instanceof Node))
            {
                let value = parameters[parameterName].value;
                if (typeof value === 'string')
                {
                    value = trimQuotes(value);
                }
                parameters[parameterName].value = new LiteralNode({ value: value });
            }
        }

        return parameters;
    }
}

module.exports.JspInlineMacroCallTransformer = JspInlineMacroCallTransformer;
