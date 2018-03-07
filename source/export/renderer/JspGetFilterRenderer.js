'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('./JspFilterReplacementRenderer.js').JspFilterReplacementRenderer;
const ErrorHandler = require('entoj-system').error.ErrorHandler;
const co = require('co');


/**
 * Renders |set filters
 */
class JspGetFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspGetFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['get'];
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
            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate get filter in ' + node.type);
            }

            // Get variable names
            const source = filter.value
                ? yield configuration.renderer.renderNode(filter.value, configuration)
                : '';
            const propertyName = filter.arguments && filter.arguments.length > 0
                ? yield configuration.renderer.renderNode(filter.arguments[0].value, configuration)
                : '';

            // Render
            if (scope.isSet(node, configuration))
            {
                // Get variable names
                const target = node.variable
                    ? yield configuration.renderer.renderNode(node.variable, configuration)
                    : '';

                // Render
                result+= '<c:set var="${ ' + target + ' }" value="${ ' + source + '[' + propertyName + '] }" />';
            }
            else
            {
                result+= '${ ' + source + '[' + propertyName + '] }';
            }
            return result;
        }).catch(ErrorHandler.handler(scope));
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.JspGetFilterRenderer = JspGetFilterRenderer;
