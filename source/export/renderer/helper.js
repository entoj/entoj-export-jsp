'use strict';

/**
 * Requirements
 * @ignore
 */
const waitForPromise = require('entoj-system').utils.synchronize.waitForPromise;
const trimQuotes = require('entoj-system').utils.string.trimQuotes;

const co = require('co');


/**
 * @param {Mixed} value
 * @param {Array} type
 * @return {String}
 */
function prepareValue(value, type)
{
    let result = value;
    if (type && type.indexOf('Boolean') > -1)
    {
        result = value;
    }
    if (type && type.indexOf('String') > -1)
    {
        result = '\'' + trimQuotes(value) + '\'';
    }
    else if (result == 'false' || result === false || typeof result === 'undefined')
    {
        result = 'null';
    }
    return result;
}


/**
 * @param {Object} macroConfiguration
 * @return {Object}
 */
function prepareDocumentedParameters(macroConfiguration)
{
    const parameters = {};

    // Get default parameters from docblock
    if (macroConfiguration && macroConfiguration.macro)
    {
        for (const parameter of macroConfiguration.macro.parameters)
        {
            parameters[parameter.name] =
            {
                name: parameter.name,
                type: parameter.type,
                value: '${ ' + prepareValue(parameter.defaultValue, parameter.type) + ' }'
            };
        }
    }

    return parameters;
}


/**
 * @param {export.ast.Node} node
 * @param {Object} macroConfiguration
 * @param {export.JspConfiguration} configuration
 * @return {mixed}
 */
function prepareParameters(node, macroConfiguration, configuration)
{
    const promise = co(function*()
    {
        const parameters = prepareDocumentedParameters(macroConfiguration);

        // Add parsed default values
        for (const parameter of node.parameters)
        {
            const defaultValue = parameter.value
                ? yield configuration.renderer.renderNode(parameter.value, configuration)
                : false;
            parameters[parameter.name].value = prepareValue(defaultValue, parameters[parameter.name].type);
        }

        // Set model default
        if (macroConfiguration.modelParameter)
        {
            parameters[macroConfiguration.modelParameter.name].value = 'self';
        }

        // Override configured arguments
        if (macroConfiguration.parameters)
        {
            for (const param in macroConfiguration.parameters)
            {
                parameters[param].value = prepareValue(macroConfiguration.parameters[param], parameters[param].type);
            }
        }

        return parameters;
    });
    return waitForPromise(promise);
}


/**
 * @return {Promise<Array>}
 */
function prepareArguments(node, macroConfiguration, configuration)
{
    const promise = co(function*()
    {
        const parameters = prepareDocumentedParameters(macroConfiguration);

        // Get arguments
        for (const arg of node.arguments)
        {
            parameters[arg.name].value = '${ ' + prepareValue(yield configuration.renderer.renderNode(arg.value, configuration), parameters[arg.name].type) + ' }';
        }

        // Get overrides
        if (configuration.arguments)
        {
            for (const arg in configuration.arguments)
            {
                parameters[arg].value = '${ ' + prepareValue(configuration.arguments[arg], parameters[arg].type) + ' }';
            }
        }

        return parameters;
    });
    return waitForPromise(promise);
}


module.exports.prepareParameters = prepareParameters;
module.exports.prepareArguments = prepareArguments;
