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
class JspSetFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/JspSetFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['set', 'setProperty'];
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
                throw new Error('Could not locate set filter in ' + node.type);
            }

            // Get variable names
            const source = filter.value
                ? yield configuration.renderer.renderNode(filter.value, configuration)
                : '';
            const propertyName = filter.arguments && filter.arguments.length > 0
                ? yield configuration.renderer.renderNode(filter.arguments[0].value, configuration)
                : '';
            const propertyValue = filter.arguments && filter.arguments.length > 1
                ? yield configuration.renderer.renderNode(filter.arguments[1].value, configuration)
                : '';

            // Get scope
            const variableScope = (source == 'global')
                ? 'request'
                : 'page';

            // Render
            result+= '<c:if test="${ empty ' + source + ' }"><jsp:useBean id="' + source + '" class="java.util.LinkedHashMap" scope="' + variableScope + '" /></c:if>';
            result+= '<c:set target="${ ' + source + ' }" property="${ ' + propertyName + ' }" value="${ ' + propertyValue + ' }" />';

            if (scope.isSet(node, configuration))
            {
                // Get variable names
                const target = node.variable
                    ? yield configuration.renderer.renderNode(node.variable, configuration)
                    : '';

                // Render
                if (source != target)
                {
                    result+= '<c:set var="${ ' + target + ' }" value="${ ' + source + ' }" />';
                }
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
module.exports.JspSetFilterRenderer = JspSetFilterRenderer;
